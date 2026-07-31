import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
  Check,
  ChevronRight,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigate,
    showToast,
  } = useApp();

  const product = products.find((p) => p.id === selectedProductId) || products[0];
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  // New review state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');

  if (!product) return null;

  const images = product.images?.length ? product.images : [product.image];
  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    showToast('Thank you! Your review has been submitted.', 'success');
    setReviewText('');
    setReviewerName('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button onClick={() => navigate('home')} className="hover:text-[#034848]">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
        <button onClick={() => navigate('shop')} className="hover:text-[#034848]">
          Shop
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
        <span className="text-[#034848] font-bold truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-xs">
        {/* Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 sm:aspect-square bg-stone-50 rounded-3xl overflow-hidden border border-stone-200">
            {product.discountPercentage && (
              <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-rose-600 text-white text-xs font-black rounded-lg">
                {product.discountPercentage}% OFF
              </span>
            )}
            <img
              src={images[selectedImgIdx] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';
              }}
              referrerPolicy="no-referrer"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIdx(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImgIdx === idx ? 'border-[#034848] ring-2 ring-[#034848]/20' : 'border-stone-200 opacity-70'
                  }`}
                >
                  <img
                    src={img}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';
                    }}
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-[#034848] text-xs font-extrabold uppercase rounded-lg">
                {product.category}
              </span>
              {product.isOrganic && (
                <span className="px-3 py-1 bg-[#72bf44] text-white text-xs font-extrabold uppercase rounded-lg flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> 100% Certified Organic
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800">{product.rating}</span>
              <span className="text-xs text-slate-400 font-medium">({product.reviewCount} Reviews)</span>
              <span className="text-stone-300">|</span>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <Check className="w-4 h-4" /> In Stock ({product.stock})
              </span>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-baseline gap-3">
              <span className="text-3xl font-black text-[#034848]">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="text-base text-slate-400 line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xs text-slate-500 font-bold ml-auto">
                Per {product.unit}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-stone-300 rounded-2xl bg-white overflow-hidden p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-stone-100 text-slate-700 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 text-sm font-bold text-slate-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-stone-100 text-slate-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-3.5 px-6 bg-[#034848] hover:bg-[#72bf44] text-white text-xs font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" /> Add To Cart (${(product.price * quantity).toFixed(2)})
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-2xl border transition-colors ${
                  inWishlist ? 'bg-rose-50 border-rose-200 text-rose-500' : 'bg-white border-stone-300 text-slate-500'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => {
                addToCart(product, quantity);
                navigate('checkout');
              }}
              className="w-full py-3.5 bg-[#72bf44] hover:bg-[#5da835] text-white text-xs font-black rounded-2xl shadow-md transition-colors"
            >
              Buy Now (Express Checkout)
            </button>

            <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600 pt-2">
              <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
                <Truck className="w-4 h-4 text-[#034848]" />
                <span>30-45 Mins Delivery</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
                <ShieldCheck className="w-4 h-4 text-[#034848]" />
                <span>Quality Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-xs space-y-6">
        <div className="flex border-b border-stone-200 gap-6">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 text-sm font-extrabold transition-colors cursor-pointer ${
              activeTab === 'details' ? 'text-[#034848] border-b-2 border-[#72bf44]' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            Organic Description
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-sm font-extrabold transition-colors cursor-pointer ${
              activeTab === 'specs' ? 'text-[#034848] border-b-2 border-[#72bf44]' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-sm font-extrabold transition-colors cursor-pointer ${
              activeTab === 'reviews' ? 'text-[#034848] border-b-2 border-[#72bf44]' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            Customer Reviews ({product.reviewCount})
          </button>
        </div>

        {activeTab === 'details' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            <p>{product.description}</p>
            <p>
              Harvested at peak ripeness from certified local organic farms. No artificial preservatives, chemical sprays, or synthetic additives. Rich in vitamins, minerals, and natural flavor.
            </p>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-slate-400 block mb-1">Origin Farm:</span>
              <strong className="text-slate-900">{product.specifications?.Origin || 'Sunny Valley Organic Farm'}</strong>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-slate-400 block mb-1">Storage Condition:</span>
              <strong className="text-slate-900">Keep Refrigerated (2-4°C)</strong>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-slate-400 block mb-1">Shelf Life:</span>
              <strong className="text-slate-900">7-10 Days Freshness Guaranteed</strong>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-slate-400 block mb-1">Certifications:</span>
              <strong className="text-emerald-700">USDA Organic, Non-GMO Verified</strong>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <form onSubmit={handleSubmitReview} className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase">Write a Review</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 font-semibold">Your Rating:</span>
                <div className="flex text-amber-400 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className={`w-5 h-5 ${
                        star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <input
                type="text"
                placeholder="Your Name"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-stone-300 rounded-xl text-xs font-semibold focus:outline-hidden"
              />
              <textarea
                placeholder="Share your thoughts about this organic item..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-white border border-stone-300 rounded-xl text-xs font-medium focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#034848] text-white text-xs font-bold rounded-xl hover:bg-[#72bf44] transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-black text-slate-900">You May Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={`rel-${p.id}`} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
