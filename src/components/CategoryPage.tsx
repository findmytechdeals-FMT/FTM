import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  ChevronDown, 
  X, 
  Star, 
  ArrowUpDown, 
  Tag, 
  Check, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from './ProductCard';
import { ViewMode } from '../types';
import { CategoryAnimatedPicture } from './CategoryAnimatedPicture';

interface CategoryPageProps {
  categorySlug: string;
  onNavigate: (view: ViewMode, param?: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categorySlug, onNavigate }) => {
  const { products, categories, formatPrice } = useProducts();

  const currentCategory = categories.find(c => c.slug === categorySlug) || categories[0];

  const categoryProducts = useMemo(() => {
    return products.filter(p => p.categoryId === currentCategory.id);
  }, [products, currentCategory]);

  const availableBrands = useMemo(() => {
    return Array.from(new Set(categoryProducts.map(p => p.brand))).sort();
  }, [categoryProducts]);

  // Filter & Sort States
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [dealsOnly, setDealsOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter(p => {
      if (selectedSubcategory !== 'all' && p.subcategory !== selectedSubcategory) {
        return false;
      }
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }
      if (dealsOnly && !p.isDeal) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [categoryProducts, selectedSubcategory, selectedBrands, dealsOnly, sortBy]);

  const toggleBrand = (b: string) => {
    setSelectedBrands(prev => 
      prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]
    );
  };

  const resetFilters = () => {
    setSelectedSubcategory('all');
    setSelectedBrands([]);
    setDealsOnly(false);
  };

  const hasActiveFilters = selectedSubcategory !== 'all' || selectedBrands.length > 0 || dealsOnly;

  return (
    <div className="py-8 bg-white min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button onClick={() => onNavigate('home')} className="hover:text-cyan-600 cursor-pointer">Home</button>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-900 font-bold">{currentCategory.name}</span>
        </nav>

        {/* Category Header Banner */}
        <div className="relative rounded-3xl bg-slate-50 border border-slate-200 p-6 md:p-8 mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider block mb-1">
                Category Department
              </span>
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 tracking-tight">
                {currentCategory.name}
              </h1>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {currentCategory.shortDescription}
              </p>
            </div>

            {/* Simple Animated Picture Badge */}
            <div className="hidden md:block w-48 h-32 rounded-2xl overflow-hidden border border-slate-800 shadow-xl shrink-0">
              <CategoryAnimatedPicture 
                categoryId={currentCategory.id} 
                categoryName={currentCategory.name}
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
            <button
              onClick={() => setSelectedSubcategory('all')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                selectedSubcategory === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Subcategories
            </button>
            {currentCategory.subcategories.map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                  selectedSubcategory === sub
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Top Controls: Mobile filter trigger & Sort dropdown */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-cyan-600" />
              Filters {hasActiveFilters && '• Active'}
            </button>

            <span className="text-xs text-slate-500">
              Showing <strong className="text-slate-900 tabular-nums">{filteredProducts.length}</strong> catalog items
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 hidden sm:inline font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 text-slate-800 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 cursor-pointer font-medium"
            >
              <option value="recommended">Featured / Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Layout: Sidebar Filter (Left) + Products Grid (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block space-y-6 bg-slate-50/70 border border-slate-200 rounded-3xl p-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-display font-bold text-slate-900 text-sm flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-cyan-600" />
                Filter Catalog
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-cyan-600 hover:text-cyan-700 font-bold cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Filter 1: Deals Only */}
            <div className="pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={dealsOnly}
                  onChange={e => setDealsOnly(e.target.checked)}
                  className="rounded bg-white border-slate-300 text-cyan-600 focus:ring-0"
                />
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-500" />
                  Active Deals Only
                </span>
              </label>
            </div>

            {/* Filter 2: Brands */}
            {availableBrands.length > 0 && (
              <div className="pt-3 border-t border-slate-200">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Department Brands
                </p>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {availableBrands.map(b => (
                    <label key={b} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b)}
                        onChange={() => toggleBrand(b)}
                        className="rounded bg-white border-slate-300 text-cyan-600 focus:ring-0"
                      />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center space-y-3">
                <p className="text-base font-bold text-slate-900">No items match your active filters</p>
                <button
                  onClick={resetFilters}
                  className="mt-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-slate-900 text-base">Filters</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={dealsOnly}
                  onChange={e => setDealsOnly(e.target.checked)}
                  className="rounded bg-white border-slate-300 text-cyan-600"
                />
                <span className="font-semibold">Active Deals Only</span>
              </label>

              <div>
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Brands</p>
                <div className="space-y-1.5">
                  {availableBrands.map(b => (
                    <label key={b} className="flex items-center gap-2 text-xs text-slate-700">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b)}
                        onChange={() => toggleBrand(b)}
                        className="rounded bg-white border-slate-300 text-cyan-600"
                      />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl text-xs"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
