import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  Scale, 
  ExternalLink, 
  ChevronRight, 
  ShieldCheck, 
  Check, 
  X as CloseIcon, 
  Sparkles, 
  Youtube, 
  ArrowLeft,
  SlidersHorizontal,
  ImagePlus
} from 'lucide-react';
import { Product, ViewMode } from '../types';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from './ProductCard';
import { ProductPlaceholder } from './ProductPlaceholder';
import { CurrencyLogo, PriceWithLogo } from './CurrencyLogo';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (view: ViewMode, param?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onNavigate }) => {
  const { 
    products, 
    categories, 
    currency,
    setCurrency,
    formatPrice, 
    toggleWishlist, 
    isWishlisted, 
    toggleCompare, 
    isCompared, 
    recordAffiliateClick 
  } = useProducts();

  const product = products.find(p => p.slug === slug) || products[0];
  const [selectedImage, setSelectedImage] = useState(product?.primaryImage || '');

  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.primaryImage);
      window.scrollTo(0, 0);
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="py-24 text-center bg-white min-h-screen">
        <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
        <button 
          onClick={() => onNavigate('home')} 
          className="mt-4 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-sm"
        >
          Return Home
        </button>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.categoryId);
  const inWishlist = isWishlisted(product.id);
  const inCompare = isCompared(product.id);
  const hasPrice = product.price > 0;

  // Related products
  const related = products
    .filter(p => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

  // Sorted retailers by price ascending
  const sortedRetailers = [...product.retailers].sort((a, b) => a.price - b.price);
  const lowestRetailer = sortedRetailers[0];

  const gallery = [
    product.primaryImage,
    ...(product.galleryImages || [])
  ].filter(Boolean);

  return (
    <div className="py-8 bg-white min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <button onClick={() => onNavigate('home')} className="hover:text-cyan-600 transition-colors cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          {category && (
            <>
              <button 
                onClick={() => onNavigate('category', category.slug)} 
                className="hover:text-cyan-600 transition-colors cursor-pointer"
              >
                {category.name}
              </button>
              <ChevronRight className="w-3 h-3 text-slate-300" />
            </>
          )}
          <span className="text-slate-900 truncate font-semibold">{product.name}</span>
        </nav>

        {/* Back Link */}
        <button
          onClick={() => onNavigate('category', category?.slug || 'smartphones')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 transition-colors mb-6 cursor-pointer font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to {category ? category.name : 'Catalog'}
        </button>

        {/* Top Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Product Images Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl bg-slate-50 border border-slate-200 p-6 flex items-center justify-center overflow-hidden">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-contain max-h-[460px] transition-all duration-300"
                  referrerPolicy="no-referrer"
                  onError={() => setSelectedImage('')}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <ProductPlaceholder categoryId={product.categoryId} name={product.name} className="h-full border-none bg-transparent" />
                </div>
              )}

              {/* Deal Tag */}
              {product.isDeal && product.discount && (
                <div className="absolute top-4 left-4 bg-amber-400 text-slate-950 font-bold text-xs uppercase px-2.5 py-1 rounded shadow-sm">
                  {product.discount}% OFF DEAL
                </div>
              )}
            </div>

            {/* Thumbnail Carousel if images exist */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-2xl bg-slate-50 border p-2 shrink-0 transition-all cursor-pointer ${
                      selectedImage === img
                        ? 'border-cyan-600 ring-2 ring-cyan-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Contiguous Purchase & Retailer Module */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
              
              {/* Brand, Name, SKU */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span className="font-bold text-cyan-600 uppercase tracking-wider">{product.brand}</span>
                  <span className="text-slate-400">Model: {product.modelNumber}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-950 tracking-tight leading-tight">
                  {product.name}
                </h1>
                
                {/* Rating & Review count */}
                <div className="flex items-center gap-3 mt-3 text-xs">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="ml-1.5 font-bold text-slate-800 text-sm tabular-nums">{product.rating}</span>
                  </div>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500">
                    {product.reviewCount > 0 ? `${product.reviewCount} verified ratings` : 'Ready for launch'}
                  </span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                {product.shortDescription}
              </p>

              {/* Price Highlights */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-500 block mb-1">Lowest Verified Price</span>
                  {hasPrice ? (
                    <div className="flex items-center gap-3">
                      <PriceWithLogo
                        amount={product.price}
                        currency={currency}
                        className="text-3xl font-display font-extrabold text-slate-950"
                        logoSize="md"
                      />
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-slate-400 line-through tabular-nums">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-slate-700">
                      Price: Checking Stores
                    </span>
                  )}
                </div>

                {product.discount ? (
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-md">
                    Save {product.discount}%
                  </span>
                ) : null}
              </div>

              {/* Primary Retailer Direct CTA */}
              {lowestRetailer ? (
                <div className="space-y-2">
                  <button
                    onClick={() => recordAffiliateClick(product, lowestRetailer)}
                    className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-extrabold text-sm rounded-2xl transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>BUY NOW on {lowestRetailer.retailerName}</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-slate-400">
                    Redirects directly to verified official retailer · Zero affiliate surcharge
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-full py-3.5 px-6 bg-slate-100 text-slate-600 font-bold text-xs rounded-2xl border border-slate-200 flex items-center justify-center gap-2">
                    <span>Retailer Offer Coming Soon</span>
                  </div>
                  <p className="text-[11px] text-center text-slate-400">
                    Our team is tracking verified authorized retailer pricing for this product.
                  </p>
                </div>
              )}

              {/* Compare & Wishlist Action Bar */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => toggleCompare(product.id)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                    inCompare 
                      ? 'bg-cyan-600 text-white border-cyan-600' 
                      : 'bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  {inCompare ? 'In Compare List' : 'Add to Compare'}
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                    inWishlist 
                      ? 'bg-rose-500 text-white border-rose-500' 
                      : 'bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-white' : ''}`} />
                  {inWishlist ? 'Saved in Wishlist' : 'Save to Wishlist'}
                </button>
              </div>

            </div>

            {/* Where to Buy - Live Multi-Retailer Price Comparison Table */}
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-display font-extrabold text-slate-950 text-base flex items-center gap-2">
                    <span>Store Price Comparison</span>
                    <span className="text-xs text-cyan-600 font-semibold bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-100">
                      {sortedRetailers.length} stores
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Live verified retailer prices updated daily
                  </p>
                </div>

                {/* Inline Currency Switcher with Logos */}
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 self-start sm:self-auto text-xs">
                  <button
                    onClick={() => setCurrency('AED')}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded font-bold cursor-pointer transition-colors ${
                      currency === 'AED'
                        ? 'bg-white text-emerald-950 shadow-2xs border border-emerald-300'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <CurrencyLogo currency="AED" size="xs" />
                    <span>AED</span>
                  </button>
                  <button
                    onClick={() => setCurrency('SAR')}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded font-bold cursor-pointer transition-colors ${
                      currency === 'SAR'
                        ? 'bg-white text-emerald-950 shadow-2xs border border-emerald-300'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <CurrencyLogo currency="SAR" size="xs" />
                    <span>SAR</span>
                  </button>
                </div>
              </div>

              {/* Price Difference / Savings Highlight */}
              {sortedRetailers.length > 1 && lowestRetailer && sortedRetailers[sortedRetailers.length - 1].price > lowestRetailer.price && (
                <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
                  <span className="font-medium">
                    Save up to <strong className="font-extrabold">{formatPrice(sortedRetailers[sortedRetailers.length - 1].price - lowestRetailer.price)}</strong> by choosing {lowestRetailer.retailerName}!
                  </span>
                  <span className="text-[10px] uppercase font-bold bg-emerald-200/80 text-emerald-900 px-1.5 py-0.5 rounded">
                    Best Deal
                  </span>
                </div>
              )}

              {sortedRetailers.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {sortedRetailers.map((offer, index) => {
                    const priceDiff = lowestRetailer ? (offer.price - lowestRetailer.price) : 0;

                    return (
                      <div 
                        key={offer.id} 
                        className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-900 text-sm">{offer.retailerName}</span>
                            {index === 0 ? (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-bold">
                                Lowest Price ⭐
                              </span>
                            ) : priceDiff > 0 ? (
                              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                                +{formatPrice(priceDiff)}
                              </span>
                            ) : null}
                          </div>
                          <span className="text-[11px] text-slate-500 block mt-0.5 truncate">
                            {offer.shippingInfo || 'Free express delivery'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                          <div className="text-left sm:text-right">
                            <PriceWithLogo
                              amount={offer.price}
                              currency={currency}
                              className="text-sm font-extrabold text-slate-950"
                              logoSize="xs"
                            />
                            {offer.originalPrice && offer.originalPrice > offer.price && (
                              <span className="text-[10px] text-slate-400 line-through block">
                                {formatPrice(offer.originalPrice)}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => recordAffiliateClick(product, offer)}
                            className={`py-2 px-3.5 font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer text-xs shadow-xs ${
                              index === 0
                                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white'
                                : 'bg-slate-900 hover:bg-cyan-600 text-white'
                            }`}
                          >
                            <span>BUY NOW</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <p className="text-xs text-slate-700 font-semibold">
                    Authorized Stores Updating
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Retailer comparison pricing for this item will appear once verified.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Detailed Sections: Editorial Verdict & Specs */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Editorial Overview Card (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs text-cyan-600 font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Editorial Overview</span>
              </div>

              <h2 className="text-2xl font-display font-bold text-slate-950 tracking-tight">
                {product.name} Overview
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Verdict Highlight Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-700">
                  The Bottom Line
                </p>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "{product.verdict}"
                </p>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    What We Like
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {product.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
                  <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <CloseIcon className="w-3.5 h-3.5 text-rose-600" />
                    What Could Be Better
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {product.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-600 font-bold shrink-0 mt-0.5">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Table (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 space-y-4 shadow-sm">
              <h3 className="font-display font-bold text-slate-950 text-lg tracking-tight">
                Technical Specifications
              </h3>
              <p className="text-xs text-slate-500">
                Specifications for model {product.modelNumber}.
              </p>

              <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="p-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs bg-slate-50/30">
                    <span className="font-bold text-slate-600 sm:w-1/3 shrink-0">
                      {key}
                    </span>
                    <span className="text-slate-900 sm:w-2/3 leading-relaxed font-medium">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Product Relationships */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-display font-bold text-slate-950">
                  More in {category?.name || 'Category'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Explore other catalog slots in this department.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => (
                <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
