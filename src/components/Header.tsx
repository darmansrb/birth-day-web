import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, Sparkles, Music, Heart } from 'lucide-react';
import { NeobrutalButton } from './ui/NeobrutalButton';
import { sound } from '@/utils/sound';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const triggerConfetti = () => {
    sound.playSuccess();
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#FFE600', '#FF597B', '#00F0FF']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#A6FF00', '#B8C0FF', '#FF8E3C']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
  };

  const handleToggleMusic = () => {
    if (isPlayingMusic) {
      sound.stopTune();
      setIsPlayingMusic(false);
    } else {
      const muted = sound.getMuted();
      if (muted) {
        sound.toggleMute();
        setIsMuted(false);
      }
      sound.playHappyBirthdayTune(() => setIsPlayingMusic(false));
      setIsPlayingMusic(true);
    }
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (muted && isPlayingMusic) {
      setIsPlayingMusic(false);
    }
  };

  const navItems = [
    { id: 'cake', label: '🎂 Lilin Virtual' },
    { id: 'gallery', label: '📸 Galeri Foto' },
    { id: 'letter', label: '💌 Surat Spesial' },
    { id: 'quiz', label: '🎮 Quiz Trivia' },
    { id: 'wishes', label: '✍️ Papan Harapan' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Neobrutalist Marquee Banner */}
      <div className="bg-[#FFE600] border-b-3 border-black overflow-hidden py-1.5 font-extrabold text-sm sm:text-base select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-6">
          <span>🎉 HAPPY BIRTHDAY ETIN! 🎂</span>
          <span>💖 WISHING YOU THE BEST YEAR EVER! ✨</span>
          <span>👑 ETIN'S SPECIAL DAY 🌟</span>
          <span>🎈 SPARKLE & SHINE TODAY! 🎁</span>
          <span>🥳 LEVEL UP DAY ETIN! 🚀</span>
          <span>🎉 HAPPY BIRTHDAY ETIN! 🎂</span>
          <span>💖 WISHING YOU THE BEST YEAR EVER! ✨</span>
          <span>👑 ETIN'S SPECIAL DAY 🌟</span>
          <span>🎈 SPARKLE & SHINE TODAY! 🎁</span>
          <span>🥳 LEVEL UP DAY ETIN! 🚀</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-[#FFF9E6] border-b-4 border-black px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Badge */}
          <div className="flex items-center gap-3">
            <div 
              onClick={triggerConfetti}
              className="neo-box bg-[#FF597B] text-white px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer hover:rotate-2 transition-transform"
            >
              <Heart className="w-6 h-6 fill-white text-white animate-pulse" />
              <span className="font-bungee text-xl tracking-wider">ETIN'S BDAY 🎂</span>
            </div>
            <span className="hidden sm:inline-block neo-tag bg-[#A6FF00] text-black px-3 py-1 rounded-lg font-extrabold text-xs">
              OFFICIAL PARTY VIBE 🎉
            </span>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  sound.playPop();
                  setActiveSection(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`neo-tag px-3 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                  activeSection === item.id
                    ? 'bg-[#FF597B] text-white translate-y-[-2px] shadow-[4px_4px_0px_#000]'
                    : 'bg-white text-black hover:bg-[#FFE600]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <NeobrutalButton
              variant={isPlayingMusic ? 'pink' : 'cyan'}
              size="sm"
              onClick={handleToggleMusic}
              title="Putar Lagu Ulang Tahun"
            >
              <Music className={`w-4 h-4 ${isPlayingMusic ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isPlayingMusic ? 'Stop Music 🎵' : 'Play Music 🎵'}</span>
            </NeobrutalButton>

            <button
              onClick={handleToggleMute}
              className="neo-btn bg-white p-2 rounded-xl text-black hover:bg-[#FFE600]"
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-red-600 stroke-[3]" /> : <Volume2 className="w-5 h-5 stroke-[3]" />}
            </button>

            <NeobrutalButton
              variant="yellow"
              size="sm"
              onClick={triggerConfetti}
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span className="hidden sm:inline">Confetti! 🎉</span>
            </NeobrutalButton>
          </div>

        </div>
      </div>
    </header>
  );
};
