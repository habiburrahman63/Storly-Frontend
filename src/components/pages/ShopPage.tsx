import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import {
  SlidersHorizontal,
  Grid,
  List,
  RotateCcw,
  ChevronRight,
  Check,
  Search,
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products, categories, filters, setFilters, resetFilters, navigate } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter logic
  const filteredProducts = products.filter((p) => {
    // Category filter
    if (filters.category && filters.category !== 'All') {
      const target = filters.category.toLowerCase().trim();
      const catName = p.category.toLowerCase().trim();
      const catSlug = p.categorySlug?.toLowerCase().trim() || '';

      const isMatch =
        catName === target ||
        catSlug === target ||
        catName.includes(target) ||
        target.includes(catName);

      if (!isMatch) {
        return false;
      }
    }

    // Organic filter
    if (filters.organicOnly && !p.isOrganic) {
      return false;
    }

    // In Stock filter
    if (filters.inStockOnly && p.stock <= 0) {
      return false;
    }

    // Price filter
    if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) {
      return false;
    }

    // Search query
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase().trim();
      if (
        !p.name.toLowerCase().includes(q) &&
        !p.category.toLowerCase().includes(q) &&
        !p.brand.toLowerCase().includes(q)
      ) {
        return false;
      }
    }

    return true;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sortBy === 'price-low-high') return a.price - b.price;
    if (filters.sortBy === 'price-high-low') return b.price - a.price;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    return 0; // default / featured
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button onClick={() => navigate('home')} className="hover:text-[#034848]">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
        <span className="text-[#034848]">Shop Organic Market</span>
      </div>

      {/* Main Layout: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Filter Column */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#034848]" /> Filters
              </h3>
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Categories</h4>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, category: 'All' }))}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                    filters.category === 'All' ? 'bg-[#034848] text-white' : 'hover:bg-stone-100 text-slate-700'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px]">{products.length}</span>
                </button>
                {categories.map((c) => {
                  const count = products.filter(
                    (p) =>
                      p.category.toLowerCase().trim() === c.name.toLowerCase().trim() ||
                      p.categorySlug === c.slug
                  ).length;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setFilters((prev) => ({ ...prev, category: c.name }))}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                        filters.category === c.name ? 'bg-[#034848] text-white' : 'hover:bg-stone-100 text-slate-700'
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="text-[10px] opacity-80 bg-stone-200/50 px-2 py-0.5 rounded-full">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                <span>Max Price:</span>
                <span className="text-[#034848]">${filters.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], parseFloat(e.target.value)],
                  }))
                }
                className="w-full accent-[#034848] cursor-pointer"
              />
            </div>

            {/* Organic & In-Stock Toggles */}
            <div className="space-y-3 pt-4 border-t border-stone-100 text-xs font-bold text-slate-800">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.organicOnly}
                  onChange={(e) => setFilters((prev) => ({ ...prev, organicOnly: e.target.checked }))}
                  className="w-4 h-4 rounded-md accent-[#034848]"
                />
                <span>100% Certified Organic Only</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))}
                  className="w-4 h-4 rounded-md accent-[#034848]"
                />
                <span>In Stock Items Only</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Main Products Grid Area */}
        <main className="lg:col-span-9 space-y-6">
          {/* Top Controls Bar (Sort, Count, View Mode) */}
          <div className="bg-white rounded-3xl p-4 px-6 border border-stone-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs font-bold text-slate-700">
              Showing <strong className="text-[#034848]">{sortedProducts.length}</strong> organic items
            </p>

            <div className="flex items-center gap-4 ml-auto">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <span>Sort by:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
                  className="py-1.5 px-3 bg-stone-100 rounded-xl border border-stone-200 focus:outline-hidden font-bold cursor-pointer"
                >
                  <option value="featured">Featured Items</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* View Mode Toggle Buttons */}
              <div className="flex items-center border border-stone-200 rounded-xl bg-stone-100 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-[#034848] text-white' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-[#034848] text-white' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Items Display */}
          {sortedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No items match your selected filters</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try clearing some filters or expanding your price range slider.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-[#034848] text-white text-xs font-bold rounded-xl hover:bg-[#72bf44] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {sortedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedProducts.map((p) => (
                <ProductCard key={`list-${p.id}`} product={p} compact />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
