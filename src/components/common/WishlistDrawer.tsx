import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart, navigate } = useApp();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-rose-600" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Your Wishlist</h3>
              <p className="text-[11px] font-medium text-slate-500">{wishlist.length} saved item(s)</p>
            </div>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-stone-200/70 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-400">
              <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mb-4 text-rose-300">
                <Heart className="w-10 h-10" />
              </div>
              <h4 className="text-base font-bold text-slate-700">Your wishlist is empty</h4>
              <p className="text-xs text-slate-400 max-w-xs mt-1 mb-6">
                Save your favorite organic items by clicking the heart icon on any product!
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  navigate('shop');
                }}
                className="px-6 py-3 bg-[#034848] hover:bg-[#72bf44] text-white text-xs font-bold rounded-xl transition-colors shadow-md"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3.5 p-3 bg-stone-50 rounded-2xl border border-stone-200/80 relative"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-xl bg-white border border-stone-200 shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate">{item.product.name}</h4>
                  <p className="text-xs font-extrabold text-[#034848] mt-1">
                    ${item.product.price.toFixed(2)}{' '}
                    <span className="text-[10px] text-slate-400 font-normal">/ {item.product.unit}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      addToCart(item.product);
                      toggleWishlist(item.product);
                    }}
                    className="p-2 bg-[#034848] text-white hover:bg-[#72bf44] rounded-xl transition-colors"
                    title="Move to cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(item.product)}
                    className="p-2 text-slate-400 hover:text-rose-500 rounded-xl transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
