export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  brand: string;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  stock: number;
  unit: string; // e.g., "1 kg", "500g", "1 Pack", "1 Liter"
  variants?: string[]; // e.g., ["250g", "500g", "1kg"]
  isOrganic?: boolean;
  isFresh?: boolean;
  isBestSeller?: boolean;
  isNewLaunch?: boolean;
  isFeatured?: boolean;
  description: string;
  specifications: { [key: string]: string };
  storeName?: string;
  storeId?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  itemCount: number;
  image?: string;
  description?: string;
}

export interface Store {
  id: string;
  name: string;
  logo: string;
  banner: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  joinedDate: string;
  location: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  date: string;
  category: string;
  commentsCount: number;
  summary: string;
  content: string;
  author: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  expiryDate: string;
  description: string;
}

export interface UserAddress {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  phone?: string;
  addresses?: UserAddress[];
  joinedDate: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: UserAddress;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  tax: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: 'Credit Card' | 'PayPal' | 'Stripe' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  createdAt: string;
  estimatedDelivery: string;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  brands: string[];
  ratings: number | null;
  inStockOnly: boolean;
  organicOnly: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'price-low-high' | 'price-high-low' | 'rating' | 'newest';
}
