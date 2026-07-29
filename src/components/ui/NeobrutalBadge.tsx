import React from 'react';
import { clsx } from 'clsx';

interface NeobrutalBadgeProps {
  color?: 'yellow' | 'pink' | 'cyan' | 'green' | 'purple' | 'orange' | 'white';
  children: React.ReactNode;
  className?: string;
}

export const NeobrutalBadge: React.FC<NeobrutalBadgeProps> = ({
  color = 'yellow',
  children,
  className
}) => {
  const colorMap = {
    yellow: 'bg-[#FFE600] text-black',
    pink: 'bg-[#FF597B] text-white',
    cyan: 'bg-[#00F0FF] text-black',
    green: 'bg-[#A6FF00] text-black',
    purple: 'bg-[#B8C0FF] text-black',
    orange: 'bg-[#FF8E3C] text-black',
    white: 'bg-white text-black'
  };

  return (
    <span
      className={clsx(
        'neo-tag px-3 py-1 text-xs sm:text-sm font-extrabold rounded-lg inline-flex items-center gap-1.5',
        colorMap[color],
        className
      )}
    >
      {children}
    </span>
  );
};
