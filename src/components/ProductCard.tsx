import React from 'react';
import { Star, Heart, Scale, ExternalLink, ArrowRight, Store } from 'lucide-react';
import { Product, ViewMode } from '../types';
import { useProducts } from '../context/ProductContext';
import { ProductPlaceholder } from './ProductPlaceholder';
import { PriceWithLogo, CurrencyLogo } from './CurrencyLogo';

interface ProductCardProps {
  product: Product;
  onNavigate: (view: ViewMode, param?: string) => void;
  showDealBadge?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onNavigate,
  showDealBadge = true
}) => {
  const { 
    currency,
    formatPrice, 
    toggleWishlist, 
    isWishlisted, 
    toggleCompare, 
    isCompared, 
    recordAffiliateClick 
  } = useProducts();

  const sortedOffers = product.retailers && product.retailers.length > 0 
    ? [...product.retailers].sort((a, b) => a.price - b.price)
    : [];

  const lowestOffer = sortedOffers.length > 0 ? sortedOffers[0] : null;
  const highestOffer = sortedOffers.length > 1 ? sortedOffers[sortedOffers.length - 1] : null;
  const storeCount = sortedOffers.length;
  const priceDifference = highestOffer && lowestOffer ? (highestOffer.price - lowestOffer.price) : 0;

  const inWishlist = isWishlisted(product.id);
  const inCompare = isCompared(product.id);
  const displayPrice = lowestOffer ? lowestOffer.price : product.price;
  const hasPrice = displayPrice > 0;

  return (
    <div className="group relative rounded-2xl bg-white border border-slate-200/90 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/60">
      
      {/* Top Floating Controls: Wishlist & Compare */}
      <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleCompare(product.id);
          }}
          className={`p-1.5 rounded-lg backdrop-blur-md transition-all text-xs cursor-pointer ${
            inCompare 
              ? 'bg-cyan-600 text-white font-bold shadow-sm' 
              : 'bg-white/90 text-slate-500 hover:text-cyan-600 hover:bg-slate-50 border border-slate-200/80 shadow-xs'
          }`}
          title={inCompare ? 'Remove from Compare' : 'Add to Compare'}
          aria-label="Toggle compare"
        >
          <Scale className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`p-1.5 rounded-lg backdrop-blur-md transition-all text-xs cursor-pointer ${
            inWishlist 
              ? 'bg-rose-500 text-white shadow-sm' 
              : 'bg-white/90 text-slate-500 hover:text-rose-500 hover:bg-slate-50 border border-slate-200/80 shadow-xs'
          }`}
          title={inWishlist ? 'Remove from Wishlist' : 'Save to Wishlist'}
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Deal Ribbon / Saving Highlight */}
      {showDealBadge && product.isDeal && product.discount ? (
        <div className="absolute top-2.5 left-2.5 z-10 bg-amber-400 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">
          {product.discount}% OFF
        </div>
      ) : storeCount > 1 ? (
        <div className="absolute top-2.5 left-2.5 z-10 bg-slate-900/90 text-white font-bold text-[10px] tracking-wide px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
          <Store className="w-2.5 h-2.5 text-cyan-400" />
          <span>Compare {storeCount} Stores</span>
        </div>
      ) : null}

      {/* Clickable Image Container */}
      <div 
        onClick={() => onNavigate('product', product.slug)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50/70 p-4 flex items-center justify-center cursor-pointer border-b border-slate-100"
      >
        {product.primaryImage ? (
          <img
            src={product.primaryImage}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        ) : (
          <ProductPlaceholder categoryId={product.categoryId} name={product.name} />
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div onClick={() => onNavigate('product', product.slug)} className="cursor-pointer">
          {/* Brand & Subcategory */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1">
            <span className="font-bold text-cyan-600 uppercase tracking-wider">{product.brand}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="truncate">{product.subcategory}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="ml-1 font-bold text-slate-700 tabular-nums">{product.rating}</span>
            </div>
            <span className="text-slate-400 text-[11px]">
              {product.reviewCount > 0 ? `(${product.reviewCount})` : 'Verified deal'}
            </span>
          </div>
        </div>

        {/* Pricing & Retailer Comparison Section */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          
          {/* Best Price with Currency Logo */}
          <div className="flex items-baseline justify-between">
            <div>
              {hasPrice ? (
                <div className="flex items-center gap-2">
                  <PriceWithLogo
                    amount={displayPrice}
                    currency={currency}
                    className="text-base font-extrabold text-slate-950"
                    logoSize="xs"
                  />
                  {product.originalPrice && product.originalPrice > displayPrice && (
                    <span className="text-xs text-slate-400 line-through tabular-nums">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-xs font-semibold text-slate-500">
                  Price: Checking Stores
                </span>
              )}
            </div>

            {lowestOffer ? (
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 truncate max-w-[110px]">
                Best on {lowestOffer.retailerName}
              </span>
            ) : (
              <span className="text-[10px] text-slate-400 font-medium">
                Authorized Dealer
              </span>
            )}
          </div>

          {/* Multi-Store Comparison Bar if 2+ stores available */}
          {storeCount > 1 && (
            <div 
              onClick={() => onNavigate('product', product.slug)} 
              className="mt-2.5 py-1.5 px-2 bg-slate-50 hover:bg-cyan-50/60 rounded-lg border border-slate-200/80 cursor-pointer transition-colors flex items-center justify-between text-[11px]"
              title="Click to view all retailer prices"
            >
              <div className="flex items-center gap-1.5 text-slate-600 truncate">
                <span className="font-semibold text-slate-800">Compare {storeCount} stores:</span>
                <span className="text-slate-500 truncate">
                  {sortedOffers.slice(0, 3).map(o => o.retailerName).join(', ')}
                </span>
              </div>
              {priceDifference > 0 && (
                <span className="text-[10px] font-bold text-cyan-700 bg-cyan-100/70 px-1.5 py-0.2 rounded shrink-0 ml-1">
                  Save {formatPrice(priceDifference)}
                </span>
              )}
            </div>
          )}

          {/* Action Row */}
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => {
                if (lowestOffer) {
                  recordAffiliateClick(product, lowestOffer);
                } else {
                  onNavigate('product', product.slug);
                }
              }}
              className="flex-1 py-2.5 px-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer tracking-wide"
            >
              <span>{lowestOffer ? `BUY NOW (${lowestOffer.retailerName})` : 'Compare Prices'}</span>
              <ExternalLink className="w-3 h-3" />
            </button>

            <button
              onClick={() => onNavigate('product', product.slug)}
              className="py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-semibold text-xs rounded-xl transition-colors border border-slate-200 cursor-pointer flex items-center gap-1"
              title="Compare all store prices and specs"
            >
              <span>Compare</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
