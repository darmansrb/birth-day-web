# 🎂 Web Ucapan Ulang Tahun Interaktif untuk Etin 🎉

Aplikasi web ucapan ulang tahun interaktif untuk **Etin** dengan tema **Neobrutalism UI/UX**, dibangun menggunakan **Vite + React + TypeScript + Tailwind CSS**, serta dilengkapi dengan **Docker & Docker Compose**.

![License](https://img.shields.io/badge/License-MIT-green.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6-purple.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-cyan.svg)

---

## 🌟 Fitur Utama

- **🎂 Lilin Virtual Interaktif**:
  - Tiup lilin satu per satu atau tiup sekaligus (`5/5 Lit`).
  - Dilengkapi efek suara *wind blow*, musik *fanfare victory*, dan *confetti stream*.
  - Mengungkapkan doa & pesan selebrasi spesial saat lilin ditiup.

- **📸 Galeri Foto Neobrutalism (28 Foto)**:
  - 28 foto kenangan Etin yang tersimpan di `public/foto/`.
  - Filter Kategori: *Semua, Favorit, Momen Manis, Gaya & Fun, Random & Cute*.
  - Bilah Pencarian (*Search Bar*) real-time.
  - Lightbox Fullscreen Viewer dengan tombol navigasi *Foto Sebelumnya / Selanjutnya*.

- **💌 Surat Ucapan Rahasia Berstempel**:
  - Amplop rahasia interaktif berstempel lilin merah (*wax seal*) yang terbuka secara animasi.

- **🎮 Game Trivia Quiz**:
  - *"Seberapa Kenal Kamu Sama Etin?"* dengan feedback visual Neobrutalist, skor, dan sertifikat Bestie.

- **✍️ Papan Doa & Harapan (Saved to `wishes.json`)**:
  - Ucapan & doa pengunjung tersimpan secara permanen ke file `public/wishes.json` sehingga dapat dibaca oleh semua orang!

- **🎵 Pemutar Musik Chiptune Retro**:
  - Musik *Happy Birthday* versi 8-bit chiptune yang disintesis via Web Audio API tanpa ketergantungan file eksternal.

- **🎨 Neobrutalism UI/UX**:
  - Border tebal (`3.5px solid #000`), hard offset shadow (`4px 4px 0px #000`), serta skema warna cerah (*Yellow, Pink, Cyan, Lime Green, Lavender*).

---

## 🚀 Cara Menjalankan

### Mode Development (Lokal)

```bash
# 1. Install dependencies
npm install

# 2. Jalankan Dev Server Vite
npm run dev
```
Buka browser di `http://localhost:3000`.

### Mode Production dengan Docker Compose

```bash
# Build & Jalankan Container Docker
docker compose up --build -d
```
Akses web aplikasi di `http://localhost:3000`.

---

## 🛠️ Pembagian Berkas & Struktur Project

```text
.
├── Dockerfile              # Multi-stage build (Node 20 Alpine + Nginx)
├── docker-compose.yml      # Konfigurasi Docker Compose dengan persistent volume
├── nginx.conf              # Konfigurasi Nginx SPA routing
├── package.json            # Dependencies & scripts
├── public/
│   ├── foto/               # 28 Berkas foto kenangan Etin (JPG)
│   └── wishes.json         # File penyimpanan data ucapan publik
├── server.js               # Node.js Express server untuk pembacaan/penulisan wishes.json
└── src/
    ├── components/         # Komponent Neobrutalism (Cake, Gallery, Letter, Quiz, Wishes)
    ├── data/               # Metadata foto & quiz
    └── utils/              # Sound synthesizer (Web Audio API)
```

---

## 💖 Kredit

Dibuat khusus dengan cinta & kegembiraan oleh **[Darman Sarbunan (@darman_sarbunan)](https://www.instagram.com/darman_sarbunan/)** untuk merayakan hari paling bahagia **Etin**! 🎉
