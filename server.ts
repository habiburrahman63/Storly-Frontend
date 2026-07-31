import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_STORES,
  INITIAL_BLOGS,
  INITIAL_COUPONS,
  MOCK_USERS,
} from './src/data/mockData.js';
import { Product, Order, User } from './src/types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let products: Product[] = [...INITIAL_PRODUCTS];
let categories = [...INITIAL_CATEGORIES];
let stores = [...INITIAL_STORES];
let blogs = [...INITIAL_BLOGS];
let coupons = [...INITIAL_COUPONS];
let users: User[] = [...MOCK_USERS];
let orders: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'STY-2026-8921',
    userId: 'user-demo',
    customerName: 'Sarah Connor',
    customerEmail: 'sarah@example.com',
    customerPhone: '+1 (408) 555-0192',
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Sarah Connor',
      phone: '+1 (408) 555-0192',
      street: '2972 Westheimer Rd.',
      city: 'Santa Ana',
      state: 'Illinois',
      zipCode: '85486',
      country: 'United States',
      isDefault: true,
    },
    items: [
      { product: INITIAL_PRODUCTS[0], quantity: 2 },
      { product: INITIAL_PRODUCTS[1], quantity: 1 },
    ],
    subtotal: 82.47,
    shippingFee: 0,
    discount: 10,
    tax: 4.12,
    total: 76.59,
    status: 'Delivered',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    estimatedDelivery: 'Delivered on Feb 26, 2026',
  },
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Auth Endpoints
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    const foundUser = users.find((u) => u.email.toLowerCase() === email?.toLowerCase());

    if (foundUser) {
      res.json({
        success: true,
        user: foundUser,
        token: `mock-jwt-token-${foundUser.id}-${Date.now()}`,
      });
    } else {
      // Auto-login fallback or demo creation
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: email ? email.split('@')[0] : 'Valued Shopper',
        email: email || 'shopper@storly.com',
        role: email?.includes('admin') ? 'admin' : 'user',
        joinedDate: 'Jul 2026',
        addresses: [],
      };
      users.push(newUser);
      res.json({
        success: true,
        user: newUser,
        token: `mock-jwt-token-${newUser.id}-${Date.now()}`,
      });
    }
  });

  app.post('/api/auth/register', (req: Request, res: Response) => {
    const { name, email, phone } = req.body;
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name || 'New Shopper',
      email: email || 'user@storly.com',
      role: 'user',
      phone: phone || '',
      joinedDate: 'Jul 2026',
      addresses: [],
    };
    users.push(newUser);
    res.json({
      success: true,
      user: newUser,
      token: `mock-jwt-token-${newUser.id}-${Date.now()}`,
    });
  });

  // Products API
  app.get('/api/products', (req: Request, res: Response) => {
    const { category, search, minPrice, maxPrice, brand, organic, bestSeller, newLaunch, sort } = req.query;

    let result = [...products];

    if (category && category !== 'All') {
      result = result.filter(
        (p) =>
          p.category.toLowerCase() === (category as string).toLowerCase() ||
          p.categorySlug === (category as string).toLowerCase()
      );
    }

    if (search) {
      const q = (search as string).toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (minPrice) {
      result = result.filter((p) => p.price >= parseFloat(minPrice as string));
    }

    if (maxPrice) {
      result = result.filter((p) => p.price <= parseFloat(maxPrice as string));
    }

    if (organic === 'true') {
      result = result.filter((p) => p.isOrganic);
    }

    if (bestSeller === 'true') {
      result = result.filter((p) => p.isBestSeller);
    }

    if (newLaunch === 'true') {
      result = result.filter((p) => p.isNewLaunch);
    }

    if (sort === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    res.json({ success: true, count: result.length, products: result });
  });

  app.get('/api/products/:id', (req: Request, res: Response) => {
    const product = products.find((p) => p.id === req.params.id || p.slug === req.params.id);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    res.json({ success: true, product });
  });

  app.post('/api/products', (req: Request, res: Response) => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      slug: req.body.name?.toLowerCase().replace(/\s+/g, '-') || `product-${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
      stock: req.body.stock || 50,
      images: req.body.image ? [req.body.image] : [],
      specifications: req.body.specifications || { Origin: 'Local Farm' },
      ...req.body,
    };
    products.unshift(newProduct);
    res.json({ success: true, product: newProduct });
  });

  app.put('/api/products/:id', (req: Request, res: Response) => {
    const index = products.findIndex((p) => p.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    products[index] = { ...products[index], ...req.body };
    res.json({ success: true, product: products[index] });
  });

  app.delete('/api/products/:id', (req: Request, res: Response) => {
    products = products.filter((p) => p.id !== req.params.id);
    res.json({ success: true, message: 'Product deleted successfully' });
  });

  // Categories API
  app.get('/api/categories', (req: Request, res: Response) => {
    res.json({ success: true, categories });
  });

  // Stores API
  app.get('/api/stores', (req: Request, res: Response) => {
    res.json({ success: true, stores });
  });

  // Blogs API
  app.get('/api/blogs', (req: Request, res: Response) => {
    res.json({ success: true, blogs });
  });

  // Coupon API
  app.post('/api/coupons/validate', (req: Request, res: Response) => {
    const { code, cartTotal } = req.body;
    const coupon = coupons.find((c) => c.code.toUpperCase() === code?.toUpperCase().trim());

    if (!coupon) {
      res.status(400).json({ success: false, message: 'Invalid coupon code' });
      return;
    }

    if (cartTotal < coupon.minOrderValue) {
      res.status(400).json({
        success: false,
        message: `Minimum order amount for code ${coupon.code} is $${coupon.minOrderValue}`,
      });
      return;
    }

    const calculatedDiscount =
      coupon.discountType === 'percentage'
        ? (cartTotal * coupon.discountValue) / 100
        : coupon.discountValue;

    res.json({
      success: true,
      coupon,
      discountAmount: Math.min(calculatedDiscount, cartTotal),
    });
  });

  // Orders API
  app.get('/api/orders', (req: Request, res: Response) => {
    const { userId } = req.query;
    if (userId) {
      res.json({ success: true, orders: orders.filter((o) => o.userId === userId) });
    } else {
      res.json({ success: true, orders });
    }
  });

  app.post('/api/orders', (req: Request, res: Response) => {
    const { userId, customerName, customerEmail, customerPhone, shippingAddress, items, subtotal, shippingFee, discount, tax, total, paymentMethod } = req.body;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `STY-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: userId || 'user-guest',
      customerName: customerName || 'Valued Shopper',
      customerEmail: customerEmail || 'customer@storly.com',
      customerPhone: customerPhone || '+1 (408) 555-0192',
      shippingAddress,
      items: items || [],
      subtotal: subtotal || 0,
      shippingFee: shippingFee || 0,
      discount: discount || 0,
      tax: tax || 0,
      total: total || 0,
      status: 'Processing',
      paymentMethod: paymentMethod || 'Credit Card',
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      createdAt: new Date().toISOString(),
      estimatedDelivery: '30-45 Mins Express Organic Delivery',
    };

    orders.unshift(newOrder);

    // Reduce inventory stock
    items?.forEach((item: { product: { id: string }; quantity: number }) => {
      const prod = products.find((p) => p.id === item.product.id);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }
    });

    res.json({ success: true, order: newOrder });
  });

  app.put('/api/orders/:id/status', (req: Request, res: Response) => {
    const order = orders.find((o) => o.id === req.params.id);
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }
    order.status = req.body.status;
    res.json({ success: true, order });
  });

  // Admin Analytics
  app.get('/api/admin/analytics', (req: Request, res: Response) => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;
    const totalCustomers = users.length;

    res.json({
      success: true,
      analytics: {
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        totalOrders,
        totalProducts,
        totalCustomers,
        recentOrders: orders.slice(0, 5),
        categoryDistribution: categories.map((c) => ({
          name: c.name,
          count: products.filter((p) => p.category === c.name).length,
        })),
      },
    });
  });

  // Gemini AI Organic Shopping Assistant
  app.post('/api/ai/assistant', async (req: Request, res: Response) => {
    const { prompt } = req.body;
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.json({
          success: true,
          reply: `I am your Storly Organic Recipe & Pantry Guide! (Tip: Set GEMINI_API_KEY in Secrets to enable full AI model responses). Based on your query "${prompt}", I recommend our Farm Fresh Pasteurized Milk, Crisp Beetroots, and Organic Strawberries!`,
          recommendedProductIds: ['prod-1', 'prod-2', 'prod-5'],
        });
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const availableCatalog = products.map((p) => `${p.id}: ${p.name} ($${p.price})`).join('\n');

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are Storly's AI Organic Grocery Assistant. The customer asks: "${prompt}".
Here is Storly's current product catalog:
${availableCatalog}

Provide a helpful, polite, nutritional response (2-3 sentences max) recommending delicious organic meal ideas or fresh grocery picks. Also list up to 3 product IDs from the catalog above in brackets like [prod-1, prod-5] if relevant.`,
              },
            ],
          },
        ],
      });

      const text = response.text || 'Here are some wonderful organic items for your pantry!';
      const idMatches = text.match(/prod-\d+/g) || ['prod-1', 'prod-2'];

      res.json({
        success: true,
        reply: text.replace(/\[.*?\]/g, '').trim(),
        recommendedProductIds: Array.from(new Set(idMatches)),
      });
    } catch (err: any) {
      console.error('Gemini Assistant Error:', err);
      res.json({
        success: true,
        reply: `Here are our top recommended organic choices for you today!`,
        recommendedProductIds: ['prod-1', 'prod-2', 'prod-5'],
      });
    }
  });

  // Vite middleware setup for Dev / Static for Production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Storly server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
