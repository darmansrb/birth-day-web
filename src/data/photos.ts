export interface PhotoItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: 'Favorit' | 'Momen Manis' | 'Gaya & Fun' | 'Random & Cute';
  date?: string;
  sticker?: string;
  rotation?: string;
}

export const PHOTOS_DATA: PhotoItem[] = [
  {
    id: 'p1',
    src: '/foto/0cdf2440-1e39-4ba5-8790-eb5a3a4c65c8.JPG',
    title: 'Senyuman Paling Manis 🌟',
    caption: 'Momen Etin tampil cantik & penuh ceria! Tiap sudut senyuman selalu bikin suasana jadi hangat.',
    category: 'Favorit',
    date: 'Momen Spesial',
    sticker: '👑',
    rotation: '-2deg'
  },
  {
    id: 'p2',
    src: '/foto/0df743d6-ee78-4512-8670-5c208a7257ad.JPG',
    title: 'Selfie Mode: ON 📸',
    caption: 'Kalau sudah selfie, aura cantiknya langsung memancar 100%! Always slays!',
    category: 'Gaya & Fun',
    date: 'Weekend Vibe',
    sticker: '✨',
    rotation: '2deg'
  },
  {
    id: 'p3',
    src: '/foto/22216bd5-81e2-4a51-bf31-96157873c625.JPG',
    title: 'Hangout Time ☕',
    caption: 'Nongkrong santai sambil cerita-cerita seru. Seneng banget bisa ngelewati hari bareng Etin.',
    category: 'Momen Manis',
    date: 'Coffee & Talk',
    sticker: '💖',
    rotation: '-3deg'
  },
  {
    id: 'p4',
    src: '/foto/25083ca5-2b4f-4a61-82b1-ba973aa91802.JPG',
    title: 'Pose Candid Unik 🤪',
    caption: 'Diambil pas Etin lagi gak siap, tapi malah tetep aesthetic & gemoy banget!',
    category: 'Random & Cute',
    date: 'Candid Moment',
    sticker: '🌸',
    rotation: '1deg'
  },
  {
    id: 'p5',
    src: '/foto/2bd6a0b0-34b3-426e-a552-1f9848b354f3.JPG',
    title: 'Sparkling Eyes ✨',
    caption: 'Matanya selalu berbinar kalau lagi seneng. Semoga hari-hari Etin selalu dihiasi kebahagiaan!',
    category: 'Favorit',
    date: 'Sunny Day',
    sticker: '⭐',
    rotation: '-1deg'
  },
  {
    id: 'p6',
    src: '/foto/2f564fee-7f16-4a75-ad08-8f03174a6865.JPG',
    title: 'Kece Badai 💃',
    caption: 'OOTD Etin yang bikin terpana. Style-nya gak pernah gagal bikin terpukau!',
    category: 'Gaya & Fun',
    date: 'OOTD Check',
    sticker: '🔥',
    rotation: '3deg'
  },
  {
    id: 'p7',
    src: '/foto/53f9729d-b4fb-4290-a8c1-4a556438a339.JPG',
    title: 'Cerita Hari Ini 🌈',
    caption: 'Setiap foto punya cerita tersendiri. Momen bahagia yang selalu layak dikenang.',
    category: 'Momen Manis',
    date: 'Golden Hour',
    sticker: '🌺',
    rotation: '-2deg'
  },
  {
    id: 'p8',
    src: '/foto/5474ccea-a2f9-4968-8a96-e5dd44654c5d.JPG',
    title: 'Ekspresi Gemes 🎀',
    caption: 'Tatapan mata & ekspresi lucu Etin yang selalu sukses menghibur & mencairkan suasana.',
    category: 'Random & Cute',
    date: 'Cute Vibe',
    sticker: '🎀',
    rotation: '2deg'
  },
  {
    id: 'p9',
    src: '/foto/711484dd-471d-4f0f-8e15-67609343ac72.JPG',
    title: 'Chill Vibe 🍃',
    caption: 'Nikmatin suasana tenang & adem. Etin keliatan rileks banget di foto ini!',
    category: 'Favorit',
    date: 'Chill Time',
    sticker: '🍀',
    rotation: '-1deg'
  },
  {
    id: 'p10',
    src: '/foto/877860A6-EDE9-4D01-B741-43E0A01C9505.JPG',
    title: 'Bintang Utama 🌟',
    caption: 'Foto khusus sang bintang ulang tahun! Tetap bersinar & kejar semua impianmu ya Etin!',
    category: 'Favorit',
    date: 'Birthday Girl',
    sticker: '🎂',
    rotation: '2deg'
  },
  {
    id: 'p11',
    src: '/foto/9178f787-cd20-4d15-819c-eebb7061bb17.JPG',
    title: 'Keceriaan Bersama 🎉',
    caption: 'Tawa lepasss Etin yang menular ke siapa aja di sekitarnya.',
    category: 'Gaya & Fun',
    date: 'Happy Vibe',
    sticker: '🎈',
    rotation: '-3deg'
  },
  {
    id: 'p12',
    src: '/foto/933a111a-3cf7-436a-b890-6c3d57be1b22.JPG',
    title: 'Potret Elegan 💫',
    caption: 'Tampil begitu anggun & mempesona. Truly unforgettable look!',
    category: 'Favorit',
    date: 'Special Moment',
    sticker: '💎',
    rotation: '1deg'
  },
  {
    id: 'p13',
    src: '/foto/9713a154-c14d-4476-895a-2fea83f1838e.JPG',
    title: 'Sudut Terfavorit 🌻',
    caption: 'Latar tempatnya pas banget sama kecantikan Etin. Suka banget sama foto ini!',
    category: 'Momen Manis',
    date: 'Outdoor Snap',
    sticker: '🌼',
    rotation: '-2deg'
  },
  {
    id: 'p14',
    src: '/foto/A4672944-417D-4E82-9B3F-8F16903642B2.JPG',
    title: 'Gaya Kekinian 😎',
    caption: 'Pose andalan yang slays abis. Gak pernah salah kalau udah bergaya!',
    category: 'Gaya & Fun',
    date: 'Fashion Post',
    sticker: '⚡',
    rotation: '2deg'
  },
  {
    id: 'p15',
    src: '/foto/IDG_20260319_132949_955.JPG',
    title: 'Momen Berharga 💖',
    caption: 'Diambil saat momen bahagia. Kenangan yang tersimpan rapat dalam memori indah.',
    category: 'Momen Manis',
    date: 'March 2026',
    sticker: '💌',
    rotation: '-1deg'
  },
  {
    id: 'p16',
    src: '/foto/IDG_20260319_134829_158.JPG',
    title: 'Ketawa Bebas 🥳',
    caption: 'Bikin siapa aja yang liat ikut tersenyum. Bahagia terus ya Etin!',
    category: 'Random & Cute',
    date: 'March 2026',
    sticker: '🍭',
    rotation: '3deg'
  },
  {
    id: 'p17',
    src: '/foto/IMG_0768.jpg',
    title: 'Tatap Mata Ojol 😂',
    caption: 'Ekspresi alami yang manis & menggemaskan dalam keseharian.',
    category: 'Random & Cute',
    date: 'Daily Life',
    sticker: '🐱',
    rotation: '-2deg'
  },
  {
    id: 'p18',
    src: '/foto/IMG_0769.jpg',
    title: 'Mood Booster 🚀',
    caption: 'Lihat foto ini auto mood naik lagi! Energi positifnya bener-bener berasa.',
    category: 'Momen Manis',
    date: 'Daily Life',
    sticker: '🚀',
    rotation: '1deg'
  },
  {
    id: 'p19',
    src: '/foto/IMG_0770.jpg',
    title: 'Aesthetic Angle 📸',
    caption: 'Lighting & sudutnya juara banget! Keliatan estetik ala majalah.',
    category: 'Favorit',
    date: 'Portrait Mode',
    sticker: '🎨',
    rotation: '-3deg'
  },
  {
    id: 'p20',
    src: '/foto/IMG_0772.jpg',
    title: 'Senyum Penuh Bahagia 🌺',
    caption: 'Senyuman tulus dari hati. Semoga tahun baru usiamu membawa berkah berlimpah!',
    category: 'Momen Manis',
    date: 'Sweet Day',
    sticker: '🌷',
    rotation: '2deg'
  },
  {
    id: 'p21',
    src: '/foto/IMG_0773.jpg',
    title: 'Queen of the Day 👸',
    caption: 'Etin di hari ulang tahunnya, benar-benar ratu sehari yang dicintai semua orang!',
    category: 'Favorit',
    date: 'Special Event',
    sticker: '👑',
    rotation: '-1deg'
  },
  {
    id: 'p22',
    src: '/foto/IMG_2383.jpg',
    title: 'Ceria & Energik ⚡',
    caption: 'Vibe energik yang gak pernah padam. Tetap jadi pribadi yang ceria & ramah ya!',
    category: 'Gaya & Fun',
    date: 'Happy Vibe',
    sticker: '✨',
    rotation: '2deg'
  },
  {
    id: 'p23',
    src: '/foto/addbda38-926d-474a-be48-ca2e3c5aefca.JPG',
    title: 'Cute Face Challenge 🐣',
    caption: 'Ekspresi paling konyol tapi tetep bikin gemes!',
    category: 'Random & Cute',
    date: 'Fun Snap',
    sticker: '🐥',
    rotation: '-2deg'
  },
  {
    id: 'p24',
    src: '/foto/d48f79d3-3d4f-488e-90af-68e6400ece23.JPG',
    title: 'Warm Sunlight 🌅',
    caption: 'Cahaya matahari sore yang pas menghiasi wajah cantik Etin.',
    category: 'Momen Manis',
    date: 'Sunset Memory',
    sticker: '☀️',
    rotation: '1deg'
  },
  {
    id: 'p25',
    src: '/foto/e79e84ce-42d6-4faf-80b1-9a7fd6ad8739.JPG',
    title: 'Slay Girl 💅',
    caption: 'Tampil percaya diri & selalu mempesona di setiap suasana.',
    category: 'Gaya & Fun',
    date: 'Slay Mode',
    sticker: '💋',
    rotation: '-3deg'
  },
  {
    id: 'p26',
    src: '/foto/e9779c5e-9806-455e-8741-ab320b4504e7.JPG',
    title: 'Soft & Gentle 🌸',
    caption: 'Sisi lembut Etin yang selalu perhatian dan baik ke teman-teman.',
    category: 'Momen Manis',
    date: 'Gentle Moments',
    sticker: '🧸',
    rotation: '2deg'
  },
  {
    id: 'p27',
    src: '/foto/f71ff2d5-a73b-41e9-a406-054be2bd8c87.JPG',
    title: 'Bebas Berkespresi 🤪',
    caption: 'Gak jaim, selalu apa adanya, dan itu yang bikin Etin sangat disukai!',
    category: 'Random & Cute',
    date: 'Unfiltered Joy',
    sticker: '🎭',
    rotation: '-1deg'
  },
  {
    id: 'p28',
    src: '/foto/iScreen Shoter - 20260730002955925.jpg',
    title: 'High Definition Smile 📸',
    caption: 'Tangkapan layar kenangan terbaik yang tersimpan rapi untuk hari ulang tahun ini.',
    category: 'Favorit',
    date: 'Highlight 2026',
    sticker: '⭐',
    rotation: '2deg'
  }
];
