import React from 'react';

export type SupportedCurrency = 'AED' | 'SAR';

interface CurrencyLogoProps {
  currency: SupportedCurrency;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

/**
 * Official UAE Dirham (AED) Logo Component
 * Incorporates the authentic UAE Dirham symbol (د.إ) in a crisp, high-resolution vector emblem
 */
export const AedLogo: React.FC<{ className?: string; size?: 'xs' | 'sm' | 'md' | 'lg' }> = ({
  className = '',
  size = 'sm'
}) => {
  const sizeMap = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const currentSize = className.includes('w-') ? className : `${sizeMap[size]} ${className}`;

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${currentSize}`}
      aria-label="UAE Dirham (AED) currency logo"
      role="img"
    >
      <title>UAE Dirham (AED)</title>
      {/* UAE Dirham Hexagonal / Coin Emblem with UAE Accent */}
      <circle cx="24" cy="24" r="22" className="fill-emerald-500/10 stroke-emerald-600/40" strokeWidth="2" />
      <circle cx="24" cy="24" r="19" className="fill-slate-900" />
      {/* UAE Flag Subtle Bar Highlight on Rim */}
      <path d="M7 24 C7 14.6 14.6 7 24 7" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 7 C33.4 7 41 14.6 41 24" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M41 24 C41 33.4 33.4 41 24 41" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />
      {/* Official Arabic UAE Dirham Calligraphic Text (د.إ) */}
      <text
        x="24"
        y="28"
        textAnchor="middle"
        fill="#F8FAFC"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="17"
        letterSpacing="0.5"
      >
        د.إ
      </text>
    </svg>
  );
};

/**
 * Official Saudi Riyal (SAR) Logo Component
 * Features the official Saudi Emblem (Two crossed swords and palm tree) & official Saudi Riyal symbol (ر.س)
 */
export const SarLogo: React.FC<{ className?: string; size?: 'xs' | 'sm' | 'md' | 'lg' }> = ({
  className = '',
  size = 'sm'
}) => {
  const sizeMap = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const currentSize = className.includes('w-') ? className : `${sizeMap[size]} ${className}`;

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${currentSize}`}
      aria-label="Saudi Riyal (SAR) currency logo"
      role="img"
    >
      <title>Saudi Riyal (SAR)</title>
      {/* Saudi Emblem Gold / Forest Ring */}
      <circle cx="24" cy="24" r="22" className="fill-amber-500/10 stroke-emerald-600/50" strokeWidth="2" />
      <circle cx="24" cy="24" r="19" className="fill-emerald-950" />
      
      {/* Palm Tree Crown */}
      <path
        d="M24 10 L24 19 M24 10 C21 11 18 13 17 16 C19 15 22 15 24 16 C26 15 29 15 31 16 C30 13 27 11 24 10 Z"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#F59E0B"
      />
      {/* Crossed Swords */}
      <path
        d="M17 24 L31 18 M17 18 L31 24"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Official Arabic Saudi Riyal symbol (ر.س) */}
      <text
        x="24"
        y="38"
        textAnchor="middle"
        fill="#F8FAFC"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="13"
        letterSpacing="0.5"
      >
        ر.س
      </text>
    </svg>
  );
};

/**
 * Universal Currency Logo component for AED and SAR
 */
export const CurrencyLogo: React.FC<CurrencyLogoProps> = ({
  currency,
  className = '',
  size = 'sm',
  showLabel = false
}) => {
  return (
    <span className="inline-flex items-center gap-1.5 shrink-0 align-middle">
      {currency === 'SAR' ? (
        <SarLogo className={className} size={size} />
      ) : (
        <AedLogo className={className} size={size} />
      )}
      {showLabel && (
        <span className="font-bold text-[11px] tracking-wide">
          {currency === 'SAR' ? 'SAR (ر.س)' : 'AED (د.إ)'}
        </span>
      )}
    </span>
  );
};

interface PriceWithLogoProps {
  amount: number;
  currency: SupportedCurrency;
  className?: string;
  logoSize?: 'xs' | 'sm' | 'md' | 'lg';
  showCode?: boolean;
}

/**
 * Helper component that renders the authentic currency logo followed by the formatted amount and currency code
 */
export const PriceWithLogo: React.FC<PriceWithLogoProps> = ({
  amount,
  currency,
  className = '',
  logoSize = 'sm',
  showCode = true
}) => {
  if (!amount || amount <= 0) {
    return <span className="text-slate-400 font-medium">Price Updating</span>;
  }

  // 1 AED = 1.021 SAR (official GCC pegged currency conversion)
  const convertedAmount = currency === 'SAR' ? Math.round(amount * 1.021) : amount;
  const formatted = convertedAmount.toLocaleString();

  return (
    <span className={`inline-flex items-center gap-1.5 tabular-nums ${className}`}>
      <CurrencyLogo currency={currency} size={logoSize} />
      <span>{formatted}</span>
      {showCode && (
        <span className="text-[0.75em] opacity-80 font-semibold tracking-wider uppercase ml-0.5">
          {currency}
        </span>
      )}
    </span>
  );
};
