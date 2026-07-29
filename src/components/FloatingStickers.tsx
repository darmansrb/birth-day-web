import React from 'react';
import confetti from 'canvas-confetti';
import { sound } from '@/utils/sound';

export const FloatingStickers: React.FC = () => {
  const stickers = [
    { emoji: '🎂', label: 'Cake', color: '#FFE600', position: 'bottom-6 left-6 rotate-[-12deg]' },
    { emoji: '🥳', label: 'Party', color: '#FF597B', position: 'bottom-20 right-6 rotate-[8deg]' },
    { emoji: '🎁', label: 'Gift', color: '#00F0FF', position: 'top-1/3 left-4 rotate-[15deg]' },
    { emoji: '👑', label: 'Queen', color: '#A6FF00', position: 'top-1/2 right-4 rotate-[-10deg]' }
  ];

  const handleStickerClick = (emoji: string, e: React.MouseEvent) => {
    sound.playSuccess();

    // Trigger local mini confetti near mouse position
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x, y }
    });
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden hidden md:block">
      {stickers.map((s, idx) => (
        <button
          key={idx}
          onClick={(e) => handleStickerClick(s.emoji, e)}
          style={{ backgroundColor: s.color }}
          className={`pointer-events-auto absolute ${s.position} neo-box p-3 rounded-2xl text-2xl animate-float cursor-pointer hover:scale-125 transition-transform duration-200 shadow-[4px_4px_0px_#000]`}
          title={`Klik sticker ${s.emoji}!`}
        >
          {s.emoji}
        </button>
      ))}
    </div>
  );
};
