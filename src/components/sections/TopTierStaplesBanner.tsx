import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight } from 'lucide-react';

export const TopTierStaplesBanner: React.FC = () => {
  const { navigate } = useApp();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-10">
      <div className="relative overflow-hidden bg-[#034848] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="space-y-3 max-w-lg z-10">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Top-Tier Staples, One Place
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium opacity-90">
            From fresh produce to pantry staples, delivered fast directly to your home.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('shop')}
              className="px-6 py-3 bg-[#72bf44] hover:bg-[#5da835] text-white font-extrabold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <span>Shop Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative w-full md:w-1/2 aspect-16/7 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80"
            alt="Top Tier Organic Staples"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
};
