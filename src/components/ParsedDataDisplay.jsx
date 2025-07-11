import React from 'react';

const ParsedDataDisplay = ({ data }) => {
  if (!data) return null;

  const total =
    typeof data.total === 'number'
      ? data.total
      : parseInt(data.total?.toString().replace(/\D/g, ''), 10);

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
        {total && !isNaN(total) ? (
          <span style={{ color: '#28a745', fontWeight: 'bold' }}>
            Rp {total.toLocaleString('id-ID')}
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
