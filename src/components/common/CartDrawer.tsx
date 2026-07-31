import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    appliedCoupon,
    discountAmount,
    applyCouponCode,
    removeCoupon,
    navigate,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setIsApplying(true);
    await applyCouponCode(couponInput);
    setIsApplying(false);
    setCouponInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#034848] text-[#72bf44] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Your Shopping Cart</h3>
              <p className="text-[11px] font-medium text-slate-500">
                {cart.length} item{cart.length !== 1 ? 's' : ''} in cart
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-stone-200/70 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="px-5 py-3 bg-emerald-50/70 border-b border-emerald-100">
          <p className="text-xs font-semibold text-[#034848] mb-1.5 flex items-center justify-between">
            {remainingForFreeShipping === 0 ? (
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <Check className="w-4 h-4" /> You unlocked FREE Express Shipping! 🎉
              </span>
            ) : (
              <span>
                Add <strong className="text-emerald-700">${remainingForFreeShipping.toFixed(2)}</strong> more for FREE Shipping!
              </span>
            )}
          </p>
          <div className="w-full h-2 bg-emerald-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#72bf44] transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-400">
              <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mb-4 text-slate-300">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h4 className="text-base font-bold text-slate-700">Your cart is currently empty</h4>
              <p className="text-xs text-slate-400 max-w-xs mt-1 mb-6">
                Explore our fresh organic harvest, pasteurized dairy, and farm produce!
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('shop');
                }}
                className="px-6 py-3 bg-[#034848] hover:bg-[#72bf44] text-white text-xs font-bold rounded-xl transition-colors shadow-md"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedVariant || 'default'}`}
                className="flex gap-3.5 p-3 bg-stone-50 rounded-2xl border border-stone-200/80 relative group"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-xl bg-white border border-stone-200 shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 truncate">{item.product.name}</h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      ${item.product.price.toFixed(2)} / {item.product.unit}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-stone-100 text-slate-600 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-slate-800">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-stone-100 text-slate-600 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-extrabold text-[#034848]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-500 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            {/* Coupon Code Input */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 bg-emerald-100/80 border border-emerald-300 rounded-xl text-xs">
                <div className="flex items-center gap-2 text-[#034848] font-bold">
                  <Tag className="w-4 h-4" />
                  <span>Coupon "{appliedCoupon.code}" applied (-${discountAmount.toFixed(2)})</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-rose-600 font-bold hover:underline text-[11px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g., WINSALE2026)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-xs font-semibold focus:outline-hidden focus:border-[#034848]"
                />
                <button
                  type="submit"
                  disabled={isApplying}
                  className="px-4 py-2 bg-[#034848] text-white text-xs font-bold rounded-xl hover:bg-[#72bf44] transition-colors disabled:opacity-50"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Subtotal & Summary */}
            <div className="space-y-1.5 pt-2 text-xs font-medium text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-800">${cartSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{cartSubtotal >= freeShippingThreshold ? 'FREE' : '$4.99'}</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#034848] pt-2 border-t border-stone-200">
                <span>Estimated Total</span>
                <span>
                  $
                  {Math.max(
                    0,
                    cartSubtotal - discountAmount + (cartSubtotal >= freeShippingThreshold ? 0 : 4.99)
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                navigate('checkout');
              }}
              className="w-full py-3.5 bg-[#034848] hover:bg-[#023838] active:bg-[#72bf44] text-white text-xs font-black rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#72bf44]" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Encrypted & Safe Checkout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
