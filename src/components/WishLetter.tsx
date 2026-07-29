import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Heart, Sparkles, BookmarkCheck } from 'lucide-react';
import { NeobrutalBadge } from './ui/NeobrutalBadge';
import { NeobrutalButton } from './ui/NeobrutalButton';
import { sound } from '@/utils/sound';

export const WishLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleLetter = () => {
    sound.playPop();
    if (!isOpen) {
      sound.playSuccess();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF597B', '#FFE600', '#00F0FF']
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <section id="letter" className="py-12 px-4 max-w-4xl mx-auto">
      <div className="neo-box-lg bg-[#FF597B] rounded-3xl p-6 sm:p-10 relative overflow-hidden text-white">
        
        {/* Header */}
        <div className="text-center mb-8">
          <NeobrutalBadge color="yellow" className="mb-2">
            CONFIDENTIAL FOR ETIN ONLY 🔒
          </NeobrutalBadge>
          <h2 className="text-3xl sm:text-5xl font-bungee text-white mt-2 drop-shadow-[3px_3px_0px_#000]">
            Surat Rahasia Ulang Tahun 💌
          </h2>
          <p className="text-white font-extrabold text-base sm:text-lg mt-1 max-w-lg mx-auto">
            Buka amplop berstempel khusus ini untuk membaca pesan spesial dari hati!
          </p>
        </div>

        {/* Envelope Container */}
        {!isOpen ? (
          <div
            onClick={handleToggleLetter}
            className="neo-box bg-white text-black p-8 sm:p-12 rounded-3xl cursor-pointer group hover:scale-[1.02] transition-all duration-300 relative flex flex-col items-center justify-center text-center my-4 min-h-[300px]"
          >
            {/* Stamp Top Right */}
            <div className="absolute top-4 right-4 neo-box-sm bg-[#FFE600] p-2 rounded-xl rotate-[6deg] flex flex-col items-center">
              <span className="text-2xl">👑</span>
              <span className="text-[10px] font-extrabold">STAMP 2026</span>
            </div>

            {/* Wax Seal Center */}
            <div className="w-20 h-20 neo-box rounded-full bg-[#FF597B] flex items-center justify-center text-white mb-4 group-hover:rotate-12 transition-transform shadow-[4px_4px_0px_#000]">
              <Heart className="w-10 h-10 fill-white animate-pulse" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bungee text-black">
              Untuk Etin Yang Luar Biasa 💖
            </h3>
            <p className="font-extrabold text-gray-700 text-sm sm:text-base mt-2">
              (Klik stempel merah di atas untuk membuka surat)
            </p>

            <div className="mt-6 flex items-center gap-2 neo-tag bg-[#00F0FF] text-black px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold">
              <Mail className="w-4 h-4" />
              1 Pesan Baru Belum Dibuka ✉️
            </div>
          </div>
        ) : (
          /* Opened Letter Content */
          <div className="neo-box-lg bg-[#FFF9E6] text-black p-6 sm:p-10 rounded-3xl animate-in zoom-in-95 duration-300 relative">
            
            {/* Top Bar Decorative */}
            <div className="flex items-center justify-between border-b-3 border-black pb-4 mb-6">
              <div className="flex items-center gap-2">
                <NeobrutalBadge color="pink">SPESIAL UNTUK ETIN 💖</NeobrutalBadge>
                <span className="neo-tag bg-[#A6FF00] text-black text-xs px-2.5 py-0.5 rounded-md hidden sm:inline">
                  ORIGINAL LETTER 📜
                </span>
              </div>
              <NeobrutalButton variant="white" size="sm" onClick={handleToggleLetter}>
                Tutup Surat 🔒
              </NeobrutalButton>
            </div>

            {/* Letter Body Text */}
            <div className="space-y-4 font-bold text-base sm:text-lg text-gray-900 leading-relaxed max-w-2xl mx-auto">
              <p className="font-bungee text-xl text-[#FF597B]">
                Hai Etin! 👋✨
              </p>
              <p>
                Selamat Ulang Tahun yang luar biasa ya! Hari ini adalah momen selebrasi terbaik untuk merayakan pribadi kamu yang selalu membawa warna cerah, senyuman manis, dan keceriaan di mana pun kamu berada.
              </p>
              <p>
                Terima kasih sudah menjadi sosok yang selalu baik, ramah, dan menginspirasi teman-teman di sekitarmu. Setiap foto dan kenangan bersama selalu punya tempat tersendiri yang bikin tersenyum kalau diingat.
              </p>
              <p>
                Di tahun yang baru ini, kami mendoakan:
              </p>
              
              <ul className="list-none space-y-2 pl-2">
                <li className="flex items-center gap-2 neo-box-sm bg-[#FFE600] p-2.5 rounded-xl">
                  <span className="text-xl">🌟</span>
                  <span><strong>Semoga selalu sehat & penuh energi kebaikan!</strong></span>
                </li>
                <li className="flex items-center gap-2 neo-box-sm bg-[#00F0FF] p-2.5 rounded-xl">
                  <span className="text-xl">🚀</span>
                  <span><strong>Semua cita-cita, karir, & impianmu dimudahkan!</strong></span>
                </li>
                <li className="flex items-center gap-2 neo-box-sm bg-[#A6FF00] p-2.5 rounded-xl">
                  <span className="text-xl">💖</span>
                  <span><strong>Senyuman cantiknya gak pernah pudar selamanya!</strong></span>
                </li>
              </ul>

              <p className="pt-2">
                Nikmati hari ulang tahunmu dengan penuh kebahagiaan & dikelilingi orang-orang tersayang. Stay awesome & slay always! 🔥👑
              </p>
            </div>

            {/* Sign Off */}
            <div className="mt-8 pt-4 border-t-3 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-bungee text-lg text-black">Dengan Penuh Kasih & Doa,</p>
                <p className="font-extrabold text-sm text-[#FF597B]">Keluarga & Sahabat Etin 💕</p>
              </div>

              <NeobrutalButton
                variant="pink"
                size="sm"
                onClick={() => {
                  sound.playSuccess();
                  confetti({
                    particleCount: 120,
                    spread: 90,
                    origin: { y: 0.7 }
                  });
                }}
              >
                <Sparkles className="w-4 h-4 fill-white" />
                Kirim Cinta & Peluk 🤗
              </NeobrutalButton>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
