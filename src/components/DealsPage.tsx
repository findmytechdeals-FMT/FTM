import React, { useState } from 'react';
import { Tag, Flame, Percent, ChevronRight, ExternalLink, Clock } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from './ProductCard';
import { ViewMode } from '../types';

interface DealsPageProps {
  onNavigate: (view: ViewMode, param?: string) => void;
}

export const DealsPage: React.FC<DealsPageProps> = ({ onNavigate }) => {
  const { products, formatPrice } = useProducts();
  const [minDiscount, setMinDiscount] = useState<number>(0);

  const dealProducts = products.filter(p => {
    if (!p.isDeal) return false;
    if (minDiscount > 0 && (p.discount || 0) < minDiscount) return false;
    return true;
  }).sort((a, b) => (b.discount || 0) - (a.discount || 0));

  return (
    <div className="py-10 bg-white min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 text-left">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4" />
              <span>Verified Tech Discounts</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 tracking-tight">
              Today's Best Tech Deals
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Active promotional pricing verified across Amazon AE, Noon, and Sharaf DG.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Discount Filter:</span>
            {[0, 10, 20, 30].map(disc => (
              <button
                key={disc}
                onClick={() => setMinDiscount(disc)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  minDiscount === disc
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200/80'
                }`}
              >
                {disc === 0 ? 'All Deals' : `${disc}%+ Off`}
              </button>
            ))}
          </div>
        </div>

        {/* Deals Grid */}
        {dealProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealProducts.map(product => (
              <ProductCard key={product.id} product={product} onNavigate={onNavigate} showDealBadge={true} />
            ))}
          </div>
        ) : (
          <div className="p-14 text-center bg-slate-50 border border-slate-200 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
              <Tag className="w-5 h-5" />
            </div>
            <p className="text-slate-950 font-bold text-base">Promotional Deals Refreshing</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We monitor live prices across Noon, Amazon, and Sharaf DG. Check back soon for discounts or explore our complete catalog.
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="mt-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
            >
              Back to Catalog
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
