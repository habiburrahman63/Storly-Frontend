import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Phone,
  Search,
  Heart,
  ShoppingBag,
  User as UserIcon,
  ChevronDown,
  LayoutGrid,
  Sparkles,
  Headphones,
  Menu,
  X,
  LogOut,
  SlidersHorizontal,
  Package,
  LayoutDashboard,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentView,
    navigate,
    products,
    categories,
    cartTotalCount,
    cartSubtotal,
    wishlist,
    user,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsAuthOpen,
    setIsAIModalOpen,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    logout,
  } = useApp();

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [selectedCategorySearch, setSelectedCategorySearch] = useState('All Categories');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const accountDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
    };
    if (isAccountDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAccountDropdownOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      searchQuery: searchQuery.trim(),
      category: selectedCategorySearch === 'All Categories' ? 'All' : selectedCategorySearch,
    }));
    navigate('shop');
  };

  return (
    <header className="w-full bg-white border-b border-stone-200 sticky top-0 z-40 shadow-xs">
      {/* 1. Top Information Bar */}
      <div className="bg-[#f4f7f6] border-b border-stone-200/70 text-xs text-slate-600 py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Top Left info */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-[#034848]" /> Need Support? Call Us:
              <strong className="text-[#034848]">(408) 555-0103</strong>
            </span>
            <span className="hidden sm:inline-block text-stone-300">|</span>
            <div className="hidden sm:flex items-center gap-3">
              <select className="bg-transparent font-medium text-slate-700 cursor-pointer focus:outline-hidden">
                <option>🌐 English</option>
                <option>Español</option>
                <option>Français</option>
              </select>
              <select className="bg-transparent font-medium text-slate-700 cursor-pointer focus:outline-hidden">
                <option>💲 USD</option>
                <option>💶 EUR</option>
                <option>💷 GBP</option>
              </select>
            </div>
          </div>

          {/* Top Center Banner */}
          <div className="hidden md:flex items-center gap-2 font-medium">
            <span className="px-2 py-0.5 bg-[#72bf44] text-white text-[10px] font-bold rounded-md">
              25% OFF
            </span>
            <span>Fashion & Organic Category 25% OFF Today</span>
          </div>

          {/* Top Right Links */}
          <div className="flex items-center gap-4 ml-auto sm:ml-0">
            <button
              onClick={() => navigate('home')}
              className="hover:text-[#034848] transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => (user ? navigate('user-dashboard') : setIsAuthOpen(true))}
              className="hover:text-[#034848] transition-colors"
            >
              My Account
            </button>
            <button
              onClick={() => navigate('wishlist')}
              className="hover:text-[#034848] transition-colors"
            >
              My Wishlist
            </button>
            <button
              onClick={() => navigate('shop')}
              className="hidden lg:inline-block px-3 py-1 bg-[#034848] text-white font-semibold text-[11px] rounded-full hover:bg-[#72bf44] transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Header (Logo, Search, User, Wishlist, Cart) */}
      <div className="py-4 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-[#034848]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div
            onClick={() => navigate('home')}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#034848] flex items-center justify-center text-[#72bf44] shadow-sm group-hover:bg-[#72bf44] group-hover:text-white transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-[#034848] tracking-tight">Storly</span>
              <span className="block text-[9px] uppercase tracking-widest text-[#72bf44] font-bold">
                Organic Market
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar with Category Dropdown */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center flex-1 max-w-2xl bg-stone-50 border border-stone-300 rounded-2xl overflow-hidden focus-within:border-[#034848] focus-within:ring-2 focus-within:ring-[#034848]/20 transition-all ml-4"
        >
          <div className="relative border-r border-stone-200 bg-white">
            <select
              value={selectedCategorySearch}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedCategorySearch(val);
                setFilters((prev) => ({
                  ...prev,
                  category: val === 'All Categories' ? 'All' : val,
                }));
                navigate('shop');
              }}
              className="py-3 pl-4 pr-8 text-xs font-semibold text-slate-700 bg-transparent cursor-pointer focus:outline-hidden appearance-none"
            >
              <option>All Categories</option>
              {categories.map((c) => (
                <option key={c.id}>{c.name}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <input
            type="text"
            placeholder="Search for items, organic milk, berries, vegetables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            className="w-full py-3 px-4 text-xs font-medium text-slate-800 placeholder-slate-400 bg-transparent focus:outline-hidden"
          />

          <button
            type="submit"
            className="px-6 py-3.5 bg-[#034848] hover:bg-[#023838] text-white flex items-center justify-center transition-colors"
          >
            <Search className="w-4 h-4 text-[#72bf44]" />
          </button>
        </form>

        {/* Right Action Icons & Support Hotline */}
        <div className="flex items-center gap-5">
          {/* User Account */}
          <div className="relative" ref={accountDropdownRef}>
            <button
              onClick={() => (user ? setIsAccountDropdownOpen(!isAccountDropdownOpen) : setIsAuthOpen(true))}
              className="flex items-center gap-2 hover:text-[#034848] transition-colors cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-[#034848] text-white flex items-center justify-center overflow-hidden border border-[#72bf44] shadow-xs font-bold text-xs">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : user ? (
                  <span className="text-[#72bf44]">
                    {user.name
                      ? user.name.trim().split(' ').length >= 2
                        ? (user.name.trim().split(' ')[0][0] + user.name.trim().split(' ')[1][0]).toUpperCase()
                        : user.name.slice(0, 2).toUpperCase()
                      : 'U'}
                  </span>
                ) : (
                  <UserIcon className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="hidden xl:block text-left max-w-[120px]">
                <span className="block text-[10px] text-slate-400 font-medium leading-none">Account</span>
                <span className="text-xs font-bold text-slate-800 leading-tight truncate block">
                  {user ? user.name : 'Sign in / Up'}
                </span>
              </div>
            </button>

            {/* Account Dropdown */}
            {isAccountDropdownOpen && user && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-stone-200 py-2.5 z-50 text-xs font-medium animate-in fade-in slide-in-from-top-2">
                {/* User Info Header */}
                <div className="px-4 py-2.5 border-b border-stone-100">
                  <p className="font-extrabold text-slate-900 truncate">{user.name}</p>
                  <p className="text-slate-400 text-[11px] truncate mt-0.5">{user.email}</p>
                </div>

                {/* Account Navigation Links */}
                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsAccountDropdownOpen(false);
                      navigate('user-dashboard');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-stone-50 text-slate-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#034848]" />
                    <span>My Dashboard</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsAccountDropdownOpen(false);
                      navigate('user-dashboard');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-stone-50 text-slate-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Package className="w-4 h-4 text-[#034848]" />
                    <span>My Orders</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsAccountDropdownOpen(false);
                      setIsWishlistOpen(true);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-stone-50 text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Wishlist</span>
                    </span>
                    {wishlist.length > 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-50 text-rose-600 rounded-full">
                        {wishlist.length}
                      </span>
                    )}
                  </button>
                </div>

                {/* Logout */}
                <div className="pt-1 border-t border-stone-100 mt-1">
                  <button
                    onClick={() => {
                      setIsAccountDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2.5 transition-colors cursor-pointer font-semibold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 hover:text-[#034848] transition-colors"
            title="Wishlist"
          >
            <Heart className="w-6 h-6 text-slate-700" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 p-2 bg-stone-100 hover:bg-emerald-50/80 rounded-2xl transition-all"
            title="Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-6 h-6 text-[#034848]" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#72bf44] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-white">
                  {cartTotalCount}
                </span>
              )}
            </div>
            <div className="hidden sm:block text-left">
              <span className="block text-[10px] text-slate-400 font-medium leading-none">Cart</span>
              <span className="text-xs font-extrabold text-[#034848] leading-tight">
                ${cartSubtotal.toFixed(2)}
              </span>
            </div>
          </button>

          {/* 24/7 Support Banner Badge */}
          <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-stone-200">
            <div className="w-9 h-9 rounded-full bg-emerald-100/70 text-[#034848] flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-[#72bf44] uppercase tracking-wider">
                24/7 Support
              </span>
              <span className="text-xs font-black text-slate-800">888-777-999</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Navigation Bar */}
      <div className="bg-white border-t border-stone-200/80 py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Category Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className="px-5 py-3 bg-[#034848] hover:bg-[#023838] text-white text-xs font-bold rounded-xl flex items-center gap-3 transition-all shadow-sm"
            >
              <LayoutGrid className="w-4 h-4 text-[#72bf44]" />
              <span>Explore All Categories</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Category Dropdown Menu */}
            {isCategoryMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-stone-200 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                {categories.map((cat) => {
                  const count = products.filter(
                    (p) =>
                      p.category.toLowerCase().trim() === cat.name.toLowerCase().trim() ||
                      p.categorySlug === cat.slug
                  ).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setIsCategoryMenuOpen(false);
                        setFilters((prev) => ({ ...prev, category: cat.name }));
                        navigate('shop');
                      }}
                      className="w-full text-left px-5 py-2.5 hover:bg-emerald-50/60 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] px-2.5 py-0.5 bg-stone-100 text-slate-600 rounded-full font-bold">
                        {count} Items
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Main Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-slate-700 relative">
            <button
              onClick={() => navigate('home')}
              className={`hover:text-[#034848] transition-colors cursor-pointer ${
                currentView === 'home' ? 'text-[#034848] font-extrabold border-b-2 border-[#72bf44] pb-1' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('about')}
              className={`hover:text-[#034848] transition-colors cursor-pointer ${
                currentView === 'about' ? 'text-[#034848] font-extrabold border-b-2 border-[#72bf44] pb-1' : ''
              }`}
            >
              About
            </button>
            <button
              onClick={() => navigate('shop')}
              className={`hover:text-[#034848] transition-colors cursor-pointer ${
                currentView === 'shop' ? 'text-[#034848] font-extrabold border-b-2 border-[#72bf44] pb-1' : ''
              }`}
            >
              Shop
            </button>

            {/* Mega Menu Trigger & Popup */}
            <div className="relative">
              <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className={`hover:text-[#034848] transition-colors flex items-center gap-1 cursor-pointer ${
                  isMegaMenuOpen ? 'text-[#034848] font-extrabold' : ''
                }`}
              >
                Mega Menu <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Content */}
              {isMegaMenuOpen && (
                <div className="absolute top-full left-0 mt-3 w-[650px] bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 z-50 animate-in fade-in slide-in-from-top-2 grid grid-cols-3 gap-6">
                  {/* Column 1: Featured Categories */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#034848] border-b border-stone-100 pb-2">
                      Popular Categories
                    </h4>
                    <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                      {categories.slice(0, 5).map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setIsMegaMenuOpen(false);
                            setFilters((f) => ({ ...f, category: cat.name }));
                            navigate('shop');
                          }}
                          className="w-full text-left py-1 hover:text-[#72bf44] hover:font-bold transition-all flex items-center justify-between cursor-pointer"
                        >
                          <span>{cat.name}</span>
                          <span className="text-[10px] text-slate-400 bg-stone-100 px-2 py-0.5 rounded-full">Fresh</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Quick Store Links */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#034848] border-b border-stone-100 pb-2">
                      Market Highlights
                    </h4>
                    <div className="space-y-2 text-xs font-semibold text-slate-700">
                      <button
                        onClick={() => { setIsMegaMenuOpen(false); navigate('shop'); }}
                        className="w-full text-left p-2 rounded-xl bg-stone-50 hover:bg-emerald-50 text-[#034848] flex items-center justify-between cursor-pointer"
                      >
                        <span>🛒 Shop Organic Market</span>
                      </button>
                      <button
                        onClick={() => { setIsMegaMenuOpen(false); navigate('about'); }}
                        className="w-full text-left p-2 rounded-xl bg-stone-50 hover:bg-emerald-50 text-slate-700 cursor-pointer"
                      >
                        🌱 About Our Organic Farms
                      </button>
                      <button
                        onClick={() => { setIsMegaMenuOpen(false); navigate('blog-detail'); }}
                        className="w-full text-left p-2 rounded-xl bg-stone-50 hover:bg-emerald-50 text-slate-700 cursor-pointer"
                      >
                        📰 Organic Living Blog
                      </button>
                      <button
                        onClick={() => { setIsMegaMenuOpen(false); navigate('pages'); }}
                        className="w-full text-left p-2 rounded-xl bg-stone-50 hover:bg-emerald-50 text-slate-700 cursor-pointer"
                      >
                        📁 All Store Pages
                      </button>
                    </div>
                  </div>

                  {/* Column 3: Promo Banner Card */}
                  <div className="bg-gradient-to-br from-[#034848] to-[#023838] rounded-2xl p-4 text-white flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-[#72bf44] uppercase tracking-wider">Weekly Offer</span>
                      <h5 className="text-sm font-black leading-tight">25% OFF On Pure Cold Juices</h5>
                      <p className="text-[10px] text-slate-300">Organic detox immunity blenders</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsMegaMenuOpen(false);
                        setFilters((f) => ({ ...f, category: 'Pressed Juices' }));
                        navigate('shop');
                      }}
                      className="mt-3 px-3 py-1.5 bg-[#72bf44] hover:bg-[#5da835] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg text-center cursor-pointer"
                    >
                      Shop Juices Now
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('blog-detail')}
              className={`hover:text-[#034848] transition-colors cursor-pointer ${
                currentView === 'blog-detail' ? 'text-[#034848] font-extrabold border-b-2 border-[#72bf44] pb-1' : ''
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => navigate('pages')}
              className={`hover:text-[#034848] transition-colors cursor-pointer ${
                currentView === 'pages' ? 'text-[#034848] font-extrabold border-b-2 border-[#72bf44] pb-1' : ''
              }`}
            >
              Pages
            </button>
            <button
              onClick={() => navigate('contact')}
              className={`hover:text-[#034848] transition-colors cursor-pointer ${
                currentView === 'contact' ? 'text-[#034848] font-extrabold border-b-2 border-[#72bf44] pb-1' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* AI Shopping Assistant Button */}
          <button
            onClick={() => setIsAIModalOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-[#034848] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md hover:opacity-95 transition-opacity"
          >
            <Sparkles className="w-4 h-4 text-[#72bf44] animate-pulse" />
            <span>Storly AI Assistant</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 px-6 py-4 space-y-3">
          <div className="flex items-center gap-2 bg-stone-100 p-2.5 rounded-xl">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-transparent focus:outline-hidden"
            />
          </div>
          <div className="flex flex-col gap-2 pt-2 text-sm font-semibold text-slate-800">
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('home'); }} className="text-left py-2 border-b cursor-pointer">
              Home
            </button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('about'); }} className="text-left py-2 border-b cursor-pointer">
              About
            </button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('shop'); }} className="text-left py-2 border-b cursor-pointer">
              Shop All Groceries
            </button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('blog-detail'); }} className="text-left py-2 border-b cursor-pointer">
              Blog
            </button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('pages'); }} className="text-left py-2 border-b cursor-pointer">
              Pages Directory
            </button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('contact'); }} className="text-left py-2 border-b cursor-pointer">
              Contact
            </button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('wishlist'); }} className="text-left py-2 border-b cursor-pointer">
              Wishlist ({wishlist.length})
            </button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('user-dashboard'); }} className="text-left py-2 border-b cursor-pointer">
              User Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
