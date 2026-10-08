import React, { useState } from 'react';
import { Lock, ArrowLeft, KeyRound, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { FmtLogo } from './FmtLogo';
import { ViewMode } from '../types';

interface AdminLoginProps {
  onNavigate: (view: ViewMode, param?: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onNavigate }) => {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState('admin@findmytech.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = login(password, email);
      setIsLoading(false);
      if (!res.success) {
        setError(res.error || 'Authentication failed');
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Return to public site link */}
      <div className="max-w-md w-full mx-auto px-4 sm:px-0 mb-6">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Public Storefront
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="text-center mb-6">
          <div className="inline-block mb-3">
            <FmtLogo size="lg" variant="horizontal" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mt-2">
            <Lock className="w-3 h-3 text-cyan-600" />
            <span>Private Content Management System</span>
          </div>
          <h2 className="mt-3 text-2xl font-display font-extrabold text-slate-950 tracking-tight">
            Administrator Sign In
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Sign in to upload product pictures, update live prices, and configure affiliate links.
          </p>
        </div>

        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-cyan-500 focus:bg-white transition-colors"
                placeholder="admin@findmytech.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-[11px] text-slate-400">Default: <code className="bg-slate-100 px-1 py-0.5 rounded text-cyan-700 font-mono">admin123</code></span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter administrator password..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-cyan-500 focus:bg-white transition-colors"
                />
                <KeyRound className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Signing in...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Sign In to Admin CMS</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick info helper */}
          <div className="mt-6 pt-5 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0" />
              <span>Owner portal is protected from public visitors.</span>
            </div>
            <p className="text-[10px] text-slate-400 pl-6">
              You can upload product images, set prices, enter Noon/Amazon affiliate links, and customize your brand logo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
