import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Truck,
  ShieldCheck,
  Headphones,
  Star,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  CreditCard,
  Send,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, setFilters } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#034848] text-white pt-0 pb-8 mt-16 relative">
      {/* 1. Value Proposition Strip */}
      <div className="bg-[#023838] border-b border-emerald-900/40 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-slate-200">
          <div className="flex items-center gap-4 p-3 bg-[#034848]/60 rounded-2xl border border-emerald-800/50">
            <div className="w-12 h-12 rounded-xl bg-[#72bf44]/20 text-[#72bf44] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Shipping to 200+ Countries</h4>
              <p className="text-xs text-slate-300">Fast & reliable organic delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-[#034848]/60 rounded-2xl border border-emerald-800/50">
            <div className="w-12 h-12 rounded-xl bg-[#72bf44]/20 text-[#72bf44] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Secure Checkout</h4>
              <p className="text-xs text-slate-300">Encrypted payment protection</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-[#034848]/60 rounded-2xl border border-emerald-800/50">
            <div className="w-12 h-12 rounded-xl bg-[#72bf44]/20 text-[#72bf44] flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Outstanding Support</h4>
              <p className="text-xs text-slate-300">Dedicated 24/7 customer care</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-[#034848]/60 rounded-2xl border border-emerald-800/50">
            <div className="w-12 h-12 rounded-xl bg-[#72bf44]/20 text-[#72bf44] flex items-center justify-center shrink-0">
              <Star className="w-6 h-6 fill-[#72bf44] text-[#72bf44]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Over 9k+ 5-Star Reviews</h4>
              <p className="text-xs text-slate-300">Trusted by happy organic shoppers</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#72bf44] text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-white tracking-tight">Storly</span>
              <span className="block text-[9px] uppercase tracking-widest text-[#72bf44] font-bold">
                Organic Market
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
            From Our Trusted Store To Your Doorstep, Delivering Quality Organic Food with Ultimate Convenience and Care.
          </p>

          <div className="pt-2">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Subscribe to Newsletter</h5>
            <div className="flex items-center gap-2 max-w-sm">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="w-full px-4 py-2.5 bg-[#023838] border border-emerald-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-[#72bf44]"
              />
              <button className="px-4 py-2.5 bg-[#72bf44] hover:bg-[#5da835] text-white text-xs font-bold rounded-xl flex items-center gap-1 shrink-0 transition-colors">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Menu Links */}
        <div>
          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Menu</h4>
          <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
            <li>
              <button onClick={() => navigate('about')} className="hover:text-[#72bf44] transition-colors cursor-pointer">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => navigate('shop')} className="hover:text-[#72bf44] transition-colors cursor-pointer">
                Delivery Info
              </button>
            </li>
            <li>
              <button onClick={() => navigate('pages')} className="hover:text-[#72bf44] transition-colors cursor-pointer">
                FAQ & Pages Directory
              </button>
            </li>
            <li>
              <button onClick={() => navigate('blog-detail')} className="hover:text-[#72bf44] transition-colors cursor-pointer">
                Blog Articles
              </button>
            </li>
            <li>
              <button onClick={() => navigate('contact')} className="hover:text-[#72bf44] transition-colors cursor-pointer">
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Category Links */}
        <div>
          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Category</h4>
          <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
            <li>
              <button
                onClick={() => {
                  setFilters((prev) => ({ ...prev, category: 'Fresh Picks' }));
                  navigate('shop');
                }}
                className="hover:text-[#72bf44] transition-colors"
              >
                Grocery & Dairy
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setFilters((prev) => ({ ...prev, category: 'Pressed Juices' }));
                  navigate('shop');
                }}
                className="hover:text-[#72bf44] transition-colors"
              >
                Bakery & Juices
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setFilters((prev) => ({ ...prev, category: 'Seasonal Harvest' }));
                  navigate('shop');
                }}
                className="hover:text-[#72bf44] transition-colors"
              >
                Ice-cream & Desserts
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setFilters((prev) => ({ ...prev, category: 'Crisp Vegetables' }));
                  navigate('shop');
                }}
                className="hover:text-[#72bf44] transition-colors"
              >
                Energy Drinks & Fruit
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Services */}
        <div>
          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Customer Services</h4>
          <ul className="space-y-3 text-xs text-slate-300 font-medium">
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#72bf44] shrink-0" />
              <span>+1 (555) 666-77-88</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#72bf44] shrink-0" />
              <span>help@company.com</span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#72bf44] shrink-0 mt-0.5" />
              <span>2972 Westheimer Rd. Santa Ana, Illinois 85486</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 border-t border-emerald-900/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
        <p>© 2026 Storly. All rights reserved. By Createaux</p>

        {/* Payment Icons */}
        <div className="flex items-center gap-2 text-slate-300 font-semibold">
          <span className="px-2 py-1 bg-[#023838] rounded-md border border-emerald-800 text-[10px]">VISA</span>
          <span className="px-2 py-1 bg-[#023838] rounded-md border border-emerald-800 text-[10px]">Mastercard</span>
          <span className="px-2 py-1 bg-[#023838] rounded-md border border-emerald-800 text-[10px]">GPay</span>
          <span className="px-2 py-1 bg-[#023838] rounded-md border border-emerald-800 text-[10px]">Apple Pay</span>
          <span className="px-2 py-1 bg-[#023838] rounded-md border border-emerald-800 text-[10px]">PayPal</span>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => navigate('home')} className="hover:text-white transition-colors">
            Privacy Policy
          </button>
          <span>|</span>
          <button onClick={() => navigate('home')} className="hover:text-white transition-colors">
            Terms & Conditions
          </button>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-30 p-3 bg-[#72bf44] hover:bg-[#5da835] text-white rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95"
        title="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};
