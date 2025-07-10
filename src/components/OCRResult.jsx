import React from "react";

const OCRResult = ({ text, parsedData, handleExport }) => (
  <div style={{ marginTop: 20 }}>
    <h4>Hasil OCR:</h4>
    <textarea rows={10} cols={60} value={text} readOnly />
    <br />
    <button onClick={handleExport} style={{ marginTop: 10 }}>Simpan sebagai TXT</button>

    <div style={{ marginTop: 20 }}>
      <h4>Data Terdeteksi:</h4>
      <p><strong>Tanggal:</strong> {parsedData.date || "-"}</p>
      <p><strong>Total:</strong> {parsedData.total || "-"}</p>
      <p><strong>Nomor Faktur:</strong> {parsedData.invoiceNumber || "-"}</p>
    </div>
  </div>
);

export default OCRResult;
