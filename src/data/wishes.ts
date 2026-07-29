export interface WishMessage {
  id: string;
  name: string;
  relation: string;
  message: string;
  color: string; // Neobrutalist background colors
  sticker: string;
  date: string;
}

export const INITIAL_WISHES: WishMessage[] = [
  {
    id: 'w1',
    name: 'Bestie Squad',
    relation: 'Sahabat Dekat',
    message: 'Selamat Ulang Tahun Etin tercinta! 🎉🎂 Semoga makin sehat, makin berkah, rezeki makin lancar, dan semua cita-cita yang kamu impikan tercapai di tahun ini!',
    color: '#FFE600', // Yellow
    sticker: '👑',
    date: 'Hari ini'
  },
  {
    id: 'w2',
    name: 'Geng Ngopi & Chill',
    relation: 'Teman Hangout',
    message: 'Happy Birthday Etin! ☕✨ Jangan pernah bosan senyum dan menebar keceriaan ya. Ditunggu traktiran kopi & makannya haha!',
    color: '#FF597B', // Pink
    sticker: '🥳',
    date: 'Hari ini'
  },
  {
    id: 'w3',
    name: 'Secret Admirer',
    relation: 'Pengagum Rahasia',
    message: 'HBD Etin! Semoga usiamu membawa kebahagiaan tak terhingga, kesehatan melimpah, dan aura cantiknya tetep bersinar terus! 🌟',
    color: '#00F0FF', // Cyan
    sticker: '💖',
    date: 'Hari ini'
  },
  {
    id: 'w4',
    name: 'Teman Seperjuangan',
    relation: 'Partner',
    message: 'Happy Level Up Day Etin! Terima kasih udah selalu jadi sosok penyemangat. Sukses terus untuk karier & semua cita-citamu!',
    color: '#A6FF00', // Lime Green
    sticker: '🚀',
    date: 'Hari ini'
  },
  {
    id: 'w5',
    name: 'Keluarga Besar',
    relation: 'Family',
    message: 'Selamat ulang tahun anak manis & sholehah/kebanggaan. Semoga senantiasa diberikan lindungan Tuhan, panjang umur, dan kebahagiaan sejati.',
    color: '#B8C0FF', // Lavender
    sticker: '🌸',
    date: 'Hari ini'
  }
];
