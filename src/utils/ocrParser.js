// src/utils/ocrParser.js

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // pastikan path ini benar

// Fungsi parsing teks hasil OCR
export function parseOcrText(text) {
  const result = {
    total: null,
    date: null,
    invoiceNumber: null,
  };

  // Total Harga
  const totalMatch = text.match(/Total Harga\s*:\s*Rp[.\s]*([\d,.]+)/i);
  if (totalMatch) {
    const totalClean = totalMatch[1].replace(/[^\d]/g, "");
    result.total = parseInt(totalClean, 10);
  }

  // Tanggal
  const dateMatch = text.match(/(?:Waktu|Tanggal)\s*[:-]?\s*(\d{1,2}\/\d{1,2}\/\d{4})/i);
  if (dateMatch) {
    result.date = dateMatch[1];
  }

  // Nomor Faktur / Transaksi
  const invoiceMatch = text.match(/(?:No[\s_]?Trans(?:aksi)?|No[\s_]?Faktur)\s*[:-]?\s*(\d+)/i);
  if (invoiceMatch) {
    result.invoiceNumber = invoiceMatch[1];
  }

  return result;
}

// Fungsi menyimpan data ke Firestore
export async function saveToFirestore(data) {
  try {
    const docRef = await addDoc(collection(db, 'nama_koleksi'), { text: data });
    console.log('Data berhasil disimpan dengan ID:', docRef.id);
  } catch (error) {
    console.error('Gagal menyimpan ke Firestore:', error);
  }
}

// ✅ Tambahkan default export untuk parseOcrText
export default parseOcrText;
