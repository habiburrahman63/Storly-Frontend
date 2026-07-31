import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight } from 'lucide-react';

export const GradientPromoCards: React.FC = () => {
  const { navigate } = useApp();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Orange */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden min-h-[260px]">
          <div className="space-y-2 z-10">
            <h3 className="text-xl font-black leading-snug">
              Smart Way to Shop Groceries Online
            </h3>
            <p className="text-xs text-amber-100 font-medium leading-relaxed">
              Comprehensive Organic & Kitchen Solutions Delivered with Care and Precision
            </p>
          </div>
          <div className="pt-4 z-10">
            <button
              onClick={() => navigate('shop')}
              className="px-5 py-2.5 bg-[#034848] hover:bg-white hover:text-[#034848] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-md"
            >
              <span>Shop Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Red */}
        <div className="bg-gradient-to-br from-rose-600 to-red-700 text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden min-h-[260px]">
          <div className="space-y-2 z-10">
            <h3 className="text-xl font-black leading-snug">
              Big Savings on Groceries
            </h3>
            <p className="text-xs text-rose-100 font-medium leading-relaxed">
              Comprehensive Organic & Kitchen Solutions Delivered with Care and Precision
            </p>
          </div>
          <div className="pt-4 z-10">
            <button
              onClick={() => navigate('shop')}
              className="px-5 py-2.5 bg-[#034848] hover:bg-white hover:text-[#034848] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-md"
            >
              <span>Shop Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: Yellow/Green */}
        <div className="bg-gradient-to-br from-lime-500 to-emerald-600 text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden min-h-[260px]">
          <div className="space-y-2 z-10">
            <h3 className="text-xl font-black leading-snug">
              Stock Up Your Kitchen with Fresh Essentials
            </h3>
            <p className="text-xs text-emerald-100 font-medium leading-relaxed">
              Comprehensive Organic & Kitchen Solutions Delivered with Care and Precision
            </p>
          </div>
          <div className="pt-4 z-10">
            <button
              onClick={() => navigate('shop')}
              className="px-5 py-2.5 bg-[#034848] hover:bg-white hover:text-[#034848] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-md"
            >
              <span>Shop Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
