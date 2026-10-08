import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Heart, 
  Scale, 
  Menu, 
  X, 
  SlidersHorizontal, 
  ExternalLink, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ViewMode, Product } from '../types';

import { FmtLogo } from './FmtLogo';
import { CurrencyLogo } from './CurrencyLogo';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode, param?: string) => void;
  selectedCategorySlug?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  onNavigate,
  selectedCategorySlug
}) => {
  const { 
    products, 
    categories, 
    wishlist, 
    compareList, 
    currency, 
    setCurrency, 
    formatPrice 
  } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' or 'Ctrl+K'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) && !isSearchOpen) {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const searchResults: Product[] = searchQuery.trim() === '' ? [] : products.filter(p => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }).slice(0, 6);

  const primaryNavItems = [
    { label: 'Smartphones', slug: 'smartphones' },
    { label: 'Audio', slug: 'audio' },
    { label: 'Computers', slug: 'computers' },
    { label: 'TVs', slug: 'tvs' },
    { label: 'Price Compare', view: 'compare' as ViewMode, isHighlight: true },
    { label: 'Deals', view: 'deals' as ViewMode },
    { label: 'Reviews', view: 'reviews' as ViewMode },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 transition-all shadow-xs">
        {/* Top Trust & Currency Microbar */}
        <div className="bg-slate-50 border-b border-slate-200/80 py-1.5 px-4 sm:px-8 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              Verified Retailer Price Comparison
            </span>
            <span className="hidden md:inline text-slate-300">·</span>
            <span className="hidden md:inline text-slate-500">
              Zero Markup — Direct Retailer Deals
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency selector with Official Logos */}
            <div className="flex items-center gap-1.5 bg-slate-100/80 p-0.5 rounded-lg border border-slate-200 text-[11px]">
              <span className="text-slate-400 font-medium px-1 hidden sm:inline">Region:</span>
              <button 
                onClick={() => setCurrency('AED')} 
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md transition-all cursor-pointer font-bold ${
                  currency === 'AED' 
                    ? 'bg-white text-emerald-900 shadow-2xs border border-emerald-300/80' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="United Arab Emirates Dirham (AED)"
              >
                <CurrencyLogo currency="AED" size="xs" />
                <span>AED (د.إ)</span>
              </button>
              <button 
                onClick={() => setCurrency('SAR')} 
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md transition-all cursor-pointer font-bold ${
                  currency === 'SAR' 
                    ? 'bg-white text-emerald-900 shadow-2xs border border-emerald-300/80' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Saudi Arabia Riyal (SAR)"
              >
                <CurrencyLogo currency="SAR" size="xs" />
                <span>SAR (ر.س)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main 3-Zone Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Zone 1: Brand Wordmark with Official FMT Emblem */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
            >
              <FmtLogo size="md" variant="horizontal" />
            </button>
          </div>

          {/* Zone 2: Primary Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-semibold">
            <button
              onClick={() => onNavigate('home')}
              className={`transition-colors hover:text-cyan-600 cursor-pointer ${currentView === 'home' ? 'text-cyan-600 font-bold' : 'text-slate-600'}`}
            >
              Home
            </button>

            {primaryNavItems.slice(0, 5).map(item => (
              <button
                key={item.slug}
                onClick={() => onNavigate('category', item.slug)}
                className={`transition-colors hover:text-cyan-600 cursor-pointer ${currentView === 'category' && selectedCategorySlug === item.slug ? 'text-cyan-600 font-bold' : 'text-slate-600'}`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => onNavigate('deals')}
              className={`flex items-center gap-1.5 transition-colors hover:text-amber-600 cursor-pointer ${currentView === 'deals' ? 'text-amber-600 font-bold' : 'text-amber-600 font-medium'}`}
            >
              <TrendingDown className="w-3.5 h-3.5" />
              Deals
            </button>

            <button
              onClick={() => onNavigate('reviews')}
              className={`transition-colors hover:text-cyan-600 cursor-pointer ${currentView === 'reviews' ? 'text-cyan-600 font-bold' : 'text-slate-600'}`}
            >
              Reviews
            </button>

            <button
              onClick={() => onNavigate('compare')}
              className={`transition-colors hover:text-cyan-600 cursor-pointer ${currentView === 'compare' ? 'text-cyan-600 font-bold' : 'text-slate-600'}`}
            >
              Compare
            </button>
          </nav>

          {/* Zone 3: Search, Compare, Wishlist, Mobile trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Prominent Search bar trigger */}
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setTimeout(() => searchInputRef.current?.focus(), 50);
              }}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-150 border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-xl text-xs text-slate-500 transition-colors w-32 sm:w-48 lg:w-56 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 cursor-pointer shadow-2xs"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate text-left flex-1">Search tech catalog...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white border border-slate-200 text-slate-500 rounded shadow-2xs font-mono">
                /
              </kbd>
            </button>

            {/* Compare Drawer Indicator */}
            <button
              onClick={() => onNavigate('compare')}
              className="relative p-2 rounded-xl text-slate-600 hover:text-cyan-600 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
              title="Compare Products"
              aria-label="Compare"
            >
              <Scale className="w-4 h-4" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist Indicator */}
            <button
              onClick={() => onNavigate('wishlist')}
              className="relative p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
              title="My Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-lg">
            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <button
                onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded-lg bg-slate-50 text-slate-800 hover:text-cyan-600 font-semibold"
              >
                Home
              </button>
              <button
                onClick={() => { onNavigate('deals'); setIsMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded-lg bg-amber-50 text-amber-700 font-semibold flex items-center gap-1.5"
              >
                <TrendingDown className="w-3.5 h-3.5" /> Deals
              </button>
              <button
                onClick={() => { onNavigate('reviews'); setIsMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded-lg bg-slate-50 text-slate-800 hover:text-cyan-600"
              >
                Tech Reviews
              </button>
              <button
                onClick={() => { onNavigate('compare'); setIsMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded-lg bg-cyan-50 text-cyan-800 font-bold flex items-center justify-between"
              >
                <span>Price Compare & Specs</span>
                <span className="text-xs bg-cyan-200/70 text-cyan-900 px-2 py-0.5 rounded-full">{compareList.length}</span>
              </button>
              <button
                onClick={() => { onNavigate('wishlist'); setIsMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded-lg bg-slate-50 text-slate-800 hover:text-cyan-600"
              >
                Saved Wishlist ({wishlist.length})
              </button>
            </div>

            {/* Mobile Currency Selector */}
            <div className="pt-2 border-t border-slate-200">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Market Currency
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setCurrency('AED')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border font-bold cursor-pointer transition-colors ${
                    currency === 'AED'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <CurrencyLogo currency="AED" size="xs" />
                  <span>AED (د.إ)</span>
                </button>
                <button
                  onClick={() => setCurrency('SAR')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border font-bold cursor-pointer transition-colors ${
                    currency === 'SAR'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <CurrencyLogo currency="SAR" size="xs" />
                  <span>SAR (ر.س)</span>
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Browse Categories
              </p>
              <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { onNavigate('category', cat.slug); setIsMobileMenuOpen(false); }}
                    className="text-left px-2 py-1.5 rounded hover:bg-slate-100 hover:text-cyan-600 truncate"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Search Input Bar */}
            <div className="relative flex items-center border-b border-slate-200 px-5 py-4">
              <Search className="w-5 h-5 text-cyan-600 shrink-0 mr-3" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search smartphones, audio, computers, gaming, appliances..."
                className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600 text-xs font-semibold cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="ml-2 p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Suggestions */}
            {searchQuery.trim() === '' ? (
              <div className="p-5 space-y-5 bg-slate-50/50">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                    Browse Popular Departments
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {['Smartphones', 'Earbuds & Headphones', 'Laptops & Computers', 'OLED TVs', 'Home Appliances', 'Gaming Consoles'].map(term => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-3 py-1.5 rounded-lg bg-white hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 font-medium border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Quick Jump to Category
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {categories.slice(0, 6).map(c => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          onNavigate('category', c.slug);
                        }}
                        className="text-left px-3 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-cyan-600 font-semibold border border-slate-200 flex items-center justify-between transition-colors shadow-2xs cursor-pointer"
                      >
                        <span className="truncate">{c.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Live Results */
              <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-slate-100">
                {searchResults.length > 0 ? (
                  searchResults.map(product => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        onNavigate('product', product.slug);
                      }}
                      className="group flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                        {product.primaryImage ? (
                          <img
                            src={product.primaryImage}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="text-[10px] font-bold text-cyan-600">FMT</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <span className="font-bold text-cyan-600 uppercase tracking-wider">{product.brand}</span>
                          <span>·</span>
                          <span>{product.subcategory}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 truncate">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs mt-0.5">
                          <span className="font-semibold text-slate-700">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 shrink-0" />
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center text-slate-500 text-sm">
                    <p className="font-semibold text-slate-700">No products found for "{searchQuery}".</p>
                    <p className="text-xs text-slate-400 mt-1">Try searching by category or browse all 12 tech departments.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
