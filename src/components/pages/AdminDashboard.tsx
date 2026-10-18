import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, Order } from '../../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Plus,
  Trash2,
  Edit,
  DollarSign,
  Tag,
  CheckCircle,
  X,
  Sparkles,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    user,
    navigate,
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    showToast,
  } = useApp();

  if (user?.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4 px-4">
        <h2 className="text-xl font-black text-slate-800">Access Restricted</h2>
        <p className="text-xs text-slate-500">Only administrators have access to this section.</p>
        <button
          onClick={() => navigate('user-dashboard')}
          className="px-6 py-2.5 bg-[#034848] text-white text-xs font-bold rounded-xl cursor-pointer"
        >
          Go to My Account
        </button>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states for Product Add/Edit
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('Fresh Picks');
  const [prodPrice, setProdPrice] = useState(12.99);
  const [prodOldPrice, setProdOldPrice] = useState(15.99);
  const [prodUnit, setProdUnit] = useState('1 Pack');
  const [prodStock, setProdStock] = useState(50);
  const [prodDescription, setProdDescription] = useState('Farm fresh certified organic produce.');
  const [prodImage, setProdImage] = useState(
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  );
  const [prodIsOrganic, setProdIsOrganic] = useState(true);

  // Calculated Stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;

  const categoryData = [
    { name: 'Fresh Picks', value: products.filter((p) => p.category === 'Fresh Picks').length },
    { name: 'Seasonal', value: products.filter((p) => p.category === 'Seasonal Harvest').length },
    { name: 'Juices', value: products.filter((p) => p.category === 'Pressed Juices').length },
    { name: 'Rare Fruits', value: products.filter((p) => p.category === 'Rare Fruits').length },
    { name: 'Vegetables', value: products.filter((p) => p.category === 'Crisp Vegetables').length },
  ];

  const revenueData = [
    { day: 'Mon', revenue: 1200 },
    { day: 'Tue', revenue: 1900 },
    { day: 'Wed', revenue: 1500 },
    { day: 'Thu', revenue: 2400 },
    { day: 'Fri', revenue: 3100 },
    { day: 'Sat', revenue: 4200 },
    { day: 'Sun', revenue: 3800 },
  ];

  const COLORS = ['#034848', '#72bf44', '#f97316', '#e11d48', '#3b82f6'];

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: prodName,
        category: prodCategory,
        price: prodPrice,
        oldPrice: prodOldPrice,
        unit: prodUnit,
        stock: prodStock,
        description: prodDescription,
        image: prodImage,
        isOrganic: prodIsOrganic,
      });
    } else {
      addProduct({
        slug: prodName.toLowerCase().replace(/\s+/g, '-'),
        name: prodName,
        category: prodCategory,
        categorySlug: prodCategory.toLowerCase().replace(/\s+/g, '-'),
        price: prodPrice,
        oldPrice: prodOldPrice,
        unit: prodUnit,
        rating: 5.0,
        reviewCount: 1,
        stock: prodStock,
        isOrganic: prodIsOrganic,
        isBestSeller: true,
        image: prodImage,
        images: [prodImage],
        brand: 'Storly Organic',
        description: prodDescription,
      });
    }
    setIsAddProductOpen(false);
    setEditingProduct(null);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdCategory(p.category);
    setProdPrice(p.price);
    setProdOldPrice(p.oldPrice || p.price);
    setProdUnit(p.unit);
    setProdStock(p.stock);
    setProdDescription(p.description);
    setProdImage(p.image);
    setProdIsOrganic(p.isOrganic);
    setIsAddProductOpen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Header Bar */}
      <div className="bg-[#034848] text-white rounded-3xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#72bf44] text-white flex items-center justify-center font-black text-xl shadow-md">
            ⚡
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Storly MERN Admin Dashboard</h1>
            <p className="text-xs text-emerald-200">Catalog, Orders & Analytics Control Center</p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-emerald-950/60 p-1.5 rounded-2xl border border-emerald-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview' ? 'bg-[#72bf44] text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            Analytics Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products' ? 'bg-[#72bf44] text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            Products ({totalProducts})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders' ? 'bg-[#72bf44] text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            Orders ({totalOrders})
          </button>
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#034848] flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Total Revenue</span>
                <h3 className="text-xl font-black text-slate-900">${totalRevenue.toFixed(2)}</h3>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#034848] flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Total Orders</span>
                <h3 className="text-xl font-black text-slate-900">{totalOrders}</h3>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#034848] flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Catalog Items</span>
                <h3 className="text-xl font-black text-slate-900">{totalProducts}</h3>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#034848] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Active Shoppers</span>
                <h3 className="text-xl font-black text-slate-900">1,892</h3>
              </div>
            </div>
          </div>

          {/* Recharts Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-4">
              <h3 className="text-base font-extrabold text-slate-900">Weekly Revenue Trends ($)</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <XAxis dataKey="day" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#034848" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-4">
              <h3 className="text-base font-extrabold text-slate-900">Category Share</h3>
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <h3 className="text-base font-extrabold text-slate-900">Product Inventory Manager</h3>
            <button
              onClick={() => {
                setEditingProduct(null);
                setProdName('');
                setIsAddProductOpen(true);
              }}
              className="px-4 py-2.5 bg-[#034848] hover:bg-[#72bf44] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add New Product
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-100 text-slate-700 font-bold uppercase">
                <tr>
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Badges</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-semibold text-slate-800">
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg bg-stone-50" />
                      <span className="font-bold">{p.name}</span>
                    </td>
                    <td className="py-3 px-4">{p.category}</td>
                    <td className="py-3 px-4 font-black text-[#034848]">${p.price.toFixed(2)}</td>
                    <td className="py-3 px-4">{p.stock}</td>
                    <td className="py-3 px-4">
                      {p.isOrganic && (
                        <span className="px-2 py-0.5 bg-[#72bf44] text-white text-[10px] rounded-md font-bold">
                          ORGANIC
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded-lg"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-6">
          <h3 className="text-base font-extrabold text-slate-900 border-b border-stone-100 pb-4">
            Customer Orders Workflow ({orders.length})
          </h3>

          <div className="space-y-4">
            {orders.map((ord) => (
              <div key={ord.id} className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-2 text-xs">
                  <div>
                    <strong className="text-slate-900">{ord.orderNumber}</strong> — {ord.customerName} ({ord.customerEmail})
                  </div>
                  <span className="font-black text-[#034848]">${ord.total.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-semibold">Current Status:</span>
                  <select
                    value={ord.status}
                    onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                    className="py-1 px-3 bg-white border border-stone-300 rounded-xl font-bold text-[#034848] focus:outline-hidden"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Packing">Packing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setIsAddProductOpen(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-slate-600 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 mb-1">Category</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  >
                    <option>Fresh Picks</option>
                    <option>Seasonal Harvest</option>
                    <option>Pressed Juices</option>
                    <option>Rare Fruits</option>
                    <option>Crisp Vegetables</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Unit</label>
                  <input
                    type="text"
                    value={prodUnit}
                    onChange={(e) => setProdUnit(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={prodPrice}
                    onChange={(e) => setProdPrice(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Stock</label>
                  <input
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 mb-1">Image URL</label>
                <input
                  type="text"
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#034848] text-white font-bold rounded-xl hover:bg-[#72bf44]"
                >
                  Save Product To Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
