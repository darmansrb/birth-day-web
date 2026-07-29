import React from 'react';
import { clsx } from 'clsx';
import { sound } from '@/utils/sound';

interface NeobrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'yellow' | 'pink' | 'cyan' | 'green' | 'purple' | 'orange' | 'white';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const NeobrutalButton: React.FC<NeobrutalButtonProps> = ({
  variant = 'yellow',
  size = 'md',
  className,
  children,
  onClick,
  ...props
}) => {
  const bgClasses = {
    yellow: 'bg-[#FFE600] text-black',
    pink: 'bg-[#FF597B] text-white',
    cyan: 'bg-[#00F0FF] text-black',
    green: 'bg-[#A6FF00] text-black',
    purple: 'bg-[#B8C0FF] text-black',
    orange: 'bg-[#FF8E3C] text-black',
    white: 'bg-white text-black'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg'
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    sound.playPop();
    if (onClick) onClick(e);
  };

  return (
    <button
      className={clsx(
        'neo-btn font-extrabold flex items-center justify-center gap-2 rounded-xl transition-all duration-150',
        bgClasses[variant],
        sizeClasses[size],
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
