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

// Helper to safely read wishes
const getWishes = () => {
  try {
    if (fs.existsSync(WISHES_FILE)) {
      const data = fs.readFileSync(WISHES_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading wishes.json:', err);
  }
  return [];
};

// Helper to safely write wishes
const saveWishes = (wishes) => {
  try {
    fs.writeFileSync(WISHES_FILE, JSON.stringify(wishes, null, 2), 'utf8');
    // Also copy to dist/wishes.json if dist folder exists
    const distWishes = path.join(DIST_DIR, 'wishes.json');
    if (fs.existsSync(DIST_DIR)) {
      fs.writeFileSync(distWishes, JSON.stringify(wishes, null, 2), 'utf8');
    }
    return true;
  } catch (err) {
    console.error('Error writing wishes.json:', err);
    return false;
  }
};

// API Endpoint to Get All Wishes
app.get('/api/wishes', (req, res) => {
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
