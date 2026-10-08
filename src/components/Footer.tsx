import React from 'react';
import { ViewMode } from '../types';
import { useProducts } from '../context/ProductContext';
import { 
  ShieldCheck, 
  Youtube, 
  Instagram, 
  Twitter, 
  Facebook, 
  Lock 
} from 'lucide-react';
import { FmtLogo } from './FmtLogo';

interface FooterProps {
  onNavigate: (view: ViewMode, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { categories } = useProducts();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 text-xs">
      
      {/* Transparent Affiliate Disclosure Banner */}
      <div className="border-b border-slate-200/80 py-4 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5 text-slate-600">
            <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0" />
            <p className="text-[11px] leading-relaxed">
              <strong className="text-slate-900 font-bold">Affiliate Disclosure:</strong> Find My Tech may earn a commission when you purchase through links on our website. This does not affect the price you pay or influence our independent editorial scoring.
            </p>
          </div>
          <button
            onClick={() => onNavigate('disclosure')}
            className="text-[11px] text-cyan-600 hover:text-cyan-700 underline underline-offset-2 shrink-0 cursor-pointer font-bold"
          >
            Learn more
          </button>
        </div>
      </div>

      {/* Main Multi-Column Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand & Mission */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <FmtLogo size="md" variant="horizontal" />
            </div>

            <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
              Find My Tech (FMT) is the premier consumer technology discovery and price comparison engine. Discover and compare deals across Amazon, Noon, Sharaf DG, and official tech retailers without markup.
            </p>

            {/* Social Channels */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-rose-600 transition-colors border border-slate-200 shadow-2xs"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-pink-600 transition-colors border border-slate-200 shadow-2xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-cyan-600 transition-colors border border-slate-200 shadow-2xs"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-blue-600 transition-colors border border-slate-200 shadow-2xs"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column: Departments / Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Departments
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 6).map(c => (
                <li key={c.id}>
                  <button
                    onClick={() => onNavigate('category', c.slug)}
                    className="hover:text-cyan-600 transition-colors text-left font-medium cursor-pointer"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column: Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => onNavigate('deals')} className="hover:text-cyan-600 transition-colors cursor-pointer">
                  Today's Best Deals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-cyan-600 transition-colors cursor-pointer">
                  Tech Reviews
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compare')} className="hover:text-cyan-600 transition-colors cursor-pointer">
                  Side-by-Side Comparison
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('wishlist')} className="hover:text-cyan-600 transition-colors cursor-pointer">
                  Saved Wishlist
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Legal & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => onNavigate('disclosure')} className="hover:text-cyan-600 transition-colors text-left cursor-pointer">
                  Affiliate Disclosure
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('disclosure')} className="hover:text-cyan-600 transition-colors text-left cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('disclosure')} className="hover:text-cyan-600 transition-colors text-left cursor-pointer">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('disclosure')} className="hover:text-cyan-600 transition-colors text-left cursor-pointer">
                  About Find My Tech
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <p>© 2026 Find My Tech (FMT). All rights reserved.</p>
            {/* Discreet Owner Access */}
            <button
              onClick={() => onNavigate('admin')}
              className="text-slate-300 hover:text-slate-600 transition-colors p-1 rounded cursor-pointer"
              title="Site Owner Admin Portal"
              aria-label="Admin Portal"
            >
              <Lock className="w-3 h-3" />
            </button>
          </div>
          <p className="text-[11px]">
            Independent Consumer Electronics Discovery & Affiliate Commerce
          </p>
        </div>
      </div>
    </footer>
  );
};
