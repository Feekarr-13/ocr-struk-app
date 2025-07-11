import firebase_admin
from firebase_admin import credentials, firestore

# Inisialisasi Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# Koneksi ke Firestore
db = firestore.client()

# Fungsi untuk menyimpan hasil OCR
def simpan_hasil_ocr(teks, waktu_upload):
    data = {
        'hasil_ocr': teks,
        'waktu_upload': waktu_upload,
    }
    db.collection("hasil_struk").add(data)
    print("✅ Data berhasil disimpan ke Firestore!")

# Contoh panggilan fungsi
if __name__ == "__main__":
    simpan_hasil_ocr("Total: Rp25.000", "2025-07-10 23:30")
