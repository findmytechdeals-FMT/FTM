import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { ViewMode } from '../types';

interface DisclosurePageProps {
  onNavigate: (view: ViewMode, param?: string) => void;
}

export const DisclosurePage: React.FC<DisclosurePageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 bg-white min-h-screen text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 transition-colors font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Find My Tech
        </button>

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 space-y-6 shadow-xs">
          <div className="flex items-center gap-2 text-cyan-600 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Transparency & Trust</span>
          </div>

          <h1 className="text-3xl font-display font-extrabold text-slate-950 tracking-tight">
            Affiliate Disclosure & How Find My Tech Works
          </h1>

          <div className="p-5 rounded-2xl bg-cyan-50 border border-cyan-200 text-slate-800 text-sm leading-relaxed">
            <strong>Affiliate Policy:</strong> Find My Tech (FMT) is a consumer technology discovery, review, and price comparison platform. When you click buttons such as <strong>View Deal</strong>, <strong>Check Price</strong>, or <strong>Shop Now</strong>, you are redirected to third-party retailers (such as Amazon, Noon, and Sharaf DG). We may earn an affiliate commission on qualifying purchases made through these links at <strong>no additional cost to you</strong>.
          </div>

          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <h3 className="text-base font-bold text-slate-900 pt-2">1. No Direct Sales or Payments</h3>
            <p>
              Find My Tech does not store credit card details, process orders, or ship physical goods. We connect consumers with reputable retailers. All transactions, shipping, customer service, and return warranties are handled directly by the merchant you purchase from.
            </p>

            <h3 className="text-base font-bold text-slate-900 pt-2">2. Independent Editorial Integrity</h3>
            <p>
              Our editorial verdicts, pros, cons, and performance scores are based on objective hardware testing and community user reviews. Retailers cannot pay to artificially alter our product ratings or review conclusions.
            </p>

            <h3 className="text-base font-bold text-slate-900 pt-2">3. Accurate Price Comparisons</h3>
            <p>
              We monitor prices across multiple retailers to help you find the best value. Prices and inventory are subject to change by external merchants at any time.
            </p>

            <h3 className="text-base font-bold text-slate-900 pt-2">4. Contact & Partnerships</h3>
            <p>
              For commercial affiliate inquiries, retailer integrations, or hardware review sample submissions, reach out to our team at <strong>partnerships@findmytech.com</strong>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
