import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, Plus, Minus, Check } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const images = quickViewProduct.images?.length ? quickViewProduct.images : [quickViewProduct.image];
  const inWishlist = isInWishlist(quickViewProduct.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 border border-stone-200">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-stone-100 hover:bg-stone-200 text-slate-500 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 p-6 md:p-8 gap-8">
          {/* Left Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-stone-50 rounded-2xl overflow-hidden border border-stone-200/80">
              <img
                src={images[selectedImageIndex] || quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx ? 'border-[#034848]' : 'border-stone-200 opacity-70'
                    }`}
                  >
                    <img src={img} alt="Thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Meta */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 bg-emerald-100 text-[#034848] text-[10px] font-bold uppercase rounded-md">
                  {quickViewProduct.category}
                </span>
                {quickViewProduct.isOrganic && (
                  <span className="px-2.5 py-0.5 bg-[#72bf44] text-white text-[10px] font-bold uppercase rounded-md">
                    100% Organic
                  </span>
                )}
              </div>

              <h2 className="text-xl font-black text-slate-900 leading-tight mb-2">
                {quickViewProduct.name}
              </h2>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(quickViewProduct.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">{quickViewProduct.rating}</span>
                <span className="text-xs text-slate-400">({quickViewProduct.reviewCount} Reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 my-4 p-3 bg-stone-50 rounded-2xl border border-stone-200/80">
                <span className="text-2xl font-black text-[#034848]">
                  ${quickViewProduct.price.toFixed(2)}
                </span>
                {quickViewProduct.oldPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ${quickViewProduct.oldPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs text-slate-500 font-medium ml-auto">
                  Per {quickViewProduct.unit}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {quickViewProduct.description}
              </p>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-stone-50 p-3 rounded-xl border border-stone-200/60 mb-4">
                <div>
                  <span className="text-slate-400">Origin:</span>{' '}
                  <strong className="text-slate-800">{quickViewProduct.specifications?.Origin || 'Certified Farm'}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Stock Status:</span>{' '}
                  <strong className="text-emerald-700">In Stock ({quickViewProduct.stock})</strong>
                </div>
              </div>
            </div>

            {/* Quantity Selector & Add To Cart */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 hover:bg-stone-100 text-slate-600 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-xs font-bold text-slate-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 hover:bg-stone-100 text-slate-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart(quickViewProduct, quantity);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 py-3 px-6 bg-[#034848] hover:bg-[#72bf44] text-white text-xs font-black rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" /> Add To Cart (${(quickViewProduct.price * quantity).toFixed(2)})
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`p-3 rounded-xl border transition-colors ${
                    inWishlist ? 'bg-rose-50 border-rose-200 text-rose-500' : 'bg-white border-stone-300 text-slate-500'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" /> Express 30-Min Delivery
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Quality Money-back Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
