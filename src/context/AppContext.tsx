import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  Store,
  CartItem,
  WishlistItem,
  Order,
  User,
  Coupon,
  FilterState,
  Blog,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_STORES,
  INITIAL_BLOGS,
  INITIAL_COUPONS,
  MOCK_USERS,
} from '../data/mockData';

type ViewType =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'wishlist'
  | 'user-dashboard'
  | 'admin'
  | 'store-detail'
  | 'blog-detail'
  | 'about'
  | 'contact'
  | 'pages';

interface AppContextType {
  products: Product[];
  categories: Category[];
  stores: Store[];
  blogs: Blog[];
  cart: CartItem[];
  wishlist: WishlistItem[];
  user: User | null;
  orders: Order[];
  appliedCoupon: Coupon | null;
  discountAmount: number;
  currentView: ViewType;
  selectedProductId: string | null;
  selectedStoreId: string | null;
  selectedBlogId: string | null;
  completedOrderId: string | null;
  quickViewProduct: Product | null;
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  isAuthOpen: boolean;
  isAIModalOpen: boolean;
  searchQuery: string;
  filters: FilterState;
  toast: { message: string; type?: 'success' | 'error' | 'info' } | null;
  
  // Navigation actions
  navigate: (
    view: ViewType,
    params?: { productId?: string; storeId?: string; blogId?: string; orderId?: string }
  ) => void;
  
  // Cart actions
  addToCart: (product: Product, quantity?: number, selectedVariant?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotalCount: number;
  
  // Wishlist actions
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Modals & UI toggles
  setQuickViewProduct: (product: Product | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsAuthOpen: (open: boolean) => void;
  setIsAIModalOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  
  // Coupon & Order
  applyCouponCode: (code: string) => Promise<boolean>;
  removeCoupon: () => void;
  placeOrder: (
    shippingAddress: any,
    paymentMethod: 'Credit Card' | 'PayPal' | 'Stripe' | 'Cash on Delivery'
  ) => Promise<Order | null>;
  
  // Auth & Profile
  login: (email: string, role?: 'user' | 'admin') => void;
  registerUser: (name: string, email: string, password?: string, role?: 'user' | 'admin') => void;
  updateUserProfile: (data: Partial<User>) => void;
  logout: () => void;
  
  // Admin Product Actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const defaultFilters: FilterState = {
  category: 'All',
  priceRange: [0, 100],
  brands: [],
  ratings: null,
  inStockOnly: false,
  organicOnly: false,
  searchQuery: '',
  sortBy: 'featured',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [stores] = useState<Store[]>(INITIAL_STORES);
  const [blogs] = useState<Blog[]>(INITIAL_BLOGS);
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('storly_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('storly_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('storly_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Clear old unsplash demo woman/man avatar if present
        if (parsed && parsed.avatar && (parsed.avatar.includes('photo-1534528741775') || parsed.avatar.includes('photo-1494790108377'))) {
          parsed.avatar = '';
        }
        return parsed;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('storly_registered_users');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('storly_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);
  
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('storly_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    // Default realistic initial order history
    return [
      {
        id: 'ord-1001',
        orderNumber: 'STY-2026-8492',
        userId: 'usr-1',
        customerName: 'Sarah Jenkins',
        customerEmail: 'sarah@example.com',
        customerPhone: '+1 (408) 555-0192',
        shippingAddress: {
          fullName: 'Sarah Jenkins',
          address: '742 Evergreen Terrace',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94107',
          phone: '+1 (408) 555-0192',
        },
        items: [
          { product: INITIAL_PRODUCTS[0], quantity: 2 },
          { product: INITIAL_PRODUCTS[1], quantity: 1 },
        ],
        subtotal: 14.97,
        shippingFee: 0,
        discount: 0,
        tax: 0.75,
        total: 15.72,
        status: 'Delivered',
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        estimatedDelivery: 'Delivered on July 29, 2026',
      },
      {
        id: 'ord-1002',
        orderNumber: 'STY-2026-9210',
        userId: 'usr-1',
        customerName: 'Sarah Jenkins',
        customerEmail: 'sarah@example.com',
        customerPhone: '+1 (408) 555-0192',
        shippingAddress: {
          fullName: 'Sarah Jenkins',
          address: '742 Evergreen Terrace',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94107',
          phone: '+1 (408) 555-0192',
        },
        items: [
          { product: INITIAL_PRODUCTS[2], quantity: 1 },
          { product: INITIAL_PRODUCTS[3], quantity: 3 },
        ],
        subtotal: 21.96,
        shippingFee: 0,
        discount: 2.00,
        tax: 1.00,
        total: 20.96,
        status: 'Processing',
        paymentMethod: 'PayPal',
        paymentStatus: 'Paid',
        createdAt: new Date().toISOString(),
        estimatedDelivery: 'Arriving Today in 30-45 Mins',
      },
    ];
  });
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [completedOrderId, setCompletedOrderId] = useState<string | null>(null);
  
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);

  // Sync cart & wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('storly_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('storly_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('storly_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('storly_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('storly_orders', JSON.stringify(orders));
  }, [orders]);

  // Fetch API products on startup if available
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products?.length > 0) {
          setProducts(data.products);
        }
      })
      .catch(() => {
        // Fallback to local INITIAL_PRODUCTS
      });

    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.orders) {
          setOrders(data.orders);
        }
      })
      .catch(() => {});
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const navigate = (
    view: ViewType,
    params?: { productId?: string; storeId?: string; blogId?: string; orderId?: string }
  ) => {
    setCurrentView(view);
    if (params?.productId) setSelectedProductId(params.productId);
    if (params?.storeId) setSelectedStoreId(params.storeId);
    if (params?.blogId) setSelectedBlogId(params.blogId);
    if (params?.orderId) setCompletedOrderId(params.orderId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Functions
  const addToCart = (product: Product, quantity = 1, selectedVariant?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant === selectedVariant
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedVariant }];
    });
    showToast(`Added "${product.name.slice(0, 24)}..." to cart`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist Functions
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.product.id === product.id);
      if (exists) {
        showToast(`Removed from wishlist`, 'info');
        return prev.filter((item) => item.product.id !== product.id);
      }
      showToast(`Added to wishlist!`, 'success');
      return [...prev, { product, addedAt: new Date().toISOString() }];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.product.id === productId);
  };

  // Coupons
  const applyCouponCode = async (code: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, cartTotal: cartSubtotal }),
      });
      const data = await res.json();
      if (data.success) {
        setAppliedCoupon(data.coupon);
        setDiscountAmount(data.discountAmount);
        showToast(`Coupon "${data.coupon.code}" applied! Saved $${data.discountAmount.toFixed(2)}`, 'success');
        return true;
      } else {
        showToast(data.message || 'Invalid coupon code', 'error');
        return false;
      }
    } catch {
      const found = INITIAL_COUPONS.find((c) => c.code.toUpperCase() === code.toUpperCase().trim());
      if (found) {
        const disc = (cartSubtotal * found.discountValue) / 100;
        setAppliedCoupon(found);
        setDiscountAmount(disc);
        showToast(`Coupon "${found.code}" applied! Saved $${disc.toFixed(2)}`, 'success');
        return true;
      }
      showToast('Invalid coupon code', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    showToast('Coupon removed', 'info');
  };

  // Place Order
  const placeOrder = async (
    shippingAddress: any,
    paymentMethod: 'Credit Card' | 'PayPal' | 'Stripe' | 'Cash on Delivery'
  ): Promise<Order | null> => {
    const subtotal = cartSubtotal;
    const shippingFee = subtotal > 50 ? 0 : 4.99;
    const tax = parseFloat((subtotal * 0.05).toFixed(2));
    const total = Math.max(0, subtotal - discountAmount + shippingFee + tax);

    const payload = {
      userId: user?.id || 'guest-1',
      customerName: shippingAddress.fullName || user?.name || 'Valued Shopper',
      customerEmail: user?.email || 'customer@storly.com',
      customerPhone: shippingAddress.phone || user?.phone || '+1 (408) 555-0192',
      shippingAddress,
      items: cart,
      subtotal,
      shippingFee,
      discount: discountAmount,
      tax,
      total,
      paymentMethod,
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) => [data.order, ...prev]);
        clearCart();
        navigate('order-success', { orderId: data.order.id });
        return data.order;
      }
    } catch {
      // Local fallback order
      const localOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: `STY-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        userId: user?.id || 'guest',
        customerName: shippingAddress.fullName,
        customerEmail: user?.email || 'customer@storly.com',
        customerPhone: shippingAddress.phone,
        shippingAddress,
        items: cart,
        subtotal,
        shippingFee,
        discount: discountAmount,
        tax,
        total,
        status: 'Processing',
        paymentMethod,
        paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
        createdAt: new Date().toISOString(),
        estimatedDelivery: '30-45 Mins Express Organic Delivery',
      };
      setOrders((prev) => [localOrder, ...prev]);
      clearCart();
      navigate('order-success', { orderId: localOrder.id });
      return localOrder;
    }
    return null;
  };

  // Auth Actions
  const login = (email: string, role: 'user' | 'admin' = 'user') => {
    const cleanEmail = email.trim().toLowerCase();

    if (role === 'admin' || cleanEmail.includes('admin')) {
      const adminUser = { ...MOCK_USERS[1], email: cleanEmail };
      setUser(adminUser);
      showToast(`Welcome back, Administrator!`, 'success');
    } else {
      // Search in registered users first
      const existing = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);
      if (existing) {
        setUser(existing);
        showToast(`Welcome back, ${existing.name}!`, 'success');
      } else {
        const rawPrefix = cleanEmail.split('@')[0];
        let formattedName = rawPrefix
          .replace(/[0-9]/g, ' ')
          .replace(/[\._-]/g, ' ')
          .trim();

        if (!formattedName) {
          formattedName = rawPrefix.charAt(0).toUpperCase() + rawPrefix.slice(1);
        } else {
          formattedName = formattedName
            .split(' ')
            .filter(Boolean)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        }

        const normalUser: User = {
          id: `usr-${Date.now()}`,
          name: formattedName || 'Valued Shopper',
          email: cleanEmail,
          role: 'user',
          phone: '',
          avatar: '', // No default picture assigned automatically!
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          addresses: [],
        };

        setUser(normalUser);
        setRegisteredUsers((prev) => {
          const filtered = prev.filter((u) => u.email.toLowerCase() !== cleanEmail);
          return [...filtered, normalUser];
        });
        showToast(`Logged in as ${normalUser.name}`, 'success');
      }
    }
    setIsAuthOpen(false);
  };

  const registerUser = (
    name: string,
    email: string,
    _password?: string,
    role: 'user' | 'admin' = 'user'
  ) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim() || 'Valued Shopper';

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      avatar: '', // No default avatar picture assigned!
      role,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      phone: '',
      addresses: [],
    };

    setUser(newUser);
    setRegisteredUsers((prev) => {
      const filtered = prev.filter((u) => u.email.toLowerCase() !== cleanEmail);
      return [...filtered, newUser];
    });

    showToast(`Account created successfully for ${newUser.name}!`, 'success');
    setIsAuthOpen(false);
  };

  const updateUserProfile = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };

      // Also sync to registeredUsers array
      setRegisteredUsers((allUsers) => {
        const exists = allUsers.some(
          (u) => u.id === updated.id || u.email.toLowerCase() === updated.email.toLowerCase()
        );
        if (exists) {
          return allUsers.map((u) =>
            u.id === updated.id || u.email.toLowerCase() === updated.email.toLowerCase() ? updated : u
          );
        }
        return [...allUsers, updated];
      });

      return updated;
    });
    showToast('Your profile information has been updated successfully!', 'success');
  };

  const logout = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
    navigate('home');
  };

  // Admin Actions
  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast('New product added to catalog', 'success');
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product deleted', 'info');
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    showToast(`Order status updated to "${status}"`, 'success');
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        stores,
        blogs,
        cart,
        wishlist,
        user,
        orders,
        appliedCoupon,
        discountAmount,
        currentView,
        selectedProductId,
        selectedStoreId,
        selectedBlogId,
        completedOrderId,
        quickViewProduct,
        isCartOpen,
        isWishlistOpen,
        isSearchOpen,
        isAuthOpen,
        isAIModalOpen,
        searchQuery,
        filters,
        toast,
        navigate,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartTotalCount,
        toggleWishlist,
        isInWishlist,
        setQuickViewProduct,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsSearchOpen,
        setIsAuthOpen,
        setIsAIModalOpen,
        setSearchQuery,
        setFilters,
        resetFilters,
        showToast,
        applyCouponCode,
        removeCoupon,
        placeOrder,
        login,
        registerUser,
        updateUserProfile,
        logout,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
