import React from 'react';
import { useProducts } from '../context/ProductContext';

interface FmtLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'auto';
  variant?: 'stacked' | 'horizontal' | 'icon';
}

export const FmtLogo: React.FC<FmtLogoProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'horizontal'
}) => {
  const { siteLogoUrl } = useProducts();

  const iconSizeClasses = {
    sm: 'h-6 w-auto',
    md: 'h-8 w-auto',
    lg: 'h-10 w-auto',
    xl: 'h-13 w-auto',
    '2xl': 'h-16 w-auto',
    auto: 'h-full w-auto'
  }[size];

  // If user uploaded a custom logo image, use it directly
  if (siteLogoUrl) {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img 
          src={siteLogoUrl} 
          alt="Find My Tech" 
          className={`${iconSizeClasses} object-contain`}
          onError={(e) => {
            // fallback if custom URL fails
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
        {variant !== 'icon' && (
          <span className="sr-only">FIND MY TECH</span>
        )}
      </div>
    );
  }

  // Official Clean Modern Tech Emblem for FIND MY TECH (FMT)
  const Emblem = (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${
        size === 'sm' ? 'w-7 h-7 rounded-lg' :
        size === 'md' ? 'w-9 h-9 rounded-xl' :
        size === 'lg' ? 'w-11 h-11 rounded-2xl' :
        size === 'xl' ? 'w-14 h-14 rounded-2xl' :
        size === '2xl' ? 'w-20 h-20 rounded-3xl' :
        'w-9 h-9 rounded-xl'
      } bg-slate-950 text-white shadow-sm border border-slate-800/80 group-hover:border-cyan-500/50 transition-colors`}
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[70%] h-[70%]"
        aria-hidden="true"
      >
        {/* Geometric Minimal Monogram FMT */}
        {/* Letter F */}
        <path d="M7 11 H19 V14.5 H11 V19 H17 V22.5 H11 V30 H7 V11 Z" fill="#FFFFFF" />
        {/* Center M Chevron in Electric Cyan */}
        <path d="M19 11 L25 24 L31 11 H34 V30 H30.5 V18 L25.5 29 H24.5 L19.5 18 V30 H16 V11 H19 Z" fill="#00C2FF" />
        {/* T Cross & Accent dot */}
        <circle cx="34" cy="11.5" r="2.5" fill="#38BDF8" />
      </svg>
    </div>
  );

  // Modern Typography Lockup: FIND MY TECH
  const TextLockup = (
    <div className="flex flex-col text-left select-none">
      <div className="flex items-center gap-1 font-display tracking-widest font-extrabold leading-none">
        <span className="text-slate-950 text-sm sm:text-base tracking-[0.16em] font-black">
          FIND
        </span>
        <span className="text-cyan-600 text-sm sm:text-base tracking-[0.16em] font-black">
          MY
        </span>
        <span className="text-slate-950 text-sm sm:text-base tracking-[0.16em] font-black">
          TECH
        </span>
      </div>
      {size !== 'sm' && (
        <span className="text-[8.5px] font-bold text-slate-400 tracking-[0.24em] uppercase mt-1">
          Consumer Electronics
        </span>
      )}
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{Emblem}</div>;
  }

  if (variant === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center justify-center gap-2.5 text-center ${className}`}>
        {Emblem}
        <div className="flex flex-col items-center select-none">
          <div className="flex items-center gap-1.5 font-display tracking-widest font-black leading-none">
            <span className="text-slate-950 text-base sm:text-lg tracking-[0.18em]">FIND</span>
            <span className="text-cyan-600 text-base sm:text-lg tracking-[0.18em]">MY</span>
            <span className="text-slate-950 text-base sm:text-lg tracking-[0.18em]">TECH</span>
          </div>
          <span className="text-[9px] font-bold text-slate-500 tracking-[0.24em] uppercase mt-1.5">
            Consumer Electronics Discovery
          </span>
        </div>
      </div>
    );
  }

  // Default: Horizontal lockup
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {Emblem}
      {TextLockup}
    </div>
  );
};
