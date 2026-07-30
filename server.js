import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Path to wishes.json
const WISHES_FILE = path.join(__dirname, 'public', 'wishes.json');
const DIST_DIR = path.join(__dirname, 'dist');
const DIST_WISHES_FILE = path.join(DIST_DIR, 'wishes.json');

// Initial default wishes if wishes.json does not exist yet on server
const DEFAULT_WISHES = [
  {
    id: "w1",
    name: "Darman Sarbunan",
    relation: "Pacar Tersayang 💖",
    message: "Selamat Ulang Tahun Etin sayang! 🎉🎂 Semoga makin cantik, selalu sehat, panjang umur, dan bahagia terus bersamaku. I love you so much! 💖",
    color: "#FF597B",
    sticker: "👑",
    date: "Hari ini"
  },
  {
    id: "w2",
    name: "Bestie Squad",
    relation: "Sahabat Dekat",
    message: "Selamat Ulang Tahun Etin tercinta! 🎉🎂 Semoga makin sehat, makin berkah, rezeki makin lancar, dan semua cita-cita yang kamu impikan tercapai di tahun ini!",
    color: "#FFE600",
    sticker: "🥳",
    date: "Hari ini"
  },
  {
    id: "w3",
    name: "Geng Ngopi & Chill",
    relation: "Teman Hangout",
    message: "Happy Birthday Etin! ☕✨ Jangan pernah bosan senyum dan menebar keceriaan ya. Ditunggu traktiran kopi & makannya haha!",
    color: "#00F0FF",
    sticker: "💖",
    date: "Hari ini"
  },
  {
    id: "w4",
    name: "Teman Seperjuangan",
    relation: "Partner",
    message: "Happy Level Up Day Etin! Terima kasih udah selalu jadi sosok penyemangat. Sukses terus untuk karier & semua cita-citamu!",
    color: "#A6FF00",
    sticker: "🚀",
    date: "Hari ini"
  },
  {
    id: "w5",
    name: "Keluarga Besar",
    relation: "Family",
    message: "Selamat ulang tahun anak manis & kebanggaan. Semoga senantiasa diberikan lindungan Tuhan, panjang umur, dan kebahagiaan sejati.",
    color: "#B8C0FF",
    sticker: "🌸",
    date: "Hari ini"
  }
];

// Helper to safely read wishes
const getWishes = () => {
  try {
    if (fs.existsSync(WISHES_FILE)) {
      const data = fs.readFileSync(WISHES_FILE, 'utf8');
      return JSON.parse(data);
    }
    if (fs.existsSync(DIST_WISHES_FILE)) {
      const data = fs.readFileSync(DIST_WISHES_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading wishes.json:', err);
  }
  // If file doesn't exist, create it with DEFAULT_WISHES
  saveWishes(DEFAULT_WISHES);
  return DEFAULT_WISHES;
};

// Helper to safely write wishes to both public/wishes.json AND dist/wishes.json
const saveWishes = (wishes) => {
  try {
    const jsonStr = JSON.stringify(wishes, null, 2);
    const publicDir = path.dirname(WISHES_FILE);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    fs.writeFileSync(WISHES_FILE, jsonStr, 'utf8');

    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR, { recursive: true });
    }
    fs.writeFileSync(DIST_WISHES_FILE, jsonStr, 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing wishes.json:', err);
    return false;
  }
};

// Explicit route for wishes.json (overrides static file caching in dist)
app.get('/wishes.json', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  const wishes = getWishes();
  res.json(wishes);
});

// API Endpoint to Get All Wishes
app.get('/api/wishes', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  const wishes = getWishes();
  res.json(wishes);
});

// API Endpoint to Add New Wish
app.post('/api/wishes', (req, res) => {
  const { name, relation, message, color, sticker } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }

  const currentWishes = getWishes();
  const newWish = {
    id: 'w_' + Date.now(),
    name: name.trim(),
    relation: relation ? relation.trim() : 'Sahabat',
    message: message.trim(),
    color: color || '#FFE600',
    sticker: sticker || '👑',
    date: 'Baru saja'
  };

  const updatedWishes = [newWish, ...currentWishes];
  saveWishes(updatedWishes);

  res.status(201).json(updatedWishes);
});

// API Endpoint to Delete Wish - DISABLED
app.delete('/api/wishes/:id', (req, res) => {
  return res.status(403).json({ error: 'Ucapan tidak dapat dihapus.' });
});

// Serve static frontend build if dist folder exists
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
} else {
  // In dev mode, serve static public folder assets
  app.use(express.static(path.join(__dirname, 'public')));
}

app.listen(PORT, () => {
  console.log(`🎉 Birthday App Server running on http://localhost:${PORT}`);
});
