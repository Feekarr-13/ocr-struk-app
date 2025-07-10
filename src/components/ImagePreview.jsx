import React from "react";

const ImagePreview = ({ image, handleOCR, loading }) => (
  <div>
    <img src={image} alt="preview" width="300" style={{ marginTop: 20 }} />
    <br />
    <button onClick={handleOCR} disabled={loading} style={{ marginTop: 10 }}>
      {loading ? "Membaca..." : "Ekstrak Teks"}
    </button>
  </div>
);

export default ImagePreview;
