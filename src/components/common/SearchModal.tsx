import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Search, ShoppingBag, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { products, isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, addToCart, navigate } = useApp();

  if (!isSearchOpen) return null;

  const results = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 animate-in slide-in-from-top-4 duration-200 border border-stone-200">
        {/* Search Input Box */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3 bg-stone-50">
          <Search className="w-5 h-5 text-[#034848] shrink-0" />
          <input
            type="text"
            placeholder="Type to search fresh produce, dairy, juices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="w-full text-sm font-semibold text-slate-800 placeholder-slate-400 bg-transparent focus:outline-hidden"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-stone-200/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Search Results */}
        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-stone-100">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            {searchQuery ? `Search Results (${results.length})` : 'Popular Searches'}
          </p>

          {results.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No organic products match "{searchQuery}". Try searching for "milk", "berry", or "juice".
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                className="py-3 flex items-center justify-between gap-4 hover:bg-stone-50 p-2 rounded-2xl transition-colors cursor-pointer group"
                onClick={() => {
                  setIsSearchOpen(false);
                  navigate('product-detail', { productId: product.id });
                }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-xl bg-stone-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#034848] transition-colors">
                      {product.name}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-medium">{product.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-[#034848]">${product.price.toFixed(2)}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="p-2 bg-[#034848] hover:bg-[#72bf44] text-white rounded-xl transition-colors"
                    title="Add to cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* View All Shop Link */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 text-center">
          <button
            onClick={() => {
              setIsSearchOpen(false);
              navigate('shop');
            }}
            className="text-xs font-bold text-[#034848] hover:text-[#72bf44] inline-flex items-center gap-1 transition-colors"
          >
            <span>Explore All Products in Shop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
