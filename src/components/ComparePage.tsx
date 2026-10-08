import React, { useState } from 'react';
import { 
  Scale, 
  X, 
  Plus, 
  ExternalLink, 
  Star, 
  Store,
  ArrowRight,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ViewMode, Product } from '../types';
import { ProductPlaceholder } from './ProductPlaceholder';
import { CurrencyLogo, PriceWithLogo } from './CurrencyLogo';

interface ComparePageProps {
  onNavigate: (view: ViewMode, param?: string) => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({ onNavigate }) => {
  const { 
    products, 
    categories,
    compareList, 
    currency,
    setCurrency,
    removeFromCompare, 
    toggleCompare, 
    clearCompare, 
    formatPrice, 
    recordAffiliateClick 
  } = useProducts();

  const [activeTab, setActiveTab] = useState<'store_comparison' | 'spec_matrix'>('store_comparison');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const comparedProducts = products.filter(p => compareList.includes(p.id));
  const effectiveProducts = comparedProducts.length > 0 
    ? comparedProducts 
    : products.slice(0, 3);

  const allSpecKeys = Array.from(
    new Set(effectiveProducts.flatMap(p => Object.keys(p.specifications)))
  );

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.categoryId === selectedCategory);

  return (
    <div className="py-10 bg-white min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Trust Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6 text-left">
          <div>
            <div className="flex items-center gap-2 text-xs text-cyan-600 font-extrabold uppercase tracking-wider mb-2">
              <Scale className="w-4 h-4" />
              <span>Multi-Store Technology Price Comparison</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 tracking-tight">
              Compare Prices & Retailer Deals
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl leading-relaxed">
              Track live pricing across Amazon, Noon, Sharaf DG, Jarir Bookstore, and eXtra. Direct retailer redirect links with zero affiliate markups.
            </p>
          </div>

          {/* Currency Switcher & Global Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Currency Selector with Official Logos */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-500 font-semibold px-1.5">Currency:</span>
              <button
                onClick={() => setCurrency('AED')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${
                  currency === 'AED'
                    ? 'bg-white text-emerald-950 shadow-xs border border-emerald-300'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CurrencyLogo currency="AED" size="xs" />
                <span>AED (د.إ)</span>
              </button>
              <button
                onClick={() => setCurrency('SAR')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${
                  currency === 'SAR'
                    ? 'bg-white text-emerald-950 shadow-xs border border-emerald-300'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CurrencyLogo currency="SAR" size="xs" />
                <span>SAR (ر.س)</span>
              </button>
            </div>

            {/* Tab Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setActiveTab('store_comparison')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'store_comparison'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Store Price Comparison</span>
              </button>
              <button
                onClick={() => setActiveTab('spec_matrix')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'spec_matrix'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Product Spec Matrix ({compareList.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: Live Multi-Store Price Comparison Grid */}
        {activeTab === 'store_comparison' ? (
          <div className="space-y-6">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Categories ({products.length})
              </button>
              {categories.map(cat => {
                const count = products.filter(p => p.categoryId === cat.id).length;
                if (count === 0) return null;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-cyan-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>

            {/* Products Price Comparison Cards */}
            <div className="space-y-4">
              {filteredProducts.map(product => {
                const sortedOffers = product.retailers && product.retailers.length > 0
                  ? [...product.retailers].sort((a, b) => a.price - b.price)
                  : [];
                const lowest = sortedOffers[0];
                const highest = sortedOffers[sortedOffers.length - 1];
                const savings = highest && lowest ? (highest.price - lowest.price) : 0;

                return (
                  <div 
                    key={product.id}
                    className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      
                      {/* Product Preview Info */}
                      <div className="flex items-center gap-4 min-w-0 max-w-md">
                        <div 
                          onClick={() => onNavigate('product', product.slug)}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-50 border border-slate-200 p-2 shrink-0 flex items-center justify-center cursor-pointer group"
                        >
                          {product.primaryImage ? (
                            <img
                              src={product.primaryImage}
                              alt={product.name}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <ProductPlaceholder categoryId={product.categoryId} name={product.name} className="w-full h-full" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-0.5">
                            <span className="font-bold text-cyan-600 uppercase tracking-wider">{product.brand}</span>
                            <span>·</span>
                            <span className="truncate">{product.subcategory}</span>
                          </div>
                          <h3 
                            onClick={() => onNavigate('product', product.slug)}
                            className="font-display font-bold text-base text-slate-950 hover:text-cyan-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
                          >
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-3 mt-1.5 text-xs">
                            <div className="flex items-center text-amber-500 font-bold">
                              <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                              <span>{product.rating}</span>
                            </div>
                            {savings > 0 && (
                              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300">
                                Save up to {formatPrice(savings)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Side-by-Side Retailers Row */}
                      <div className="flex-1 w-full overflow-x-auto">
                        <div className="flex items-stretch gap-3 min-w-[550px]">
                          {sortedOffers.length > 0 ? (
                            sortedOffers.map((offer, idx) => {
                              const isLowest = idx === 0;

                              return (
                                <div 
                                  key={offer.id}
                                  className={`flex-1 rounded-2xl p-3.5 border transition-all flex flex-col justify-between ${
                                    isLowest 
                                      ? 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-400/30' 
                                      : 'bg-slate-50/60 border-slate-200 hover:bg-slate-50'
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-center justify-between gap-1 mb-1">
                                      <span className="font-extrabold text-slate-900 text-xs truncate">
                                        {offer.retailerName}
                                      </span>
                                      {isLowest && (
                                        <span className="text-[9px] bg-emerald-200 text-emerald-950 font-extrabold px-1.5 py-0.2 rounded uppercase tracking-wider">
                                          Lowest
                                        </span>
                                      )}
                                    </div>
                                    <div className="my-1.5">
                                      <PriceWithLogo
                                        amount={offer.price}
                                        currency={currency}
                                        className="text-base font-extrabold text-slate-950"
                                        logoSize="xs"
                                      />
                                    </div>
                                    <p className="text-[10px] text-slate-500 line-clamp-1 mb-2">
                                      {offer.shippingInfo || 'Verified stock'}
                                    </p>
                                  </div>

                                  <button
                                    onClick={() => recordAffiliateClick(product, offer)}
                                    className={`w-full py-2 px-2.5 rounded-xl font-bold text-[11px] transition-all flex items-center justify-center gap-1 cursor-pointer shadow-2xs ${
                                      isLowest
                                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white'
                                        : 'bg-slate-900 hover:bg-cyan-600 text-white'
                                    }`}
                                  >
                                    <span>BUY NOW</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </button>
                                </div>
                              );
                            })
                          ) : (
                            <div className="w-full py-4 px-6 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl">
                              Tracking verified retailer stores...
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        ) : (
          /* TAB 2: Side-by-Side Product Spec & Deal Matrix */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Comparing {effectiveProducts.length} devices side-by-side
              </span>
              <div className="flex items-center gap-2">
                {compareList.length > 0 && (
                  <button
                    onClick={clearCompare}
                    className="text-xs text-rose-600 hover:text-rose-700 font-bold px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    Clear Matrix
                  </button>
                )}
                {effectiveProducts.length < 4 && (
                  <button
                    onClick={() => setIsPickerOpen(true)}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Product</span>
                  </button>
                )}
              </div>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-3xl bg-white shadow-lg">
              <table className="w-full border-collapse text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="p-5 w-44 text-slate-500 font-bold uppercase tracking-wider text-[11px] align-top">
                      Device Overview
                    </th>
                    {effectiveProducts.map(product => {
                      const lowestOffer = product.retailers && product.retailers.length > 0
                        ? [...product.retailers].sort((a, b) => a.price - b.price)[0]
                        : null;

                      return (
                        <th key={product.id} className="p-5 align-top w-64 border-l border-slate-200">
                          <div className="relative group flex flex-col justify-between h-full">
                            <button
                              onClick={() => removeFromCompare(product.id)}
                              className="absolute -top-1 -right-1 p-1 bg-slate-100 text-slate-400 hover:text-rose-600 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                              title="Remove from comparison"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>

                            {/* Image */}
                            <div 
                              onClick={() => onNavigate('product', product.slug)}
                              className="w-full aspect-[4/3] rounded-2xl bg-slate-50 p-3 mb-3 flex items-center justify-center cursor-pointer border border-slate-200 group-hover:border-cyan-500 transition-colors"
                            >
                              {product.primaryImage ? (
                                <img
                                  src={product.primaryImage}
                                  alt={product.name}
                                  className="max-h-28 object-contain"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <ProductPlaceholder categoryId={product.categoryId} name={product.name} />
                              )}
                            </div>

                            {/* Title & Brand */}
                            <div className="mb-3">
                              <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider">
                                {product.brand}
                              </span>
                              <h3 
                                onClick={() => onNavigate('product', product.slug)}
                                className="font-display font-bold text-sm text-slate-900 hover:text-cyan-600 cursor-pointer mt-0.5 line-clamp-2"
                              >
                                {product.name}
                              </h3>
                            </div>

                            {/* Price & Primary CTA */}
                            <div className="mt-auto pt-3 border-t border-slate-100">
                              <div className="mb-2">
                                <PriceWithLogo
                                  amount={lowestOffer ? lowestOffer.price : product.price}
                                  currency={currency}
                                  className="text-base font-extrabold text-slate-950"
                                  logoSize="xs"
                                />
                              </div>
                              {lowestOffer ? (
                                <button
                                  onClick={() => recordAffiliateClick(product, lowestOffer)}
                                  className="w-full py-2 px-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer text-xs shadow-xs"
                                >
                                  <span>BUY NOW ({lowestOffer.retailerName})</span>
                                  <ExternalLink className="w-3 h-3" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => onNavigate('product', product.slug)}
                                  className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors text-xs cursor-pointer"
                                >
                                  View Specs
                                </button>
                              )}
                            </div>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">
                      Store Offers
                    </td>
                    {effectiveProducts.map(p => (
                      <td key={p.id} className="p-4 border-l border-slate-200 text-slate-700">
                        {p.retailers.length > 0 ? (
                          <div className="space-y-1.5">
                            {p.retailers.map(r => (
                              <div key={r.id} className="flex items-center justify-between text-[11px]">
                                <span className="font-medium text-slate-700">{r.retailerName}</span>
                                <PriceWithLogo amount={r.price} currency={currency} logoSize="xs" className="font-bold text-slate-900" />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">No retailers configured</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">
                      Verdict
                    </td>
                    {effectiveProducts.map(p => (
                      <td key={p.id} className="p-4 border-l border-slate-200 text-slate-700 leading-relaxed italic">
                        "{p.verdict}"
                      </td>
                    ))}
                  </tr>

                  {allSpecKeys.map(specKey => (
                    <tr key={specKey}>
                      <td className="p-4 font-bold text-slate-500 bg-slate-50/50">
                        {specKey}
                      </td>
                      {effectiveProducts.map(p => (
                        <td key={p.id} className="p-4 border-l border-slate-200 text-slate-900 font-medium">
                          {p.specifications[specKey] || (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Add Product Modal Picker */}
      {isPickerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-slate-900 text-base">
                Select Product to Compare
              </h3>
              <button onClick={() => setIsPickerOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
              {products.map(p => {
                const isSelected = compareList.includes(p.id);

                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      toggleCompare(p.id);
                      setIsPickerOpen(false);
                    }}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-50 border-cyan-300'
                        : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider">{p.brand}</span>
                      <h4 className="text-xs font-bold text-slate-900 truncate max-w-xs">{p.name}</h4>
                      <PriceWithLogo amount={p.price} currency={currency} logoSize="xs" className="text-slate-500 text-xs mt-0.5" />
                    </div>

                    <span className="text-xs font-bold text-cyan-600">
                      {isSelected ? 'Selected' : '+ Compare'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
