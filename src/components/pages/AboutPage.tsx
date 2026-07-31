import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sprout,
  ShieldCheck,
  Truck,
  Heart,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Leaf,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-16">
      {/* 1. Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#034848] via-[#023838] to-[#012525] text-white p-8 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
        <div className="space-y-6 max-w-2xl text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-[#72bf44] border border-emerald-500/30 text-xs font-extrabold uppercase tracking-widest">
            <Sprout className="w-4 h-4" /> About Storly Market
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Pure, Fresh & Sustainable <span className="text-[#72bf44]">Organic Food</span> For Every Family
          </h1>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Storly Organic Market was founded with a single mission: to connect families directly with certified organic local farmers. We believe that wholesome, nutrient-rich food should be accessible, transparent, and delivered at peak freshness.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => navigate('shop')}
              className="px-6 py-3 bg-[#72bf44] hover:bg-[#5da835] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              Explore Our Farm Market <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('contact')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 transition-all cursor-pointer"
            >
              Contact Our Team
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl shrink-0">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
            alt="Organic Farm Harvest"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 text-slate-800 text-xs font-bold flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#72bf44]" />
              <span>100% USDA Organic Certified</span>
            </div>
            <span className="text-[10px] bg-emerald-100 text-[#034848] px-2 py-0.5 rounded-full font-extrabold">
              Verified
            </span>
          </div>
        </div>
      </div>

      {/* 2. Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Happy Customers', value: '9,000+', desc: 'Trusted organic buyers worldwide' },
          { label: 'Partner Farms', value: '120+', desc: 'Certified smallholder growers' },
          { label: 'Organic Products', value: '500+', desc: 'Fresh fruits, veggies & staples' },
          { label: 'On-Time Delivery', value: '99.4%', desc: 'Cold-chain express delivery' },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:border-[#72bf44]/60 transition-all text-center space-y-2"
          >
            <span className="text-3xl sm:text-4xl font-black text-[#034848] tracking-tight block">
              {stat.value}
            </span>
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              {stat.label}
            </h4>
            <p className="text-[11px] text-slate-500">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* 3. Core Values */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#72bf44]">
            Why Choose Storly
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Our Uncompromising Organic Promises
          </h2>
          <p className="text-xs text-slate-500">
            We hold our growers and supply chains to the highest standards of purity, ethics, and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-stone-50 rounded-3xl border border-stone-200/80 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#034848] flex items-center justify-center font-bold">
              <Leaf className="w-6 h-6 text-[#72bf44]" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-800">100% Pesticide-Free</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every apple, leafy green, and berry in our market is grown without synthetic chemical pesticides, petroleum fertilizers, or GMO seeds.
            </p>
          </div>

          <div className="p-8 bg-stone-50 rounded-3xl border border-stone-200/80 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#034848] flex items-center justify-center font-bold">
              <Truck className="w-6 h-6 text-[#72bf44]" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-800">Farm-To-Door Cold Chain</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our temperature-controlled cold logistics preserve field freshness and vitamin content from the moment of harvest directly to your doorstep.
            </p>
          </div>

          <div className="p-8 bg-stone-50 rounded-3xl border border-stone-200/80 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#034848] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6 text-[#72bf44]" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-800">Fair Pay For Farmers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We eliminate predatory middle-men and pay family farmers fair transparent prices, enabling sustainable agricultural practices for generations.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Farmers & Story Section */}
      <div className="bg-emerald-50/70 border border-emerald-100 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#034848]">
            Direct From Farm Partners
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Grown By Passionate Local Farmers Who Care
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We partner with independent farms like Brown Shop in California and Green Harvest Market in Oregon. Every harvest is tested for purity and hand-inspected before packaging.
          </p>

          <ul className="space-y-3 text-xs font-semibold text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#72bf44] shrink-0" />
              <span>Certified Organic Non-GMO Soil Management</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#72bf44] shrink-0" />
              <span>Daily Harvest at Peak Flavor and Nutrient Ripeness</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#72bf44] shrink-0" />
              <span>Zero Artificial Food Preservatives or Additives</span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80"
            alt="Organic Farmers"
            className="rounded-2xl shadow-md h-52 w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <img
            src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=600&q=80"
            alt="Organic Produce Market"
            className="rounded-2xl shadow-md h-52 w-full object-cover mt-6"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
};
