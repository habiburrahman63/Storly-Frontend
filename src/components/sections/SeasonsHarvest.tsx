import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const SeasonsHarvest: React.FC = () => {
  const { products, navigate } = useApp();

  const topRated = products.filter((p) => p.rating >= 4.8).slice(0, 4);
  const topItems = products.slice(4, 8);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-14">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          The Season's Harvest
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Discover our most-loved staples at exceptional prices
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Column 1: Top Rated */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h3 className="text-base font-extrabold text-slate-900">Top Rated</h3>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded-md bg-stone-100 hover:bg-stone-200 text-slate-600">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1 rounded-md bg-stone-100 hover:bg-stone-200 text-slate-600">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {topRated.map((prod) => (
              <ProductCard key={`tr-${prod.id}`} product={prod} compact />
            ))}
          </div>
        </div>

        {/* Column 2: Top Items */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h3 className="text-base font-extrabold text-slate-900">Top Items</h3>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded-md bg-stone-100 hover:bg-stone-200 text-slate-600">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1 rounded-md bg-stone-100 hover:bg-stone-200 text-slate-600">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {topItems.map((prod) => (
              <ProductCard key={`ti-${prod.id}`} product={prod} compact />
            ))}
          </div>
        </div>

        {/* Column 3: Feature Poster Banner */}
        <div className="lg:col-span-4 bg-gradient-to-br from-rose-950 via-amber-950 to-slate-950 text-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-xl border border-rose-900/40">
          <div className="relative z-10 space-y-4">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-black uppercase tracking-widest rounded-full">
              ORGANIC WELLNESS
            </span>

            <h3 className="text-2xl sm:text-3xl font-black leading-tight text-white">
              Stay Fit. Stay Healthy.
            </h3>

            <p className="text-xs text-stone-300 font-medium leading-relaxed">
              Discover Vitamins, Supplements, Organic Boosters & Skincare Essentials — All In One Place.
            </p>

            <button
              onClick={() => navigate('shop')}
              className="mt-4 px-6 py-3 bg-[#72bf44] hover:bg-[#5da835] text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <span>View Shop</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-8 relative w-full h-48 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
              alt="Organic Wellness"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
