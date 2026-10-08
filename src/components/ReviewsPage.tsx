import React from 'react';
import { Star, Sparkles, Check, X, ArrowRight, ExternalLink } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ViewMode } from '../types';
import { ProductPlaceholder } from './ProductPlaceholder';

interface ReviewsPageProps {
  onNavigate: (view: ViewMode, param?: string) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onNavigate }) => {
  const { products, formatPrice, recordAffiliateClick } = useProducts();

  return (
    <div className="py-10 bg-white min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-1.5 text-xs text-cyan-600 font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Independent Lab Testing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 tracking-tight">
            Tech Reviews & Editorial Verdicts
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            In-depth analysis and hardware breakdowns across all consumer tech departments.
          </p>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map(product => {
            const lowest = product.retailers[0];

            return (
              <div 
                key={product.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-cyan-500/50 transition-all shadow-sm hover:shadow-lg"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      onClick={() => onNavigate('product', product.slug)}
                      className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-200 p-2 shrink-0 flex items-center justify-center cursor-pointer overflow-hidden"
                    >
                      {product.primaryImage ? (
                        <img 
                          src={product.primaryImage} 
                          alt={product.name} 
                          className="max-h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <ProductPlaceholder categoryId={product.categoryId} name={product.name} className="min-h-0 h-full p-1" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="font-bold text-cyan-600 uppercase tracking-wider">{product.brand}</span>
                        <span>·</span>
                        <span>{product.subcategory}</span>
                      </div>
                      <h3 
                        onClick={() => onNavigate('product', product.slug)}
                        className="font-display font-bold text-base text-slate-900 hover:text-cyan-600 cursor-pointer truncate mt-0.5"
                      >
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5 text-xs">
                        <div className="flex items-center text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                          <span>{product.rating} / 5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verdict summary */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-4">
                    <p className="text-xs text-slate-700 italic leading-relaxed">
                      "{product.verdict}"
                    </p>
                  </div>

                  {/* Top Pro & Con snippet */}
                  <div className="space-y-1.5 text-xs mb-4">
                    {product.pros[0] && (
                      <div className="flex items-start gap-2 text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-[11px]"><strong className="text-emerald-700">Pro:</strong> {product.pros[0]}</span>
                      </div>
                    )}
                    {product.cons[0] && (
                      <div className="flex items-start gap-2 text-slate-700">
                        <X className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                        <span className="text-[11px]"><strong className="text-rose-700">Con:</strong> {product.cons[0]}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 block font-medium">Price</span>
                    <span className="text-sm font-extrabold text-slate-900 tabular-nums">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate('product', product.slug)}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Read Specs
                    </button>
                    {lowest && (
                      <button
                        onClick={() => recordAffiliateClick(product, lowest)}
                        className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <span>View Deal</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
