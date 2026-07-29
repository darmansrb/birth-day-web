import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Gift, Camera, Award, Music2 } from 'lucide-react';
import { Header } from './components/Header';
import { BirthdayCake } from './components/BirthdayCake';
import { PhotoGallery } from './components/PhotoGallery';
import { WishLetter } from './components/WishLetter';
import { QuizGame } from './components/QuizGame';
import { WishBoard } from './components/WishBoard';
import { FloatingStickers } from './components/FloatingStickers';
import { Footer } from './components/Footer';
import { NeobrutalBadge } from './components/ui/NeobrutalBadge';
import { NeobrutalButton } from './components/ui/NeobrutalButton';
import { sound } from '@/utils/sound';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('cake');

  const handleHeroConfetti = () => {
    sound.playSuccess();
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#FFE600', '#FF597B', '#00F0FF', '#A6FF00', '#FF8E3C']
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-x-hidden">
      {/* Floating Interactive Easter Egg Stickers */}
      <FloatingStickers />

      {/* Header & Navbar */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content Area */}
      <main className="flex-1 space-y-12 sm:space-y-16">
        
        {/* HERO SECTION */}
        <section className="pt-8 sm:pt-14 pb-6 px-4 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4 animate-bounce">
            <NeobrutalBadge color="pink" className="text-sm py-1.5 px-4 shadow-[3px_3px_0px_#000]">
              ✨ SPECIAL CELEBRATION FOR ETIN ✨
            </NeobrutalBadge>
          </div>

          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-bungee text-black leading-none tracking-tight my-4 drop-shadow-[5px_5px_0px_#FF597B]">
            HAPPY BIRTHDAY <br />
            <span className="text-[#FF597B] stroke-black drop-shadow-[5px_5px_0px_#FFE600] inline-block mt-2">
              ETIN! 🎂🎉
            </span>
          </h1>

          <p className="text-black font-extrabold text-lg sm:text-2xl max-w-2xl mx-auto mt-4 leading-relaxed">
            Selamat datang di web ucapan ulang tahun interaktif! Mari tiup lilin virtual, jelajahi galeri foto kenangan, dan kirimkan doa terbaikmu!
          </p>

          {/* Hero Action Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <NeobrutalButton
              variant="yellow"
              size="lg"
              onClick={handleHeroConfetti}
            >
              <Sparkles className="w-6 h-6 fill-black" />
              Rayakan Sekarang! 🎉
            </NeobrutalButton>

            <NeobrutalButton
              variant="cyan"
              size="lg"
              onClick={() => {
                sound.playPop();
                const el = document.getElementById('gallery');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Camera className="w-6 h-6 stroke-[3]" />
              Lihat 28 Foto Etin 📸
            </NeobrutalButton>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12">
            <div className="neo-box bg-[#FFE600] p-4 rounded-2xl">
              <span className="text-3xl font-bungee text-black block">28+</span>
              <span className="text-xs font-extrabold text-black uppercase">Foto Kenangan</span>
            </div>
            <div className="neo-box bg-[#FF597B] text-white p-4 rounded-2xl">
              <span className="text-3xl font-bungee block">100%</span>
              <span className="text-xs font-extrabold uppercase">Ceria & Vibes</span>
            </div>
            <div className="neo-box bg-[#00F0FF] p-4 rounded-2xl">
              <span className="text-3xl font-bungee text-black block">5/5</span>
              <span className="text-xs font-extrabold text-black uppercase">Lilin Virtual</span>
            </div>
            <div className="neo-box bg-[#A6FF00] p-4 rounded-2xl">
              <span className="text-3xl font-bungee text-black block">∞</span>
              <span className="text-xs font-extrabold text-black uppercase">Doa & Cinta</span>
            </div>
          </div>
        </section>

        {/* SECTION 1: INTERACTIVE BIRTHDAY CAKE */}
        <BirthdayCake />

        {/* SECTION 2: PHOTO GALLERY (28 PHOTOS OF ETIN) */}
        <PhotoGallery />

        {/* SECTION 3: CONFIDENTIAL WISH LETTER */}
        <WishLetter />

        {/* SECTION 4: TRIVIA QUIZ GAME */}
        <QuizGame />

        {/* SECTION 5: WISH BOARD & GUESTBOOK */}
        <WishBoard />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
