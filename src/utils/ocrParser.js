// src/utils/ocrParser.js

/**
 * Parses OCR text to extract Total, Date, and Invoice Number.
 * This function uses various regex patterns to identify common formats.
 *
 * @param {string} text The raw text extracted from OCR.
 * @returns {object} An object containing parsed data: { total: number|null, date: string|null, invoiceNumber: string|null }.
 */
const parseOcrText = (text) => {
  const parsedData = {
    total: null,
    date: null,
    invoiceNumber: null,
  };

  const cleanText = text.toUpperCase(); // Convert to uppercase for case-insensitive matching

  // --- 1. Total Harga ---
  // Mencoba berbagai variasi kata kunci dan format angka
  // Prioritas: Grand Total, Total, Jumlah, Subtotal, Amount
  // Format angka: 1.234.567,89 | 1234567.89 | 1.234.567 | 1234567,89
  const totalRegexes = [
    /(GRAND\s*TOTAL|TOTAL|JUMLAH|AMOUNT|SUBTOTAL)\s*[:=\-\s]*\s*(RP|IDR|\$|€)?\s*(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{1,2})?|\d+(?:[.,]\d{1,2})?)\b/im,
    // Fallback: mencari angka yang besar di akhir baris setelah "Total"
    /\bTOTAL\s*[\d\s.,]+\s*(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{1,2})?|\d+(?:[.,]\d{1,2})?)\b/im,
  ];

  for (const regex of totalRegexes) {
    const match = cleanText.match(regex);
    if (match) {
      // Ambil nilai angka dari grup penangkap terakhir
      let totalValue = match[match.length - 1];
      // Bersihkan nilai: hapus pemisah ribuan (titik/koma), ganti koma desimal ke titik
      totalValue = totalValue.replace(/\./g, '').replace(/,/g, '.');
      parsedData.total = parseFloat(totalValue);
      // Validasi: pastikan angka yang diparsing masuk akal (misal > 0)
      if (parsedData.total > 0) break; // Berhenti jika sudah menemukan yang valid
    }
  }

  // --- 2. Tanggal ---
  // Mencoba berbagai format tanggal umum: DD/MM/YYYY, DD-MM-YYYY, YYYY-MM-DD, DD Month YYYY, Month DD, YYYY
  // Kata kunci: Tanggal, Date, Waktu
  const dateRegexes = [
    /\b(TANGGAL|DATE|WAKTU)\s*[:=\-\s]*\s*(\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4})\b/im, // DD/MM/YYYY atau DD-MM-YYYY
    /\b(TANGGAL|DATE|WAKTU)\s*[:=\-\s]*\s*(\d{4}[-/.]\d{1,2}[-/.]\d{1,2})\b/im, // YYYY/MM/DD atau YYYY-MM-DD
    /\b(\d{1,2}\s+(?:JANUARI|FEBRUARI|MARET|APRIL|MEI|JUNI|JULI|AGUSTUS|SEPTEMBER|OKTOBER|NOVEMBER|DESEMBER|JAN|FEB|MAR|APR|MEI|JUN|JUL|AGU|SEP|OKT|NOV|DES)\s+\d{4})\b/im, // DD Month YYYY
    /\b((?:JANUARI|FEBRUARI|MARET|APRIL|MEI|JUNI|JULI|AGUSTUS|SEPTEMBER|OKTOBER|NOVEMBER|DESEMBER|JAN|FEB|MAR|APR|MEI|JUN|JUL|AGU|SEP|OKT|NOV|DES)\s+\d{1,2},\s+\d{4})\b/im, // Month DD, YYYY
    /\b(\d{1,2}\/\d{1,2}\/\d{2,4})\b/, // Standalone DD/MM/YYYY
    /\b(\d{1,2}-\d{1,2}-\d{2,4})\b/, // Standalone DD-MM-YYYY
  ];

  for (const regex of dateRegexes) {
    const match = cleanText.match(regex);
    if (match) {
      // Ambil grup penangkap yang berisi tanggal
      parsedData.date = match[match.length - 1] || match[0]; // Ambil yang paling spesifik atau seluruh match
      // TODO: Pertimbangkan konversi ke format Date objek standar di sini jika diperlukan
      break;
    }
  }

  // --- 3. Nomor Faktur/Struk ---
  // Mencari "INV NO", "INVOICE #", "NO. FAKTUR", "STRUK #", dll.
  const invoiceNumberRegexes = [
    // PERBAIKAN DI SINI: Menghilangkan escape pada / karena di dalam [] dianggap literal
    // Yang awalnya [A-Z0-9\-\/]+ menjadi [A-Z0-9-/]+
    /(BON|INV\s*NO|INVOICE\s*NUMBER|NO\.\s*FAKTUR|FAKTUR\s*NO|STRUK\s*NO|NO\s*STRUK|BILL\s*NO|RECEIPT\s*NO)\s*[:#]?\s*([A-Z0-9-/]{5,})\b/im, // Dengan kata kunci
    /\b(\d{8,15})\b/im, // Fallback: mencari deret angka panjang yang mungkin nomor faktur
  ];

  for (const regex of invoiceNumberRegexes) {
    const match = cleanText.match(regex);
    if (match) {
      // Ambil grup penangkap yang berisi nomor
      parsedData.invoiceNumber = match[match.length - 1];
      // Minimal panjang karakter untuk nomor faktur
      if (parsedData.invoiceNumber.length >= 5) break;
    }
  }

  return parsedData;
};

export default parseOcrText;