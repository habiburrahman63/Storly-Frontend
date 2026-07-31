import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const PromotionalBanners: React.FC = () => {
  const { navigate } = useApp();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Large Left Card */}
        <div className="lg:col-span-7 bg-[#f4f7f6] rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-stone-200/90 shadow-xs relative overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#72bf44]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center z-10 my-auto">
            {/* Text Content */}
            <div className="sm:col-span-7 space-y-3.5 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#72bf44]/15 text-[#034848] text-[11px] font-extrabold rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#72bf44]" />
                100% Organic & Fresh
              </span>

              <h3 className="text-2xl sm:text-3xl xl:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                Fresh & Healthy Food for Your Family
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Fast & reliable doorstep delivery in your area.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => navigate('shop')}
                  className="px-6 py-3 bg-[#034848] hover:bg-[#72bf44] text-white font-extrabold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-98"
                >
                  <span>Shop Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Framed Image */}
            <div className="sm:col-span-5 w-full h-48 sm:h-64 rounded-2xl overflow-hidden shadow-md border-2 border-white shrink-0 relative">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
                alt="Fresh Grocery Bag"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Right 2 Stacked Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          {/* Top Right Orange Card */}
          <div className="bg-[#f97316] text-white rounded-3xl p-6 sm:p-7 flex items-center justify-between gap-4 relative overflow-hidden shadow-xs hover:shadow-md transition-shadow">
            <div className="space-y-2 z-10 flex-1">
              <h4 className="text-base sm:text-lg font-black leading-snug">
                The Essential Shopping Experience
              </h4>
              <p className="text-[11px] sm:text-xs text-white/90 font-medium leading-relaxed">
                From fresh produce to pantry staples, delivered fast
              </p>
              <button
                onClick={() => navigate('shop')}
                className="mt-3 px-4 py-2 bg-white text-[#f97316] hover:bg-[#034848] hover:text-white text-xs font-extrabold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>Shop Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-md border-2 border-white/30 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=400&q=80"
                alt="Shopping Experience"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Bottom Right Dark Green Card */}
          <div className="bg-[#034848] text-white rounded-3xl p-6 sm:p-7 flex items-center justify-between gap-4 relative overflow-hidden shadow-xs hover:shadow-md transition-shadow">
            <div className="space-y-2 z-10 flex-1">
              <h4 className="text-base sm:text-lg font-black leading-snug">
                Daily Essentials. Simplified Life
              </h4>
              <p className="text-[11px] sm:text-xs text-emerald-200/90 font-medium leading-relaxed">
                From fresh produce to pantry staples, delivered fast
              </p>
              <button
                onClick={() => navigate('shop')}
                className="mt-3 px-4 py-2 bg-[#72bf44] hover:bg-[#5da835] text-white text-xs font-extrabold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>Shop Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-md border-2 border-white/20 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80"
                alt="Daily Essentials"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
