/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ProductProvider } from './context/ProductContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ViewMode } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { 
  TrendingTech, 
  BestDealsSection, 
  DiscoveryCollections, 
  TrustAndModelBanner 
} from './components/HomeSections';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CategoryPage } from './components/CategoryPage';
import { ComparePage } from './components/ComparePage';
import { DealsPage } from './components/DealsPage';
import { ReviewsPage } from './components/ReviewsPage';
import { WishlistPage } from './components/WishlistPage';
import { AdminDashboard } from './components/AdminDashboard';
import { DisclosurePage } from './components/DisclosurePage';
import { AffiliateRedirectModal } from './components/AffiliateRedirectModal';
import { Footer } from './components/Footer';

export default function App() {
  // Parse initial route from location
  const getInitialRoute = (): { view: ViewMode; param: string } => {
    try {
      const pathname = window.location.pathname.toLowerCase();
      if (pathname === '/admin' || pathname === '/admin/login') {
        return { view: 'admin', param: '' };
      }
      if (pathname.startsWith('/category/')) {
        const cat = pathname.replace('/category/', '').trim();
        return { view: 'category', param: cat || 'smartphones' };
      }
      if (pathname.startsWith('/product/')) {
        const prod = pathname.replace('/product/', '').trim();
        return { view: 'product', param: prod };
      }
      if (pathname === '/deals') return { view: 'deals', param: '' };
      if (pathname === '/compare') return { view: 'compare', param: '' };
      if (pathname === '/wishlist') return { view: 'wishlist', param: '' };
      if (pathname === '/reviews') return { view: 'reviews', param: '' };
      if (pathname === '/disclosure') return { view: 'disclosure', param: '' };
    } catch {
      // ignore
    }
    return { view: 'home', param: '' };
  };

  const initialRoute = getInitialRoute();
  const [currentView, setCurrentView] = useState<ViewMode>(initialRoute.view);
  const [viewParam, setViewParam] = useState<string>(initialRoute.param);

  // Synchronize browser history / URL path
  const handleNavigate = (view: ViewMode, param?: string) => {
    setCurrentView(view);
    setViewParam(param || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update history state
    let path = '/';
    if (view === 'category' && param) path = `/category/${param}`;
    else if (view === 'product' && param) path = `/product/${param}`;
    else if (view !== 'home') path = `/${view}`;

    window.history.pushState({ view, param }, '', path);
  };

  // Support browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state) {
        setCurrentView(e.state.view || 'home');
        setViewParam(e.state.param || '');
      } else {
        const route = getInitialRoute();
        setCurrentView(route.view);
        setViewParam(route.param);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <ProductProvider>
      <AdminAuthProvider>
        <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-cyan-500/20 selection:text-cyan-800">
          
          {/* If on Admin View, render the dedicated private CMS experience */}
          {currentView === 'admin' ? (
            <AdminDashboard onNavigate={handleNavigate} />
          ) : (
            /* Otherwise render the Public Customer-Facing Storefront */
            <>
              {/* Sticky Customer Header */}
              <Header 
                currentView={currentView} 
                onNavigate={handleNavigate} 
                selectedCategorySlug={currentView === 'category' ? viewParam : undefined}
              />

              {/* Main Storefront Area */}
              <main className="flex-1">
                {currentView === 'home' && (
                  <>
                    <Hero onNavigate={handleNavigate} />
                    <CategoryGrid onNavigate={handleNavigate} />
                    <TrendingTech onNavigate={handleNavigate} />
                    <BestDealsSection onNavigate={handleNavigate} />
                    <DiscoveryCollections onNavigate={handleNavigate} />
                    <TrustAndModelBanner />
                  </>
                )}

                {currentView === 'category' && (
                  <CategoryPage 
                    categorySlug={viewParam || 'smartphones'} 
                    onNavigate={handleNavigate} 
                  />
                )}

                {currentView === 'product' && (
                  <ProductDetailPage 
                    slug={viewParam} 
                    onNavigate={handleNavigate} 
                  />
                )}

                {currentView === 'compare' && (
                  <ComparePage onNavigate={handleNavigate} />
                )}

                {currentView === 'deals' && (
                  <DealsPage onNavigate={handleNavigate} />
                )}

                {currentView === 'reviews' && (
                  <ReviewsPage onNavigate={handleNavigate} />
                )}

                {currentView === 'wishlist' && (
                  <WishlistPage onNavigate={handleNavigate} />
                )}

                {currentView === 'disclosure' && (
                  <DisclosurePage onNavigate={handleNavigate} />
                )}
              </main>

              {/* Customer Footer */}
              <Footer onNavigate={handleNavigate} />
            </>
          )}

          {/* Affiliate Interstitial Redirect Modal */}
          <AffiliateRedirectModal />

        </div>
      </AdminAuthProvider>
    </ProductProvider>
  );
}
