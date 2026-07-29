export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  emoji: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Apa mood booster paling ampuh buat Etin kalau lagi capek/stres?',
    options: ['Nongkrong & Ngopi Bareng Bestie ☕', 'Tidur 24 Jam Nonstop 😴', 'Jalan-jalan Kulineran 🍕', 'Dengerin Musik & Healing 🎧'],
    correctIndex: 0,
    explanation: 'Bener banget! Ngumpul bareng & ngobrol seru selalu sukses balikin senyum Etin!',
    emoji: '☕'
  },
  {
    id: 2,
    question: 'Gaya selfie favorit Etin yang paling sering keliatan di foto-foto?',
    options: ['Senyum Manis Sambil Miringin Kepala ✨', 'Pose Duckface 🦆', 'Tutup Muka 🙈', 'Pose Cool Datar 😐'],
    correctIndex: 0,
    explanation: 'Yep! Senyum miring manis Etin bener-bener ikonik dan juara banget!',
    emoji: '📸'
  },
  {
    id: 3,
    question: 'Kalau Etin dapet hadiah ulang tahun impian, mana yang paling bikin dia screaming happily?',
    options: ['Tiket Liburan / Adventure 🏖️', 'Koleksi Fashion & Skincare 💄', 'Surprise Party Meriah 🎉', 'Semua Jawaban Benar! 😍'],
    correctIndex: 3,
    explanation: 'Pastinya SEMUA JAWABAN BENAR! Siapa yang gak seneng dapet semua surprise manis ini!',
    emoji: '🎁'
  },
  {
    id: 4,
    question: 'Superpower terbaik yang dimiliki seorang Etin adalah...?',
    options: ['Mencairkan Suasana dengan Senyuman 🌟', 'Selalu Perhatian ke Teman 💖', 'Gak Pernah Habis Energi Ceria ⚡', 'Semua Poin Di Atas! 💯'],
    correctIndex: 3,
    explanation: '1000% Setuju! Etin itu paket lengkap kawan terbaik!',
    emoji: '👑'
  }
];
