import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Store,
  ShoppingBag,
  Heart,
  User,
  FileText,
  Info,
  PhoneCall,
  LayoutGrid,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const PagesOverviewPage: React.FC = () => {
  const { navigate, user, setFilters } = useApp();

  const PAGE_SECTIONS = [
    {
      title: 'Store & Market Catalog',
      desc: 'Browse organic produce, farm fresh milk, juices, and seasonal harvests.',
      links: [
        { name: 'Shop All Groceries', view: 'shop' as const, icon: ShoppingBag, tag: 'Popular' },
        { name: 'Seasonal Harvest Category', view: 'shop' as const, action: () => setFilters(f => ({ ...f, category: 'Seasonal Harvest' })), icon: LayoutGrid },
        { name: 'Pressed Detox Juices', view: 'shop' as const, action: () => setFilters(f => ({ ...f, category: 'Pressed Juices' })), icon: LayoutGrid },
        { name: 'Crisp Organic Vegetables', view: 'shop' as const, action: () => setFilters(f => ({ ...f, category: 'Crisp Vegetables' })), icon: LayoutGrid },
        { name: 'Nutty Treasures & Seeds', view: 'shop' as const, action: () => setFilters(f => ({ ...f, category: 'Nutty Treasures' })), icon: LayoutGrid },
      ],
    },
    {
      title: 'Customer Dashboard & Orders',
      desc: 'Manage your profile, active order shipments, wishlists, and account preferences.',
      links: [
        { name: 'User Profile & Order History', view: 'user-dashboard' as const, icon: User, tag: user ? 'Logged In' : 'Sign In Required' },
        { name: 'Saved Wishlist Items', view: 'wishlist' as const, icon: Heart },
        { name: 'Active Cart Checkout', view: 'checkout' as const, icon: CheckCircle },
      ],
    },
    {
      title: 'Information & Company',
      desc: 'Learn about our organic farm partners, customer care, and articles.',
      links: [
        { name: 'About Storly Market', view: 'about' as const, icon: Info, tag: 'New' },
        { name: 'Contact & Customer Support', view: 'contact' as const, icon: PhoneCall, tag: '24/7 Care' },
        { name: 'Organic Lifestyle Blog', view: 'blog-detail' as const, icon: BookOpen },
        { name: 'Certified Partner Stores', view: 'store-detail' as const, icon: Store },
      ],
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#034848] text-xs font-extrabold uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-[#72bf44]" /> Site Pages Directory
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Explore All Pages & Features
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Quickly navigate to any page in Storly Organic Market — from product collections and blog articles to customer dashboards and support.
        </p>
      </div>

      {/* Grid of Pages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PAGE_SECTIONS.map((section, idx) => (
          <div
            key={idx}
            className="p-8 bg-white rounded-3xl border border-stone-200/80 shadow-md flex flex-col justify-between space-y-6 hover:border-[#72bf44] transition-all"
          >
            <div className="space-y-4">
              <h2 className="text-lg font-black text-[#034848] tracking-tight flex items-center gap-2">
                {section.title}
              </h2>
              <p className="text-xs text-slate-500">{section.desc}</p>

              <div className="space-y-2.5 pt-2">
                {section.links.map((link, lIdx) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={lIdx}
                      onClick={() => {
                        if (link.action) link.action();
                        navigate(link.view);
                      }}
                      className="w-full p-3 bg-stone-50 hover:bg-emerald-50/80 rounded-2xl border border-stone-100 hover:border-emerald-200 text-left transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white text-[#034848] flex items-center justify-center shadow-xs group-hover:bg-[#034848] group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-800 group-hover:text-[#034848]">
                          {link.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {link.tag && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-[#034848]">
                            {link.tag}
                          </span>
                        )}
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#034848] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
