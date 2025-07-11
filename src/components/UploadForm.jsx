// src/components/UploadForm.jsx
import React, { useState } from "react";
import Tesseract from "tesseract.js";
import parseOcrText, { saveToFirestore } from "../utils/ocrParser"; // ✅ Import saveToFirestore
import ParsedDataDisplay from "./ParsedDataDisplay";

const UploadForm = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setText("");
      setParsedData(null);
    }
  };

  const handleOCR = async () => {
    if (!image) {
      alert("Mohon pilih gambar struk/faktur terlebih dahulu.");
      return;
    }

    setLoading(true);
    setText("");
    setParsedData(null);

    try {
      const result = await Tesseract.recognize(image, "ind+eng", {
        logger: (m) => {
          if (m.status === "recognizing") {
            console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
          }
        },
      });

      const extractedText = result.data.text;
      setText(extractedText);

      setText(extractedText);

      // ✅ Parse teks terlebih dahulu
      const data = parseOcrText(extractedText);
      setParsedData(data);

      // ✅ Baru simpan hasil parsing ke Firestore
      await saveToFirestore(data);

    } catch (error) {
      console.error("OCR Error:", error);
      alert("Terjadi kesalahan saat melakukan OCR. Mohon coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: 800,
      margin: '40px auto',
      padding: 30,
      border: '1px solid #ddd',
      borderRadius: 10,
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#fff'
    }}>
    <h1 style={{ textAlign: 'center', color: '#333', marginBottom: 10 }}>
    🧾 B-TRACE 📸
    </h1>
    <p style={{ textAlign: 'center', color: '#555', fontSize: '14px', marginBottom: 30 }}>
      Otomatisasi Pembacaan Struk BBM dengan OCR
    </p>

      <div style={{ marginBottom: 20 }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'block', marginBottom: 15 }}
        />
        {image && (
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <img
              src={image}
              alt="Preview Struk/Faktur"
              style={{ maxWidth: '100%', height: 'auto', maxHeight: 400, border: '1px solid #eee', borderRadius: 5 }}
            />
          </div>
        )}
        <button
          onClick={handleOCR}
          disabled={loading || !image}
          style={{
            width: '100%',
            padding: '12px 20px',
            fontSize: '18px',
            backgroundColor: loading ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease'
          }}
        >
          {loading ? "Membaca Struk..." : "Ekstrak Teks dari Gambar"}
        </button>
      </div>

      {loading && (
        <p style={{ textAlign: 'center', color: '#007bff', marginTop: 15 }}>
          Memproses gambar, mohon tunggu...
        </p>
      )}

      {text && (
        <div style={{ marginTop: 30 }}>
          <h3 style={{ color: '#333', marginBottom: 10 }}>Hasil OCR Mentah:</h3>
          <textarea
            rows={15}
            cols={60}
            value={text}
            readOnly
            style={{
              width: '100%',
              padding: 10,
              border: '1px solid #ccc',
              borderRadius: 5,
              fontSize: '14px',
              backgroundColor: '#f8f8f8',
              resize: 'vertical'
            }}
          />
        </div>
      )}

      {parsedData && <ParsedDataDisplay data={parsedData} />}
    </div>
  );
};

export default UploadForm;
