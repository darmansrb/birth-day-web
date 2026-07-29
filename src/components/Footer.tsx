import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Share2, ArrowUp, Sparkles, Check } from 'lucide-react';
import { NeobrutalButton } from './ui/NeobrutalButton';
import { NeobrutalBadge } from './ui/NeobrutalBadge';
import { sound } from '@/utils/sound';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    sound.playSuccess();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.9 }
    });
  };

  const scrollToTop = () => {
    sound.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t-4 border-black bg-[#FFE600] py-12 px-4 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Section */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-bungee text-2xl text-black">HAPPY BIRTHDAY ETIN! 🎂</span>
            <NeobrutalBadge color="pink">2026 EDITION</NeobrutalBadge>
          </div>
          <p className="font-extrabold text-black text-sm sm:text-base max-w-md">
            Dibuat khusus dengan cinta, kegembiraan oleh kekasihmu untuk merayakan hari bahagiamu Etin! 🎉
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <NeobrutalButton variant="pink" size="md" onClick={handleShare}>
            {copied ? (
              <>
                <Check className="w-5 h-5 stroke-[3]" />
                Link Tersalin! 🎉
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5 stroke-[3]" />
                Bagikan Web Ini 🚀
              </>
            )}
          </NeobrutalButton>

          <NeobrutalButton variant="white" size="md" onClick={scrollToTop}>
            <ArrowUp className="w-5 h-5 stroke-[3]" />
            Ke Atas ⬆️
          </NeobrutalButton>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between text-xs font-extrabold text-black gap-2">
        <span>© 2026 Birthday Celebration for Etin. All rights reserved.</span>
        <span className="flex items-center gap-1 flex-wrap justify-center">
          Made with <Heart className="w-4 h-4 fill-red-500 text-red-500 inline" /> oleh kekasihmu {' '}
          <a
            href="https://www.instagram.com/darman_sarbunan/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#FF597B] transition-colors"
          >
            Darman Sarbunan (@darman_sarbunan)
          </a>
        </span>
      </div>
    </footer>
  );
};
