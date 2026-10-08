import React from 'react';
import { Heart, Trash2, ExternalLink, ArrowRight, ShoppingBag } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ViewMode } from '../types';
import { ProductPlaceholder } from './ProductPlaceholder';

interface WishlistPageProps {
  onNavigate: (view: ViewMode, param?: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ onNavigate }) => {
  const { 
    products, 
    wishlist, 
    toggleWishlist, 
    formatPrice, 
    recordAffiliateClick 
  } = useProducts();

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="py-10 bg-white min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex items-end justify-between text-left">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-rose-600 font-bold uppercase tracking-wider mb-2">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Personal Saved Tech</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 tracking-tight">
              My Wishlist
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Track price drops and check availability on your favorite tech devices.
            </p>
          </div>

          <span className="text-xs text-slate-500 font-semibold">
            {savedProducts.length} {savedProducts.length === 1 ? 'item saved' : 'items saved'}
          </span>
        </div>

        {/* Products List */}
        {savedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProducts.map(product => {
              const lowest = product.retailers[0];

              return (
                <div 
                  key={product.id}
                  className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all shadow-sm relative group"
                >
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div>
                    <div 
                      onClick={() => onNavigate('product', product.slug)}
                      className="aspect-[4/3] rounded-2xl bg-slate-50 p-4 mb-4 flex items-center justify-center cursor-pointer border border-slate-150"
                    >
                      {product.primaryImage ? (
                        <img 
                          src={product.primaryImage} 
                          alt={product.name} 
                          className="max-h-36 object-contain group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <ProductPlaceholder categoryId={product.categoryId} name={product.name} />
                      )}
                    </div>

                    <div className="text-[11px] font-bold text-cyan-600 uppercase tracking-wider mb-1">
                      {product.brand} · {product.subcategory}
                    </div>

                    <h3 
                      onClick={() => onNavigate('product', product.slug)}
                      className="font-display font-bold text-base text-slate-900 hover:text-cyan-600 cursor-pointer line-clamp-2"
                    >
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-xs text-slate-400 block font-medium">Price</span>
                        <span className="text-lg font-extrabold text-slate-900 tabular-nums">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {lowest && (
                        <button
                          onClick={() => recordAffiliateClick(product, lowest)}
                          className="flex-1 py-2 px-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>View Deal</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => onNavigate('product', product.slug)}
                        className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors border border-slate-200 cursor-pointer"
                      >
                        Specs
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-16 text-center max-w-lg mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto text-slate-400 shadow-2xs">
              <Heart className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Your wishlist is empty</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Explore gadgets and click the heart icon on any product card to save it here for tracking.
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="mt-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer"
            >
              Explore Products
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
