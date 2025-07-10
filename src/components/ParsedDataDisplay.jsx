// src/components/ParsedDataDisplay.jsx
import React from 'react';

const ParsedDataDisplay = ({ data }) => {
  if (!data) {
    return null; // Jangan tampilkan apa-apa jika belum ada data
  }

  return (
    <div style={{
      marginTop: 20,
      padding: 15,
      border: '1px solid #e0e0e0',
      borderRadius: 8,
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <h4 style={{ marginBottom: 10, color: '#333' }}>Data Penting Ditemukan:</h4>
      <p style={{ margin: '5px 0' }}>
        <strong>Total:</strong>{' '}
        {data.total !== null ? (
          <span style={{ color: '#28a745', fontWeight: 'bold' }}>
            Rp {data.total.toLocaleString('id-ID')}
          </span>
        ) : (
          <span style={{ color: '#dc3545' }}>Tidak ditemukan</span>
        )}
      </p>
      <p style={{ margin: '5px 0' }}>
        <strong>Tanggal:</strong>{' '}
        {data.date ? (
          <span style={{ color: '#007bff' }}>{data.date}</span>
        ) : (
          <span style={{ color: '#dc3545' }}>Tidak ditemukan</span>
        )}
      </p>
      <p style={{ margin: '5px 0' }}>
        <strong>Nomor Faktur:</strong>{' '}
        {data.invoiceNumber ? (
          <span style={{ color: '#ffc107', fontWeight: 'bold' }}>{data.invoiceNumber}</span>
        ) : (
          <span style={{ color: '#dc3545' }}>Tidak ditemukan</span>
        )}
      </p>
    </div>
  );
};

export default ParsedDataDisplay;