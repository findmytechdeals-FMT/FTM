import React, { useEffect, useState } from 'react';
import { ExternalLink, ShieldCheck, X, ArrowRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export const AffiliateRedirectModal: React.FC = () => {
  const { activeRedirect, setActiveRedirect, formatPrice } = useProducts();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!activeRedirect) {
      setCountdown(3);
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeRedirect]);

  if (!activeRedirect) return null;

  const { product, retailer } = activeRedirect;

  const handleOpenLink = () => {
    setActiveRedirect(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-7 shadow-2xl relative overflow-hidden text-center space-y-5 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={() => setActiveRedirect(null)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Status Graphic */}
        <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center mx-auto text-cyan-600 shadow-xs">
          <ExternalLink className="w-6 h-6 animate-pulse" />
        </div>

        <div>
          <span className="text-[11px] font-bold text-cyan-600 uppercase tracking-wider block mb-1">
            Redirecting to {retailer.retailerName}
          </span>
          <h3 className="font-display font-extrabold text-xl text-slate-950">
            Official Retailer Deal
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Taking you to the official {retailer.retailerName} product page with live price & warranty.
          </p>
        </div>

        {/* Deal Preview Snippet */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-left">
          <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 p-1 shrink-0 flex items-center justify-center">
            {product.primaryImage ? (
              <img
                src={product.primaryImage}
                alt={product.name}
                className="max-h-full object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="text-[10px] font-bold text-cyan-600">FMT</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-slate-900 truncate">{product.name}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-extrabold text-slate-900 tabular-nums">
                {retailer.price > 0 ? formatPrice(retailer.price) : 'Best Price'}
              </span>
              <span className="text-[10px] text-slate-500">via {retailer.retailerName}</span>
            </div>
          </div>
        </div>

        {/* Trust Disclosure */}
        <div className="flex items-center gap-2 text-left p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
          <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0" />
          <span>
            Find My Tech earns an affiliate commission at no extra cost to you. Standard store warranty applies.
          </span>
        </div>

        {/* Direct Action Link */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => setActiveRedirect(null)}
            className="flex-1 py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors"
          >
            Stay on Site
          </button>
          
          <a
            href={retailer.affiliateUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpenLink}
            className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            <span>BUY NOW on {retailer.retailerName}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
