import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TABS = [
  'All Products',
  'Seasonal Harvest',
  'Pressed Juices',
  'Rare Fruits',
  'Crisp Vegetables',
  'Fresh Picks',
  'Nutty Treasures',
];

export const BestSellingSection: React.FC = () => {
  const { products } = useApp();
  const [activeTab, setActiveTab] = useState('All Products');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'All Products') return true;
    const tabLower = activeTab.toLowerCase().trim();
    return (
      p.category.toLowerCase().trim() === tabLower ||
      p.categorySlug === tabLower.replace(/\s+/g, '-') ||
      p.category.toLowerCase().includes(tabLower)
    );
  });

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-12">
      {/* Title & Filter Tabs Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Best Selling Products
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Enjoy up to 40% off through the weekend 🔥
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#034848] text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid (5-column layout on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {filteredProducts.slice(0, 5).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Arrows */}
      <div className="flex items-center justify-center gap-3 mt-8">
        <button
          className="p-2.5 rounded-full bg-stone-100 hover:bg-[#034848] hover:text-white text-slate-700 transition-colors shadow-xs"
          title="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          className="p-2.5 rounded-full bg-stone-100 hover:bg-[#034848] hover:text-white text-slate-700 transition-colors shadow-xs"
          title="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
