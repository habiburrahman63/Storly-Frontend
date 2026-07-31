import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, Copy, Check } from 'lucide-react';

export const WinterSaleBanner: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText('WINSALE2026');
    setCopied(true);
    showToast('Promo code WINSALE2026 copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-14">
      <div className="relative overflow-hidden bg-stone-100/90 rounded-3xl p-8 sm:p-14 border border-stone-200/80 shadow-xs text-slate-900 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Massive -50% Background Watermark */}
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-7xl sm:text-9xl font-black text-stone-300/40 select-none pointer-events-none tracking-tighter">
          -50%
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-3 text-center md:text-left">
          <span className="px-3.5 py-1 bg-rose-600 text-white text-[11px] font-black uppercase tracking-widest rounded-full shadow-xs">
            LIMITED TIME PROMO
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-[#034848] tracking-tight">
            WINTER SALE
          </h2>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
            <span className="text-xs text-slate-500 font-semibold">Sale Code:</span>
            <button
              onClick={copyCode}
              className="px-3 py-1 bg-white border border-stone-300 rounded-lg text-xs font-mono font-bold text-[#034848] flex items-center gap-1.5 hover:border-[#034848] transition-colors"
            >
              <span>WINSALE2026</span>
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Join our mailing list for exclusive deals, recipes, and seasonal updates
          </p>
        </div>

        {/* Action Button */}
        <div className="relative z-10 shrink-0">
          <button
            onClick={() => navigate('shop')}
            className="px-8 py-4 bg-[#034848] hover:bg-[#72bf44] text-white font-black text-sm rounded-2xl flex items-center gap-3 transition-colors shadow-lg cursor-pointer"
          >
            <span>Shop Now</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
