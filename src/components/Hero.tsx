import React from 'react';
import { ArrowRight, Tag, ShieldCheck, Zap, Sparkles, CheckCircle2, Scale } from 'lucide-react';
import { ViewMode } from '../types';
import { useProducts } from '../context/ProductContext';
import { FmtLogo } from './FmtLogo';
import { CurrencyLogo } from './CurrencyLogo';

interface HeroProps {
  onNavigate: (view: ViewMode, param?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { categories, currency } = useProducts();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-20 border-b border-slate-200/80 bg-white">
      {/* Soft gradient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-cyan-50/70 via-blue-50/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Trust Kicker */}
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="text-cyan-600 font-bold tracking-wider uppercase text-[11px]">
                Find My Tech
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Consumer Electronics Discovery & Retailer Deals</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-950 leading-[1.1] text-balance">
              Find Your <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">Next Tech.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed text-balance">
              Discover, compare and find the best technology for you. Browse 12 consumer electronics departments and discover direct retailer deals across Amazon, Noon, and Sharaf DG with verified prices.
            </p>

            {/* Customer CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('compare')}
                className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2 group cursor-pointer"
              >
                <Scale className="w-4 h-4" />
                <span>Compare Store Prices</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('category', 'smartphones')}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors shadow-2xs flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Products</span>
              </button>

              <button
                onClick={() => onNavigate('deals')}
                className="px-5 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-800 hover:text-slate-950 font-bold text-sm rounded-xl transition-colors border border-slate-300 shadow-2xs flex items-center gap-2 cursor-pointer"
              >
                <Tag className="w-4 h-4 text-amber-500" />
                <span>Today's Top Deals</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200/80 text-left max-w-lg">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold font-display text-slate-900 tabular-nums">12</p>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">Departments</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold font-display text-cyan-600 tabular-nums">100%</p>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">Verified Stores</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <CurrencyLogo currency={currency} size="xs" />
                  <span className="text-xl sm:text-2xl font-extrabold font-display text-slate-900 tabular-nums">0</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">Zero Buyer Markup</p>
              </div>
            </div>
          </div>

          {/* Right Column: Customer Brand Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-white border border-slate-200 p-8 shadow-xl hover:shadow-2xl transition-all text-center space-y-6">
              
              {/* Top pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                <span>Smart Consumer Tech Finder</span>
              </div>

              {/* Official Stacked Logo */}
              <div className="py-4 flex items-center justify-center">
                <FmtLogo size="xl" variant="stacked" />
              </div>

              {/* Retailer direct benefit callout */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-cyan-600" />
                  <span>Direct Retailer Checkout</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Click <strong>Buy Now</strong> on any product to jump directly to official stores including Amazon, Noon, and Sharaf DG with full manufacturer warranty and local delivery.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => onNavigate('category', 'audio')}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Audio & Earbuds</span>
                </button>
                <button
                  onClick={() => onNavigate('category', 'smartphones')}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Smartphones
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
