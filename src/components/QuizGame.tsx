import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '@/data/quiz';
import { NeobrutalBadge } from './ui/NeobrutalBadge';
import { NeobrutalButton } from './ui/NeobrutalButton';
import { sound } from '@/utils/sound';

export const QuizGame: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const q: QuizQuestion = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === q.correctIndex) {
      sound.playSuccess();
      setScore((prev) => prev + 1);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#A6FF00', '#00F0FF']
      });
    } else {
      sound.playPop();
    }
  };

  const handleNextStep = () => {
    sound.playPop();
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      sound.playSuccess();
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    sound.playPop();
    setCurrentStep(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswered(false);
    setIsFinished(false);
  };

  return (
    <section id="quiz" className="py-12 px-4 max-w-4xl mx-auto">
      <div className="neo-box-lg bg-[#00F0FF] rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-8">
          <NeobrutalBadge color="yellow" className="mb-2">
            FUN TRIVIA GAME 🎮
          </NeobrutalBadge>
          <h2 className="text-3xl sm:text-5xl font-bungee text-black mt-1">
            Seberapa Kenal Kamu Sama Etin? 🤔
          </h2>
          <p className="text-black font-extrabold text-base sm:text-lg mt-1">
            Uji pengetahuanmu seputar kebiasaan, gaya, dan momen seru Etin!
          </p>
        </div>

        {!isFinished ? (
          <div className="neo-box-lg bg-white p-6 sm:p-8 rounded-3xl">
            
            {/* Progress & Question Counter */}
            <div className="flex items-center justify-between mb-6 border-b-3 border-black pb-4">
              <div className="flex items-center gap-2">
                <NeobrutalBadge color="purple">
                  Soal {currentStep + 1} dari {QUIZ_QUESTIONS.length}
                </NeobrutalBadge>
                <span className="text-xl">{q.emoji}</span>
              </div>
              <div className="flex items-center gap-1 font-extrabold text-sm sm:text-base bg-[#FFE600] px-3 py-1 neo-tag rounded-xl">
                Skor: {score} Poin
              </div>
            </div>

            {/* Question Title */}
            <h3 className="text-xl sm:text-2xl font-bungee text-black mb-6">
              {q.question}
            </h3>

            {/* Options Grid */}
            <div className="space-y-3.5 mb-6">
              {q.options.map((opt, idx) => {
                let btnStyle = 'bg-white text-black hover:bg-[#FFE600]';
                if (isAnswered) {
                  if (idx === q.correctIndex) {
                    btnStyle = 'bg-[#A6FF00] text-black border-black shadow-[4px_4px_0px_#000]';
                  } else if (idx === selectedOption) {
                    btnStyle = 'bg-[#FF597B] text-white border-black shadow-[4px_4px_0px_#000]';
                  } else {
                    btnStyle = 'bg-gray-100 text-gray-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full neo-btn text-left p-4 rounded-2xl font-extrabold text-base sm:text-lg flex items-center justify-between transition-all ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && idx === q.correctIndex && (
                      <CheckCircle2 className="w-6 h-6 text-black stroke-[3] shrink-0" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== q.correctIndex && (
                      <XCircle className="w-6 h-6 text-white stroke-[3] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after answer */}
            {isAnswered && (
              <div className="neo-box bg-[#FFE600] p-4 rounded-2xl mb-6 animate-in fade-in duration-200">
                <p className="font-extrabold text-black text-sm sm:text-base">
                  💡 {q.explanation}
                </p>
              </div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <div className="flex justify-end">
                <NeobrutalButton variant="pink" size="md" onClick={handleNextStep}>
                  {currentStep < QUIZ_QUESTIONS.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Quiz'}
                  <ArrowRight className="w-5 h-5 stroke-[3]" />
                </NeobrutalButton>
              </div>
            )}

          </div>
        ) : (
          /* Quiz Finished Screen */
          <div className="neo-box-lg bg-white p-8 sm:p-12 rounded-3xl text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 neo-box bg-[#FFE600] rounded-full mx-auto flex items-center justify-center mb-4">
              <Award className="w-10 h-10 text-black stroke-[3]" />
            </div>

            <NeobrutalBadge color="pink" className="mb-2">
              QUIZ COMPLETED! 🎉
            </NeobrutalBadge>

            <h3 className="text-3xl sm:text-4xl font-bungee text-black mt-2">
              Skor Kamu: {score} / {QUIZ_QUESTIONS.length}
            </h3>

            <p className="font-extrabold text-gray-800 text-base sm:text-lg max-w-md mx-auto mt-3">
              {score === QUIZ_QUESTIONS.length
                ? 'WOAH 100%! Kamu bener-bener Bestie Sejati Etin! Paham banget seluk beluk Etin! 👑💖'
                : score >= 2
                ? 'Hebat! Kamu cukup kenal Etin dengan baik! Terus jaga silaturahmi & keseruan ya! 🌟'
                : 'Lumayan! Masih butuh nongkrong & ngobrol lebih sering lagi nih sama Etin! ☕'}
            </p>

            <div className="mt-8 flex justify-center">
              <NeobrutalButton variant="cyan" size="md" onClick={handleRestart}>
                <RotateCcw className="w-5 h-5 stroke-[3]" />
                Main Lagi!
              </NeobrutalButton>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
