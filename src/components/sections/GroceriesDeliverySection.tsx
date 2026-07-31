import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, Truck } from 'lucide-react';

export const GroceriesDeliverySection: React.FC = () => {
  const { navigate } = useApp();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-16">
      <div className="bg-[#f4f7f6] rounded-3xl p-8 sm:p-12 border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        {/* Left Delivery Image & Rotating Badge */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
              alt="Groceries Delivery"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Rotating Circular Badge "SAME DAY DELIVERY" */}
          <div className="absolute -bottom-4 -right-2 sm:right-8 bg-[#034848] text-white w-28 h-28 rounded-full p-2 flex flex-col items-center justify-center text-center shadow-2xl border-4 border-white animate-spin-slow">
            <Truck className="w-6 h-6 text-[#72bf44] mb-0.5" />
            <span className="text-[10px] font-black uppercase tracking-wider text-[#72bf44]">SAME DAY</span>
            <span className="text-[9px] font-bold text-white">DELIVERY</span>
          </div>
        </div>

        {/* Right Info */}
        <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
          <span className="px-3 py-1 bg-emerald-100 text-[#034848] text-[11px] font-bold uppercase tracking-wider rounded-full">
            EXPRESS HOME DELIVERY
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Groceries Delivery at your door step
          </h2>

          <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-lg">
            Fresh organic groceries, pasteurized dairy, and daily essentials delivered straight to your doorstep with guaranteed temperature control and care.
          </p>

          <div className="pt-2">
            <button
              onClick={() => navigate('shop')}
              className="px-8 py-3.5 bg-[#034848] hover:bg-[#72bf44] text-white font-extrabold text-xs rounded-2xl inline-flex items-center gap-2 transition-colors shadow-md cursor-pointer"
            >
              <span>Shop Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
