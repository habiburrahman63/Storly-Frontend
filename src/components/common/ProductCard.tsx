import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, navigate } = useApp();
  const inWishlist = isInWishlist(product.id);

  if (compact) {
    // Horizontal card view (e.g., for Top Rated / Top Items lists)
    return (
      <div className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-stone-200/80 hover:shadow-md transition-all group">
        <div
          onClick={() => navigate('product-detail', { productId: product.id })}
          className="relative w-20 h-20 rounded-lg overflow-hidden bg-stone-50 shrink-0 cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4
            onClick={() => navigate('product-detail', { productId: product.id })}
            className="text-xs font-semibold text-slate-800 line-clamp-2 hover:text-[#034848] cursor-pointer transition-colors"
          >
            {product.name}
          </h4>
          <div className="flex items-center gap-1 my-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-[#034848]">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>
            <button
              onClick={() => addToCart(product)}
              className="p-1.5 bg-[#034848] text-white hover:bg-[#72bf44] rounded-md transition-colors"
              title="Add to Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl border border-stone-200/90 p-4 hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300">
      <div>
        {/* Top Badges & Wishlist */}
        <div className="relative w-full aspect-square bg-stone-50 rounded-xl overflow-hidden mb-3">
          {product.discountPercentage && (
            <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 text-[11px] font-bold text-white bg-rose-600 rounded-md shadow-sm">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.isOrganic && !product.discountPercentage && (
            <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 text-[11px] font-bold text-white bg-[#72bf44] rounded-md shadow-sm">
              ORGANIC
            </span>
          )}

          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-2.5 right-2.5 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-md text-slate-500 hover:text-rose-500 transition-all cursor-pointer"
            title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`w-4 h-4 ${
                inWishlist ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
              }`}
            />
          </button>

          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 cursor-pointer"
            onClick={() => navigate('product-detail', { productId: product.id })}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';
            }}
            referrerPolicy="no-referrer"
          />

          {/* Quick View overlay button */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none">
            <button
              onClick={() => setQuickViewProduct(product)}
              className="pointer-events-auto px-3.5 py-2 bg-white/95 text-slate-800 text-xs font-semibold rounded-full shadow-lg flex items-center gap-1.5 hover:bg-[#034848] hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" /> Quick View
            </button>
          </div>
        </div>

        {/* Category & Title */}
        <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wide mb-1">
          {product.category}
        </div>
        <h3
          onClick={() => navigate('product-detail', { productId: product.id })}
          className="text-sm font-semibold text-slate-800 line-clamp-2 hover:text-[#034848] cursor-pointer transition-colors leading-snug mb-2 min-h-[2.5rem]"
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-stone-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-slate-400">({product.reviewCount})</span>
        </div>
      </div>

      {/* Price & Add To Cart Button */}
      <div className="pt-2 border-t border-stone-100 mt-2">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-extrabold text-[#034848]">
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-slate-400 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
          <span className="text-[11px] text-slate-400 ml-auto">{product.unit}</span>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="w-full py-2.5 px-3 bg-[#034848] hover:bg-[#023838] active:bg-[#72bf44] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm group-hover:shadow-md cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-[#72bf44]" />
          Add To Cart
        </button>
      </div>
    </div>
  );
};
