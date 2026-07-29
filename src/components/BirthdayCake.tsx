import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Flame, Wind, RefreshCw, Sparkles, Heart } from 'lucide-react';
import { NeobrutalButton } from './ui/NeobrutalButton';
import { NeobrutalBadge } from './ui/NeobrutalBadge';
import { sound } from '@/utils/sound';

export const BirthdayCake: React.FC = () => {
  const [candles, setCandles] = useState<boolean[]>([true, true, true, true, true]);
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const litCount = candles.filter(Boolean).length;

  const handleBlowCandle = (index: number) => {
    sound.playBlowCandle();
    const updated = [...candles];
    updated[index] = false;
    setCandles(updated);

    if (updated.every((c) => !c)) {
      triggerWishFulfilled();
    }
  };

  const blowAllCandles = () => {
    sound.playBlowCandle();
    setCandles([false, false, false, false, false]);
    triggerWishFulfilled();
  };

  const relightCandles = () => {
    sound.playPop();
    setCandles([true, true, true, true, true]);
    setIsBlownOut(false);
    setWishMade(false);
  };

  const triggerWishFulfilled = () => {
    setIsBlownOut(true);
    sound.playSuccess();

    // Trigger big celebratory confetti stream
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFE600', '#FF597B', '#00F0FF', '#A6FF00']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFE600', '#FF597B', '#00F0FF', '#A6FF00']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <section id="cake" className="py-12 px-4 max-w-5xl mx-auto">
      <div className="neo-box-lg bg-[#FFE600] rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        
        {/* Floating Background Stickers */}
        <div className="absolute top-4 left-6 neo-tag bg-[#FF597B] text-white px-3 py-1 rounded-lg text-xs font-extrabold rotate-[-6deg] hidden sm:block">
          INTERACTIVE CAKE 🎂
        </div>
        <div className="absolute top-4 right-6 neo-tag bg-[#00F0FF] text-black px-3 py-1 rounded-lg text-xs font-extrabold rotate-[8deg] hidden sm:block">
          MAKE A WISH! ✨
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <NeobrutalBadge color="pink" className="mb-2">
            SPECIAL BIRTHDAY CEREMONY 🎉
          </NeobrutalBadge>
          <h2 className="text-3xl sm:text-5xl font-bungee text-black mt-2 leading-tight">
            Tiup Lilin Ulang Tahun Etin! 🎂
          </h2>
          <p className="text-black font-extrabold text-base sm:text-lg mt-2 max-w-xl mx-auto">
            Klik lilin satu per satu atau tekan tombol tiup di bawah untuk buat harapan terbaikmu!
          </p>
        </div>

        {/* Cake Container */}
        <div className="flex flex-col items-center justify-center my-6 relative">
          
          {/* Candles Row */}
          <div className="flex items-end justify-center gap-4 sm:gap-8 mb-[-12px] z-20">
            {candles.map((isLit, idx) => (
              <div
                key={idx}
                onClick={() => isLit && handleBlowCandle(idx)}
                className="flex flex-col items-center cursor-pointer group relative"
                title={isLit ? 'Klik untuk tiup lilin!' : 'Lilin sudah mati'}
              >
                {/* Flame Animation */}
                {isLit ? (
                  <div className="flex flex-col items-center mb-1 animate-flame">
                    <div className="w-4 h-6 bg-gradient-to-t from-orange-500 via-yellow-300 to-white rounded-full blur-[1px] shadow-[0_0_12px_#ff9900]" />
                    <Flame className="w-7 h-7 text-yellow-400 fill-orange-500 stroke-black stroke-[2] mt-[-16px]" />
                  </div>
                ) : (
                  <div className="h-7 flex items-center justify-center mb-1 text-gray-500 font-extrabold text-xs animate-bounce">
                    💨
                  </div>
                )}

                {/* Candle Stick */}
                <div
                  className={`w-4 sm:w-5 h-16 sm:h-20 neo-box-sm rounded-t-md transition-all ${
                    idx % 2 === 0 ? 'bg-[#FF597B]' : 'bg-[#00F0FF]'
                  } flex flex-col justify-between py-1 px-0.5 group-hover:scale-105`}
                >
                  <div className="w-full h-1 bg-white/40 rounded-xs" />
                  <div className="w-full h-1 bg-white/40 rounded-xs" />
                  <div className="w-full h-1 bg-white/40 rounded-xs" />
                </div>
              </div>
            ))}
          </div>

          {/* Neobrutalist Layered Cake graphic */}
          <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center z-10">
            {/* Top Layer */}
            <div className="w-64 sm:w-80 h-16 sm:h-20 neo-box bg-[#FF597B] rounded-t-3xl relative flex items-center justify-center">
              <div className="absolute inset-x-0 top-0 h-4 bg-white/30 rounded-t-3xl flex justify-around items-center px-4">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span className="w-2 h-2 rounded-full bg-white" />
                <span className="w-2 h-2 rounded-full bg-white" />
                <span className="w-2 h-2 rounded-full bg-white" />
              </div>
              <span className="font-bungee text-white text-lg sm:text-xl drop-shadow-[2px_2px_0px_#000]">
                HAPPY BDAY ETIN
              </span>
            </div>

            {/* Middle Layer */}
            <div className="w-72 sm:w-96 h-18 sm:h-22 neo-box bg-[#A6FF00] relative flex items-center justify-between px-6">
              <div className="w-4 h-4 bg-white rounded-full border-2 border-black" />
              <div className="font-extrabold text-black text-sm sm:text-base border-2 border-black bg-white px-3 py-0.5 rounded-lg shadow-[2px_2px_0px_#000]">
                LEVEL UP DAY 💖
              </div>
              <div className="w-4 h-4 bg-white rounded-full border-2 border-black" />
            </div>

            {/* Bottom Layer */}
            <div className="w-80 sm:w-[440px] h-20 sm:h-24 neo-box bg-[#B8C0FF] rounded-b-2xl relative flex items-center justify-center">
              <div className="flex gap-4">
                <span className="neo-tag bg-[#FFE600] text-black text-xs sm:text-sm px-2 py-0.5 rounded-md">
                  ✨ Wish Big
                </span>
                <span className="neo-tag bg-[#FF8E3C] text-black text-xs sm:text-sm px-2 py-0.5 rounded-md">
                  🌟 Stay Bright
                </span>
              </div>
            </div>

            {/* Plate Base */}
            <div className="w-[340px] sm:w-[480px] h-6 neo-box bg-white rounded-full mt-[-4px] shadow-[6px_6px_0px_#000]" />
          </div>

        </div>

        {/* Cake Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          {litCount > 0 ? (
            <NeobrutalButton
              variant="pink"
              size="lg"
              onClick={blowAllCandles}
            >
              <Wind className="w-6 h-6 stroke-[3]" />
              Tiup Semua Lilin! (5/5) 💨
            </NeobrutalButton>
          ) : (
            <NeobrutalButton
              variant="cyan"
              size="lg"
              onClick={relightCandles}
            >
              <RefreshCw className="w-6 h-6 stroke-[3]" />
              Nyalakan Lilin Lagi 🕯️
            </NeobrutalButton>
          )}
        </div>

        {/* Celebration Wish Revealed Card */}
        {isBlownOut && (
          <div className="mt-8 neo-box-lg bg-white p-6 sm:p-8 rounded-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between border-b-3 border-black pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#FF597B] fill-[#FFE600]" />
                <h3 className="text-2xl font-bungee text-black">HOORAY! HARAPAN ETIN TERKABUL! ✨</h3>
              </div>
              <NeobrutalBadge color="green">WISH GRANTED 🎉</NeobrutalBadge>
            </div>
            <p className="text-gray-900 font-bold text-base sm:text-lg leading-relaxed">
              "Semoga di usia yang baru ini, Etin selalu dilimpahi kesehatan, kebahagiaan tak terhingga, senyuman yang gak pernah pudar, serta kemudahan dalam setiap impian & cita-citanya. You deserve all the happiness in the world!" 💖🎂
            </p>
            <div className="mt-4 flex justify-end">
              <NeobrutalButton
                variant="yellow"
                size="sm"
                onClick={() => {
                  sound.playSuccess();
                  setWishMade(true);
                }}
              >
                <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                {wishMade ? 'Amin YRA! 🙏❤️' : 'Ucapkan Amin 🙏'}
              </NeobrutalButton>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
