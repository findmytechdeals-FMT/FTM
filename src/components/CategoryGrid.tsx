import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ViewMode } from '../types';
import { CategoryAnimatedPicture } from './CategoryAnimatedPicture';

interface CategoryGridProps {
  onNavigate: (view: ViewMode, param?: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onNavigate }) => {
  const { categories, products } = useProducts();

  return (
    <section className="py-16 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 text-left">
          <div>
            <div className="flex items-center gap-2 text-xs text-cyan-600 font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Consumer Electronics Taxonomy</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-medium">12 Departments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Explore curated devices with real-time multi-retailer price comparison and expert specs breakdown.
            </p>
          </div>
        </div>

        {/* 12 Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const count = products.filter(p => p.categoryId === cat.id).length;
            
            return (
              <div
                key={cat.id}
                onClick={() => onNavigate('category', cat.slug)}
                className="group relative rounded-2xl bg-white border border-slate-200/90 hover:border-cyan-500/60 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-slate-200/60"
              >
                {/* Category Simple Animated Picture Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                  <div className="w-full h-full group-hover:scale-105 transition-transform duration-500">
                    <CategoryAnimatedPicture 
                      categoryId={cat.id} 
                      categoryName={cat.name} 
                      className="w-full h-full"
                    />
                  </div>
                  
                  {/* Item counter */}
                  <div className="absolute top-3 right-3 text-[11px] font-bold text-slate-800 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-slate-200 shadow-sm z-20">
                    {count} {count === 1 ? 'item' : 'items'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-cyan-600 transition-colors flex items-center justify-between">
                      <span>{cat.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {cat.shortDescription}
                    </p>
                  </div>

                  {/* Explore button & tags */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-cyan-600 font-bold group-hover:underline flex items-center gap-1">
                      Explore <span aria-hidden="true">→</span>
                    </span>
                    <span className="text-slate-400 text-[11px] truncate max-w-[150px]">
                      {cat.subcategories.slice(0, 2).join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

