import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CreditCard as CreditCardIcon,
  ShieldCheck,
  Truck,
  Check,
  Tag,
  ChevronRight,
  Lock,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    appliedCoupon,
    discountAmount,
    applyCouponCode,
    removeCoupon,
    placeOrder,
    navigate,
    user,
  } = useApp();

  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<
    'Credit Card' | 'PayPal' | 'Stripe' | 'Cash on Delivery'
  >('Credit Card');

  // Interactive Credit Card state
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('392');

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingFee = cartSubtotal > 50 || cartSubtotal === 0 ? 0 : 4.99;
  const tax = parseFloat((cartSubtotal * 0.05).toFixed(2));
  const orderTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee + tax);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    const shippingAddress = {
      fullName,
      phone,
      street,
      city,
      state,
      zipCode,
      country: 'United States',
    };

    await placeOrder(shippingAddress, paymentMethod);
    setIsSubmitting(false);
  };

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCodeInput.trim()) {
      await applyCouponCode(couponCodeInput);
      setCouponCodeInput('');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
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
        <span className="text-[#034848] font-bold">Checkout</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
        Checkout & Payment
      </h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Address & Payment Methods */}
        <div className="lg:col-span-7 space-y-8">
          {/* Shipping Address Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#034848]" /> 1. Express Delivery Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-slate-800 focus:outline-hidden focus:border-[#034848]"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-slate-800 focus:outline-hidden focus:border-[#034848]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-600 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="Street Address"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-slate-800 focus:outline-hidden focus:border-[#034848]"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1">City</label>
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-slate-800 focus:outline-hidden focus:border-[#034848]"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1">State / Zip Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-slate-800 focus:outline-hidden"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Zip Code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-24 px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Gateway */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-6">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#034848]" /> 2. Secure Payment Gateway
            </h3>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
              {[
                { id: 'Credit Card', name: 'Credit Card', icon: '💳' },
                { id: 'PayPal', name: 'PayPal', icon: '🅿️' },
                { id: 'Stripe', name: 'Stripe', icon: '⚡' },
                { id: 'Cash on Delivery', name: 'Cash / COD', icon: '💵' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    paymentMethod === m.id
                      ? 'bg-[#034848] text-white border-[#034848] shadow-md'
                      : 'bg-stone-50 hover:bg-stone-100 text-slate-700 border-stone-200'
                  }`}
                >
                  <span className="block text-lg mb-1">{m.icon}</span>
                  <span>{m.name}</span>
                </button>
              ))}
            </div>

            {/* Credit Card Interactive Preview */}
            {paymentMethod === 'Credit Card' && (
              <div className="space-y-4 pt-2">
                {/* Visual Card Graphic */}
                <div className="w-full max-w-sm mx-auto bg-gradient-to-br from-[#034848] via-emerald-900 to-slate-900 text-white rounded-2xl p-6 shadow-2xl space-y-4 border border-emerald-500/30">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black tracking-widest text-[#72bf44]">STORLY PAY</span>
                    <CreditCardIcon className="w-6 h-6 text-white/80" />
                  </div>
                  <div className="text-lg font-mono font-bold tracking-widest my-2">
                    {cardNumber}
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-300 uppercase">
                    <div>
                      <span className="block text-[9px] text-slate-400">Card Holder</span>
                      <span>{fullName}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-slate-400">Expires</span>
                      <span>{cardExpiry}</span>
                    </div>
                  </div>
                </div>

                {/* Card Inputs */}
                <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
                  <div className="col-span-2">
                    <label className="block text-slate-600 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Expiration</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">CVC / CVV</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Items & Subtotal */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-6">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-stone-100 pb-3">
              Order Summary ({cart.length} items)
            </h3>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between gap-3 p-2.5 bg-stone-50 rounded-2xl border border-stone-200/70"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-xl bg-white border border-stone-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-800 truncate">{item.product.name}</p>
                      <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#034848]">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Application */}
            {appliedCoupon ? (
              <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-2xl flex items-center justify-between text-xs font-bold text-[#034848]">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-700" />
                  <span>Code "{appliedCoupon.code}" (-${discountAmount.toFixed(2)})</span>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-rose-600 text-[11px] hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g., WINSALE2026)"
                  value={couponCodeInput}
                  onChange={(e) => setCouponCodeInput(e.target.value)}
                  className="flex-1 px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-[#034848] text-white text-xs font-bold rounded-xl hover:bg-[#72bf44] transition-colors"
                >
                  Apply
                </button>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs font-semibold text-slate-600 pt-3 border-t border-stone-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-base font-black text-[#034848] pt-3 border-t border-stone-200">
                <span>Total Amount</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Place Order Button */}
            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-4 bg-[#034848] hover:bg-[#023838] active:bg-[#72bf44] text-white text-sm font-black rounded-2xl flex items-center justify-center gap-2 shadow-xl transition-all disabled:opacity-50 cursor-pointer"
            >
              <span>Place Order (${orderTotal.toFixed(2)})</span>
              <Check className="w-5 h-5 text-[#72bf44]" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Encrypted Payment & Money Back Guarantee
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
