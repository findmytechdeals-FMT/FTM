import React, { useState } from 'react';
import { 
  TrendingUp, 
  Tag, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle,
  SlidersHorizontal
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from './ProductCard';
import { ViewMode, Product } from '../types';

interface HomeSectionsProps {
  onNavigate: (view: ViewMode, param?: string) => void;
}

export const TrendingTech: React.FC<HomeSectionsProps> = ({ onNavigate }) => {
  const { products } = useProducts();
  const trending = products.filter(p => p.status === 'published').slice(0, 8);

  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 text-left">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-cyan-600 font-bold uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Trending Discovery</span>
            </div>
            <h2 className="text-3xl font-display font-extrabold text-slate-950 tracking-tight">
              Featured Tech Departments
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Explore popular consumer electronics across our curated departments.
            </p>
          </div>

          <button
            onClick={() => onNavigate('category', 'smartphones')}
            className="text-xs font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1.5 self-start sm:self-end cursor-pointer group"
          >
            <span>Browse All Products</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map(product => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
          ))}
        </div>

      </div>
    </section>
  );
};

export const BestDealsSection: React.FC<HomeSectionsProps> = ({ onNavigate }) => {
  const { products } = useProducts();
  const deals = products.filter(p => p.isDeal && p.status === 'published').slice(0, 4);

  return (
    <section className="py-16 bg-slate-50/70 border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 text-left">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Retailer Promotions</span>
            </div>
            <h2 className="text-3xl font-display font-extrabold text-slate-950 tracking-tight">
              Today's Best Tech Deals
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Mark any product as an active deal in the Admin CMS to display promotional badges and price drops.
            </p>
          </div>

          <button
            onClick={() => onNavigate('deals')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 self-start sm:self-end cursor-pointer"
          >
            View All Active Deals <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {deals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deals.map(product => (
              <ProductCard key={product.id} product={product} onNavigate={onNavigate} showDealBadge={true} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white border border-slate-200 p-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
              <Tag className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-slate-950 text-base">Deals Updating Daily</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Our automated price trackers are refreshing verified retailer promotions across Amazon, Noon, and Sharaf DG.
            </p>
            <button
              onClick={() => onNavigate('category', 'smartphones')}
              className="mt-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
            >
              Explore Tech Catalog
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export const DiscoveryCollections: React.FC<HomeSectionsProps> = ({ onNavigate }) => {
  const { products } = useProducts();

  const collections = [
    {
      id: 'smartphones',
      title: 'Smartphones & Mobile',
      description: 'Flagship devices, camera phones, and portable tech.',
      filter: (p: Product) => p.categoryId === 'smartphones'
    },
    {
      id: 'audio',
      title: 'Wireless Audio & Sound',
      description: 'Noise cancelling earbuds, over-ear headphones, and portable speakers.',
      filter: (p: Product) => p.categoryId === 'audio' || p.categoryId === 'speakers'
    },
    {
      id: 'computers',
      title: 'Laptops & Workstations',
      description: 'High-performance laptops, monitors, and productivity gear.',
      filter: (p: Product) => p.categoryId === 'computers'
    },
    {
      id: 'home',
      title: 'Smart Home & Appliances',
      description: 'Robot vacuums, air fryers, and connected devices.',
      filter: (p: Product) => p.categoryId === 'appliances' || p.categoryId === 'smarthome'
    }
  ];

  const [activeTab, setActiveTab] = useState(collections[0].id);
  const activeCol = collections.find(c => c.id === activeTab) || collections[0];
  const filteredProducts = products.filter(activeCol.filter).slice(0, 4);

  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-left mb-8">
          <div className="flex items-center gap-1.5 text-xs text-cyan-600 font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Curated Tech Collections</span>
          </div>
          <h2 className="text-3xl font-display font-extrabold text-slate-950 tracking-tight">
            Product Discovery Collections
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Browse slots organized by tech department.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {collections.map(col => (
            <button
              key={col.id}
              onClick={() => setActiveTab(col.id)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === col.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200/80'
              }`}
            >
              {col.title}
            </button>
          ))}
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
          ))}
        </div>

      </div>
    </section>
  );
};

export const TrustAndModelBanner: React.FC = () => {
  return (
    <section className="py-14 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-900 text-base">Discovery & Comparison</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Find My Tech does not process checkouts or store customer payment data. We connect users directly with verified merchants.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-900 text-base">Direct Retailer Warranty</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                When visitors click "View Deal", they are redirected to official retail partner URLs (Amazon, Noon, Sharaf DG) with genuine warranties.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-900 text-base">Transparent Affiliate Model</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                We may earn an affiliate referral commission when users purchase. This never increases the buyer's price.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
