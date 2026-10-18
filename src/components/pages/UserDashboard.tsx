import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User as UserIcon,
  Package,
  LogOut,
  ChevronRight,
  ShoppingBag,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Edit3,
  Save,
  MapPin,
  Phone,
  Mail,
  Heart,
  Upload,
  Camera,
  Trash2,
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { user, orders, logout, navigate, addToCart, updateUserProfile, wishlist } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');

  // Edit Profile Local Form State
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editAvatar, setEditAvatar] = useState(user?.avatar || '');
  const [editAddress, setEditAddress] = useState('742 Evergreen Terrace');
  const [editCity, setEditCity] = useState('San Francisco');
  const [editZip, setEditZip] = useState('94107');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditEmail(user.email || '');
      setEditPhone(user.phone || '');
      setEditAvatar(user.avatar || '');
      setImgError(false);
    }
  }, [user]);

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image file size should be less than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditAvatar(reader.result as string);
        setImgError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4 px-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#034848] flex items-center justify-center mx-auto shadow-xs">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-800">Account Access Required</h2>
        <p className="text-xs text-slate-500">
          Please sign in or create an account to view your dashboard, manage orders, and edit profile details.
        </p>
        <button
          onClick={() => navigate('home')}
          className="px-6 py-2.5 bg-[#034848] hover:bg-[#72bf44] text-white text-xs font-extrabold rounded-xl shadow-md transition-colors cursor-pointer"
        >
          Return to Home Page
        </button>
      </div>
    );
  }

  const userOrders = orders.filter(
    (o) =>
      Boolean(user) &&
      ((user.id && o.userId === user.id) ||
        (user.email && o.customerEmail && o.customerEmail.toLowerCase() === user.email.toLowerCase()))
  );

  const filteredOrders =
    selectedStatusFilter === 'All'
      ? userOrders
      : userOrders.filter((o) => o.status.toLowerCase() === selectedStatusFilter.toLowerCase());

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      email: editEmail,
      phone: editPhone,
      avatar: editAvatar,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-[#034848] text-[10px] font-black uppercase rounded-full">
            <CheckCircle2 className="w-3 h-3" /> Delivered
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-black uppercase rounded-full">
            <Clock className="w-3 h-3" /> Processing
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-[10px] font-black uppercase rounded-full">
            <Truck className="w-3 h-3" /> Shipped
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-100 text-rose-800 text-[10px] font-black uppercase rounded-full">
            <XCircle className="w-3 h-3" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-stone-100 text-slate-700 text-[10px] font-black uppercase rounded-full">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button onClick={() => navigate('home')} className="hover:text-[#034848] transition-colors cursor-pointer">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
        <span className="text-[#034848] font-bold">My Account</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Profile Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-6 text-center">
            <div className="relative w-28 h-28 rounded-full bg-[#034848] mx-auto overflow-hidden border-4 border-[#72bf44] shadow-md flex items-center justify-center text-white">
              {user.avatar && !imgError ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#034848] to-[#012d2d] flex items-center justify-center font-black text-3xl tracking-wider text-[#72bf44]">
                  {getInitials(user.name)}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900">{user.name}</h2>
              <p className="text-xs text-slate-400 font-medium">{user.email}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="px-3 py-1 bg-emerald-100 text-[#034848] text-[10px] font-black uppercase rounded-full">
                  Member
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="space-y-2 pt-2 border-t border-stone-100 text-xs font-bold">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full py-2.5 px-4 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-[#034848] text-white'
                    : 'bg-stone-50 hover:bg-stone-100 text-slate-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Package className="w-4 h-4" /> My Order History
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-current">
                  {userOrders.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full py-2.5 px-4 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-[#034848] text-white'
                    : 'bg-stone-50 hover:bg-stone-100 text-slate-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4" /> Edit Profile Details
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-4 border-t border-stone-100 text-left space-y-2 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-3.5 h-3.5 text-[#034848]" />
                <span>Phone:</span>
                <strong className="text-slate-900 ml-auto">{user.phone || editPhone}</strong>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-[#034848]" />
                <span>City:</span>
                <strong className="text-slate-900 ml-auto">{editCity}</strong>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-3.5 h-3.5 text-[#034848]" />
                <span>Joined Date:</span>
                <strong className="text-slate-900 ml-auto">{user.joinedDate || 'Jul 2026'}</strong>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Main Content Pane */}
        <div className="lg:col-span-8 space-y-6">
          {activeTab === 'orders' ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#034848]" /> My Order History ({userOrders.length})
                  </h3>
                  <p className="text-xs text-slate-500">Track and review all your organic grocery orders</p>
                </div>

                {/* Status Breakdown Filters */}
                <div className="flex flex-wrap gap-1.5 text-xs font-bold">
                  {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer text-[11px] ${
                        selectedStatusFilter.toLowerCase() === status.toLowerCase()
                          ? 'bg-[#034848] text-white'
                          : 'bg-stone-100 hover:bg-stone-200 text-slate-600'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="py-16 text-center space-y-3 text-slate-400">
                  <Package className="w-12 h-12 mx-auto text-stone-300" />
                  <p className="text-xs font-bold text-slate-600">No orders found for filter "{selectedStatusFilter}"</p>
                  <button
                    onClick={() => navigate('shop')}
                    className="px-5 py-2 bg-[#034848] text-white text-xs font-extrabold rounded-xl"
                  >
                    Start Shopping Fresh Produce
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-5 bg-stone-50/80 rounded-2xl border border-stone-200/80 space-y-4 hover:border-stone-300 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/60 pb-3 text-xs">
                        <div>
                          <span className="font-black text-slate-900 text-sm">{ord.orderNumber}</span>
                          <span className="block text-[10px] text-slate-400">
                            Placed on {new Date(ord.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          {getStatusBadge(ord.status)}
                          <span className="font-black text-slate-900 text-sm">${ord.total.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Items Details */}
                      <div className="space-y-3">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs gap-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={it.product.image}
                                alt={it.product.name}
                                className="w-10 h-10 rounded-lg object-cover border border-stone-200"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';
                                }}
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <span className="text-slate-800 font-extrabold block">{it.product.name}</span>
                                <span className="text-[10px] text-slate-400">
                                  Quantity: {it.quantity} × ${it.product.price.toFixed(2)}
                                </span>
                              </div>
                            </div>
                            <span className="text-slate-700 font-extrabold">
                              ${(it.product.price * it.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Shipping & Payment Meta */}
                      <div className="pt-3 border-t border-stone-200/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                        <div>
                          <span>Payment Method: </span>
                          <strong className="text-slate-800 font-bold">{ord.paymentMethod}</strong>
                        </div>
                        <div>
                          <span>Delivery Status: </span>
                          <strong className="text-emerald-700 font-bold">{ord.estimatedDelivery}</strong>
                        </div>

                        <button
                          onClick={() => {
                            ord.items.forEach((it) => addToCart(it.product, it.quantity));
                            navigate('cart');
                          }}
                          className="ml-auto px-4 py-2 bg-[#034848] hover:bg-[#72bf44] text-white text-xs font-extrabold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Re-order All Items
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Edit Profile Tab */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-6">
              <div className="border-b border-stone-100 pb-4">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#034848]" /> Edit Personal Profile Information
                </h3>
                <p className="text-xs text-slate-500">
                  Update your profile picture, contact details, and primary shipping address.
                </p>
              </div>

              <form onSubmit={handleProfileSave} className="space-y-5 text-xs font-semibold">
                {/* Profile Photo Upload (At the very top, clean without URL input) */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/90 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Live Preview Circle */}
                    <div className="w-16 h-16 rounded-full bg-[#034848] border-2 border-[#72bf44] shadow-xs overflow-hidden flex items-center justify-center shrink-0">
                      {editAvatar ? (
                        <img
                          src={editAvatar}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                          onError={() => setImgError(true)}
                        />
                      ) : (
                        <span className="font-black text-lg text-[#72bf44]">
                          {getInitials(editName || user.name)}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-extrabold text-slate-800">Profile Picture</h4>
                      <p className="text-[11px] text-slate-400 font-medium">Upload a photo from your computer (PNG, JPG)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="px-4 py-2 bg-[#034848] hover:bg-[#72bf44] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs">
                      <Upload className="w-4 h-4 text-[#72bf44] group-hover:text-white" />
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        className="hidden"
                      />
                    </label>

                    {editAvatar && (
                      <button
                        type="button"
                        onClick={() => setEditAvatar('')}
                        className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 mb-1">Full Name</label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-slate-600 mb-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <h4 className="text-xs font-black text-slate-800 mb-3">Primary Shipping Address</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-slate-600 mb-1">Street Address</label>
                      <input
                        type="text"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden text-slate-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-600 mb-1">City</label>
                        <input
                          type="text"
                          value={editCity}
                          onChange={(e) => setEditCity(e.target.value)}
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 mb-1">Zip / Postal Code</label>
                        <input
                          type="text"
                          value={editZip}
                          onChange={(e) => setEditZip(e.target.value)}
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden text-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#034848] hover:bg-[#72bf44] text-white font-black text-xs rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Profile Changes
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
