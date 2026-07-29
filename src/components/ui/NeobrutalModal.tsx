import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { sound } from '@/utils/sound';

interface NeobrutalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  bgColor?: string;
}

export const NeobrutalModal: React.FC<NeobrutalModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  bgColor = 'bg-white'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClose = () => {
    sound.playPop();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={handleClose}
      />
      <div
        className={`relative z-10 w-full max-w-2xl neo-box-lg rounded-2xl ${bgColor} p-6 sm:p-8 max-h-[90vh] overflow-y-auto transform transition-all animate-in zoom-in-95 duration-200`}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b-3 border-black">
          {title ? (
            <h3 className="text-xl sm:text-2xl font-extrabold text-black flex items-center gap-2">
              {title}
            </h3>
          ) : <div />}
          <button
            onClick={handleClose}
            className="neo-btn bg-[#FF597B] text-white p-2 rounded-xl hover:bg-black transition-colors"
            aria-label="Tutup"
          >
            <X className="w-6 h-6 stroke-[3]" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
