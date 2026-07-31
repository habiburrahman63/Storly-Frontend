import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Printer,
  ShoppingBag,
  Truck,
  MapPin,
  Calendar,
  Sparkles,
  ChevronRight,
  Clock,
  Check,
} from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { orders, completedOrderId, navigate } = useApp();

  const order = orders.find((o) => o.id === completedOrderId) || orders[0];

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}
  }, []);

  if (!order) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-xl font-bold">No recent order found</h2>
        <button
          onClick={() => navigate('home')}
          className="px-6 py-2.5 bg-[#034848] text-white text-xs font-bold rounded-xl"
        >
          Return Home
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Celebration Header */}
      <div className="bg-gradient-to-br from-[#034848] to-emerald-900 text-white rounded-3xl p-8 text-center space-y-4 shadow-xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-[#72bf44] text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-block px-3 py-1 bg-white/20 text-[#72bf44] text-[11px] font-black uppercase tracking-widest rounded-full">
          ORDER CONFIRMED & IN PREPARATION
        </span>

        <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
          Thank You For Your Organic Order!
        </h1>

        <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto font-medium">
          Order Number: <strong className="text-white">{order.orderNumber}</strong>. We're packing your fresh farm items for express delivery.
        </p>
      </div>

      {/* Step-by-Step Delivery Tracking Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-6">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Truck className="w-5 h-5 text-[#034848]" /> Live Order Status Timeline
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl relative">
            <div className="w-8 h-8 rounded-full bg-[#034848] text-white flex items-center justify-center mx-auto mb-2 text-xs font-bold">
              <Check className="w-4 h-4 text-[#72bf44]" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">1. Order Placed</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Received & Verified</p>
          </div>

          <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl relative">
            <div className="w-8 h-8 rounded-full bg-[#72bf44] text-white flex items-center justify-center mx-auto mb-2 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">2. Farm Packing</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Fresh harvest selected</p>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl relative opacity-70">
            <div className="w-8 h-8 rounded-full bg-stone-200 text-slate-500 flex items-center justify-center mx-auto mb-2 text-xs font-bold">
              <Truck className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-800">3. Out For Delivery</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">30-Min Rider Dispatch</p>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl relative opacity-70">
            <div className="w-8 h-8 rounded-full bg-stone-200 text-slate-500 flex items-center justify-center mx-auto mb-2 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-800">4. Delivered</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">At your doorstep</p>
          </div>
        </div>
      </div>

      {/* Printable Invoice Card */}
      <div id="printable-invoice" className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <span className="text-2xl font-black text-[#034848]">Storly Market</span>
            <p className="text-xs text-slate-400">Official Organic Purchase Invoice</p>
          </div>

          <div className="text-right">
            <p className="text-xs font-bold text-slate-800">Invoice #{order.orderNumber}</p>
            <p className="text-[11px] text-slate-400">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Customer & Address Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-600 bg-stone-50 p-5 rounded-2xl border border-stone-200">
          <div>
            <h4 className="font-extrabold text-slate-900 uppercase tracking-wider mb-1.5">Billed & Shipped To:</h4>
            <p className="font-bold text-slate-800">{order.customerName}</p>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
            <p className="mt-1 font-semibold text-[#034848]">{order.customerPhone}</p>
          </div>

          <div className="space-y-1">
            <h4 className="font-extrabold text-slate-900 uppercase tracking-wider mb-1.5">Payment & Delivery Info:</h4>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Payment Status:</strong> <span className="text-emerald-700 font-bold">{order.paymentStatus}</span></p>
            <p><strong>Delivery Promise:</strong> {order.estimatedDelivery}</p>
          </div>
        </div>

        {/* Invoice Item Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-100 text-slate-700 font-bold uppercase border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4 text-center">Unit Price</th>
                <th className="py-3 px-4 text-center">Qty</th>
                <th className="py-3 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-slate-800">
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 object-cover rounded-lg bg-stone-100 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-bold text-slate-800">{item.product.name}</p>
                      <p className="text-[10px] text-slate-400">{item.product.category}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">${item.product.price.toFixed(2)}</td>
                  <td className="py-3 px-4 text-center font-bold">{item.quantity}</td>
                  <td className="py-3 px-4 text-right font-black text-[#034848]">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Calculations */}
        <div className="flex flex-col items-end pt-4 border-t border-stone-200 text-xs font-semibold text-slate-600 space-y-1.5">
          <div className="flex justify-between w-64">
            <span>Subtotal:</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between w-64 text-emerald-700 font-bold">
              <span>Discount:</span>
              <span>-${order.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between w-64">
            <span>Shipping:</span>
            <span>{order.shippingFee === 0 ? 'FREE' : `$${order.shippingFee.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between w-64">
            <span>Tax (5%):</span>
            <span>${order.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-64 text-base font-black text-[#034848] pt-2 border-t border-stone-200">
            <span>Total Paid:</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-bold rounded-2xl flex items-center gap-2 border border-stone-300 transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4 text-[#034848]" /> Print Official Invoice
        </button>

        <button
          onClick={() => navigate('shop')}
          className="px-8 py-3.5 bg-[#034848] hover:bg-[#72bf44] text-white text-xs font-black rounded-2xl flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" /> Continue Organic Shopping
        </button>
      </div>
    </div>
  );
};
