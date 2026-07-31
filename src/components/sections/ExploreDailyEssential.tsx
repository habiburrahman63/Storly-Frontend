import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';

export const ExploreDailyEssential: React.FC = () => {
  const { products } = useApp();

  const prod1 = products[0];
  const prod2 = products[4];
  const row2Products = products.slice(1, 6);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-14">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Explore Daily Essential
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Hand-picked favorites, now with limited-time pricing
        </p>
      </div>

      {/* Row 1: Product, Featured Banner, Product */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
        <div className="md:col-span-3">
          {prod1 && <ProductCard product={prod1} />}
        </div>

        {/* Large Market Woman Banner */}
        <div className="md:col-span-6 relative rounded-2xl overflow-hidden min-h-[340px] shadow-lg border border-stone-200 group">
          <img
            src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1000&q=80"
            alt="Daily Essential Market"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80';
            }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
            <span className="px-3 py-1 bg-[#72bf44] text-white text-[10px] font-bold rounded-full w-fit mb-2">
              FRESH MARKET
            </span>
            <h3 className="text-xl font-bold">100% Organic Local Market Harvests</h3>
            <p className="text-xs text-slate-200 mt-1">Stock your kitchen with peak-nutrition whole foods.</p>
          </div>
        </div>

        <div className="md:col-span-3">
          {prod2 && <ProductCard product={prod2} />}
        </div>
      </div>

      {/* Row 2: 5 Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {row2Products.map((p) => (
          <ProductCard key={`e-row2-${p.id}`} product={p} />
        ))}
      </div>
    </section>
  );
};
