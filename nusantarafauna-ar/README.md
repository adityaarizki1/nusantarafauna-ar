# 🦏 NusantaraFauna AR
**Media Pembelajaran Interaktif Satwa Endemik Indonesia Berbasis Web Augmented Reality (WebAR)**

Proyek Evaluasi Akhir Semester (EAS)  
Mata Kuliah: **14624372 - Realitas Bercampur**  
Program Studi: **Teknik Informatika - Universitas 17 Agustus 1945 Surabaya**  

### Anggota Tim:
1. **Aditya Rizki Ramadhan** (1462400179)
2. **Satrio Eko Nugroho** (1462400162)

---

## 🌟 Ringkasan Proyek

NusantaraFauna AR adalah aplikasi Augmented Reality berbasis peramban web (WebAR) menggunakan framework **A-Frame** dan **AR.js**. Aplikasi ini dirancang agar pengguna dapat mempelajari 4 satwa endemik Indonesia yang dilindungi (Komodo, Badak Jawa, Orangutan, dan Burung Cenderawasih) secara imersif langsung dari peramban ponsel tanpa perlu mengunduh aplikasi tambahan dari Play Store / App Store.

### Fitur Utama:
1. **Akses Instan Tanpa Instalasi (WebAR):** Berjalan di Google Chrome & Safari.
2. **Pelacakan Penanda (Image Marker Tracking):** Menggunakan kartu fisik (Flashcards) sebagai pemicu AR.
3. **Visualisasi 3D Interaktif:** Objek 3D satwa beranimasi dapat diamati 360 derajat.
4. **Efek Audio Satwa:** Tombol speaker untuk memutar efek suara khas satwa di alam bebas.
5. **Pop-up Edukasi Konservasi:** Informasi nama latin, habitat asli nusantara, status keterancaman IUCN Red List, dan pesan edukasi patriotik.
6. **Kartu Cetak Siap Pakai:** File `cards.html` siap cetak format A6.

---

## 📁 Struktur Direktori

```text
nusantarafauna-ar/
├── index.html            <- Halaman Utama Aplikasi WebAR
├── cards.html            <- Halaman Kartu Flashcards Siap Cetak (A6)
├── server.py             <- Server Lokal Python untuk Pengujian Cepat
├── README.md             <- Petunjuk Lengkap Proyek
├── css/
│   └── style.css         <- Desain Antarmuka Glassmorphism & Responsif
├── js/
│   └── app.js            <- Logika Deteksi Marker, Audio, dan Modal Pop-up
└── assets/
    ├── markers/          <- File Pola Marker AR.js (.patt)
    │   ├── komodo.patt
    │   ├── badak.patt
    │   ├── orangutan.patt
    │   ├── cenderawasih.patt
    │   ├── hiro.patt
    │   └── kanji.patt
    ├── models/           <- Model 3D Satwa (.glb)
    │   ├── komodo.glb
    │   ├── badak.glb
    │   ├── orangutan.glb
    │   └── cenderawasih.glb
    ├── audio/            <- Efek Suara Satwa (.wav)
    │   ├── komodo.wav
    │   ├── badak.wav
    │   ├── orangutan.wav
    │   └── cenderawasih.wav
    └── images/           <- Gambar Marker PNG
        ├── komodo-marker.png
        ├── badak-marker.png
        ├── orangutan-marker.png
        └── cenderawasih-marker.png
```

---

## 🚀 Cara 1: Menjalankan Server Pengujian di Laptop

1. Buka folder proyek di terminal (PowerShell / Command Prompt):
   ```powershell
   cd "C:\Users\ASUS PC\.gemini\antigravity\scratch\proyek-xr-eas\nusantarafauna-ar"
   ```
2. Jalankan perintah:
   ```powershell
   python server.py
   ```
3. Buka browser di laptop:
   * **Aplikasi WebAR:** `http://localhost:8000`
   * **Cetak Flashcard:** `http://localhost:8000/cards.html`

---

## 🌐 Cara 2: Memublikasikan ke GitHub Pages (Wajib untuk Demo HP)

Browser ponsel (Chrome / Safari) mewajibkan protokol **HTTPS** agar kamera ponsel dapat diizinkan aktif. Cara termudah, gratis, dan resmi adalah mengunggah proyek ini ke **GitHub Pages**:

### Langkah demi Langkah (Hanya 3 Menit):
1. Buka browser dan masuk ke akun GitHub kamu di **https://github.com**.
2. Klik tombol **New** untuk membuat repositori baru.
   * Beri nama repositori: `nusantarafauna-ar`
   * Pilih opsi: **Public**
   * Centang **Add a README file** (atau biarkan kosong).
   * Klik **Create repository**.
3. Di halaman repositori baru, klik tombol **Add file** -> pilih **Upload files**.
4. Tarik (*drag and drop*) seluruh isi folder `nusantarafauna-ar/` ke halaman GitHub tersebut:
   * Pastikan file `index.html`, `cards.html`, folder `css`, `js`, dan `assets` terunggah semua.
5. Klik **Commit changes**.
6. Masuk ke menu **Settings** repositori (di tab atas) -> pilih menu **Pages** di panel kiri.
7. Pada bagian **Build and deployment**:
   * Branch: ganti dari `None` menjadi **main** (folder `/root`).
   * Klik **Save**.
8. Tunggu sekitar 1-2 menit, lalu refresh halaman Settings -> Pages. Kamu akan mendapatkan tautan resmi, contohnya:  
   👉 `https://username-kamu.github.io/nusantarafauna-ar/`
9. **Selesai!** Tautan ini langsung dapat dibuka di smartphone manapun, kamera langsung aktif, dan siap didemokan di depan dosen.

---

## 🖨️ Cara Mencetak & Menggunakan Flashcard

1. Buka file `cards.html` di browser (atau kunjungi `https://username-kamu.github.io/nusantarafauna-ar/cards.html`).
2. Tekan tombol **Cetak / Simpan PDF** (atau tombol keyboard `Ctrl + P`).
3. Pilih opsi cetak pada kertas tebal (Art Carton atau HVS tebal).
4. Potong kartu sesuai garis batas.
5. Pada sisi belakang kartu, kamu bisa menempelkan QR Code yang mengarah ke link GitHub Pages aplikasi kalian (bisa dibuat gratis di situs pembuat QR Code seperti `qr-code-generator.com`).

---

## 🎯 Tips Sukses Demo EAS di Hadapan Dosen

1. **Jaga Pencahayaan:** Pastikan ruangan kelas / meja memiliki pencahayaan merata agar kamera ponsel dapat membaca kontras pola marker kartu dengan jelas.
2. **Gunakan Marker Universal 'HIRO' sebagai Cadangan:** Jika lupa membawa kartu cetak fisik, buka kartu HIRO di file `cards.html` pada layar monitor, lalu arahkan kamera ponsel ke layar laptop. Objek 3D Komodo akan langsung muncul seketika!
3. **Tekan Tombol Audio Saat Presentasi:** Tekan tombol speaker di layar untuk memutar suara satwa, lalu jelaskan pesan edukasi patriotik yang muncul di tombol info pop-up. Dosen akan sangat terkesan dengan kelengkapan interaktivitasnya!
