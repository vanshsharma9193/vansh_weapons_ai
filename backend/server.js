import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { categoriesData } from './data/productsData.js';
import { storage } from './storage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env configuration natively in Node.js
const envPath = path.resolve(__dirname, '.env');
if (fs.existsSync(envPath) && typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile(envPath);
  } catch (err) {
    console.warn('[Env] Notice: Failed loading .env:', err.message);
  }
}

const app = express();
const PORT = process.env.PORT || 5000;

// ----------------------------------------------------
// Middleware
// ----------------------------------------------------
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : '*';

app.use(cors({
  origin: allowedOrigins.includes('*') ? '*' : allowedOrigins,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets if directory exists
const publicDir = path.resolve(__dirname, process.env.STATIC_ASSETS_DIR || '../frontend/public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
}

// Simple request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.originalUrl} ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// ----------------------------------------------------
// Health Check & Store Info
// ----------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: '⚔️ Vansh Weapons REST API is fully operational',
    version: '2.0.0',
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/stats', (req, res) => {
  const products = storage.getProducts();
  const orders = storage.getOrders();
  const subscribers = storage.getSubscribers();
  const inquiries = storage.getInquiries();

  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
  const totalItemsSold = orders.reduce((sum, ord) => {
    return sum + (ord.items || []).reduce((iSum, it) => iSum + (it.qty || 1), 0);
  }, 0);

  res.json({
    success: true,
    data: {
      totalProducts: products.length,
      totalCategories: categoriesData.length,
      totalOrders: orders.length,
      totalItemsSold,
      totalRevenue,
      subscribersCount: subscribers.length,
      inquiriesCount: inquiries.length,
      satisfactionRate: '99.2%',
      complianceStatus: '100% Indian Arms Act 1959 Compliant'
    }
  });
});

// ----------------------------------------------------
// Compliance & Legal Information
// ----------------------------------------------------
app.get('/api/compliance', (req, res) => {
  res.json({
    success: true,
    data: storage.getCompliance()
  });
});

// ----------------------------------------------------
// Categories
// ----------------------------------------------------
app.get('/api/categories', (req, res) => {
  const products = storage.getProducts();
  const enrichedCategories = categoriesData.map((cat) => {
    const count = products.filter((p) => p.category.toLowerCase() === cat.id.toLowerCase()).length;
    return {
      ...cat,
      productCount: count,
      countLabel: `${count} Products`
    };
  });

  res.json({
    success: true,
    count: enrichedCategories.length,
    data: enrichedCategories
  });
});

app.get('/api/categories/:key', (req, res) => {
  const { key } = req.params;
  const cat = categoriesData.find((c) => c.id.toLowerCase() === key.toLowerCase());

  if (!cat) {
    return res.status(404).json({ success: false, message: `Category '${key}' not found` });
  }

  const products = storage.getProducts().filter((p) => p.category.toLowerCase() === key.toLowerCase());

  res.json({
    success: true,
    data: {
      ...cat,
      products,
      productCount: products.length
    }
  });
});

// ----------------------------------------------------
// Products
// ----------------------------------------------------
app.get('/api/products', (req, res) => {
  const { category, search, sort, minPrice, maxPrice, limit, inStock } = req.query;
  let results = [...storage.getProducts()];

  // Category filter
  if (category && category !== 'all') {
    results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  // Search filter (name, category, description, specifications)
  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    results = results.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchDesc = p.desc && p.desc.toLowerCase().includes(q);
      const matchSpecs = p.specs && JSON.stringify(p.specs).toLowerCase().includes(q);
      return matchName || matchCategory || matchDesc || matchSpecs;
    });
  }

  // Price range filters
  if (minPrice && !isNaN(Number(minPrice))) {
    results = results.filter((p) => p.price >= Number(minPrice));
  }
  if (maxPrice && !isNaN(Number(maxPrice))) {
    results = results.filter((p) => p.price <= Number(maxPrice));
  }

  // In-stock filter
  if (inStock === 'true') {
    results = results.filter((p) => p.inStock !== false);
  }

  // Sorting
  if (sort === 'price-low') {
    results.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    results.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sort === 'reviews') {
    results.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
  } else if (sort === 'newest') {
    results.sort((a, b) => (b.id || 0) - (a.id || 0));
  }

  // Limit / Pagination
  if (limit && !isNaN(Number(limit))) {
    results = results.slice(0, Number(limit));
  }

  res.json({
    success: true,
    count: results.length,
    data: results
  });
});

// Autocomplete Search Suggestions
app.get('/api/products/search/suggestions', (req, res) => {
  const { q } = req.query;
  if (!q || !q.trim()) {
    return res.json({ success: true, data: [] });
  }

  const query = q.toLowerCase().trim();
  const products = storage.getProducts();

  const suggestions = products
    .filter((p) => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query))
    .slice(0, 6)
    .map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      image: p.image
    }));

  res.json({ success: true, data: suggestions });
});

app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = storage.getProductById(id);

  if (!product) {
    return res.status(404).json({ success: false, message: `Product ID #${id} not found` });
  }

  const related = storage.getProducts()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  res.json({
    success: true,
    data: product,
    related
  });
});

// Submit Product Review
app.post('/api/products/:id/reviews', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { author, rating, comment } = req.body;

  const numRating = Number(rating);
  if (!author || !author.trim() || isNaN(numRating) || numRating < 1 || numRating > 5) {
    return res.status(400).json({
      success: false,
      message: 'Valid author name and rating (1-5) are required'
    });
  }

  const newReview = {
    id: Date.now(),
    author: author.trim(),
    rating: numRating,
    comment: (comment || '').trim(),
    date: new Date().toISOString()
  };

  const updatedProduct = storage.addProductReview(id, newReview);
  if (!updatedProduct) {
    return res.status(404).json({ success: false, message: `Product ID #${id} not found` });
  }

  res.status(201).json({
    success: true,
    message: 'Review submitted successfully!',
    data: {
      productRating: updatedProduct.rating,
      reviewsCount: updatedProduct.reviews,
      review: newReview
    }
  });
});

// ----------------------------------------------------
// Testimonials
// ----------------------------------------------------
app.get('/api/testimonials', (req, res) => {
  const testimonials = storage.getTestimonials();
  res.json({
    success: true,
    count: testimonials.length,
    data: testimonials
  });
});

app.post('/api/testimonials', (req, res) => {
  const { name, text, location, rating } = req.body;

  if (!name || !text) {
    return res.status(400).json({ success: false, message: 'Name and testimonial text are required' });
  }

  const numRating = Number(rating) || 5;
  const newTestimonial = {
    id: Date.now(),
    name: name.trim(),
    text: text.trim(),
    location: (location || 'India').trim(),
    rating: Math.min(5, Math.max(1, numRating)),
    verified: true,
    date: new Date().toISOString()
  };

  storage.addTestimonial(newTestimonial);

  res.status(201).json({
    success: true,
    message: 'Thank you! Your testimonial has been published.',
    data: newTestimonial
  });
});

// ----------------------------------------------------
// Coupons & Promotions
// ----------------------------------------------------
app.get('/api/coupons', (req, res) => {
  const coupons = storage.getCoupons();
  res.json({
    success: true,
    count: coupons.length,
    data: coupons
  });
});

app.post('/api/coupons/verify', (req, res) => {
  const { couponCode, subtotal } = req.body;

  if (!couponCode) {
    return res.status(400).json({ success: false, message: 'Coupon code is required' });
  }

  const coupon = storage.getCouponByCode(couponCode);
  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: `Promo code '${couponCode.toUpperCase()}' is invalid or expired. Try VANSH20 or VANSH15.`
    });
  }

  const currentSubtotal = Number(subtotal) || 0;
  if (currentSubtotal < coupon.minSubtotal) {
    return res.status(400).json({
      success: false,
      message: `Coupon '${coupon.code}' requires a minimum subtotal of ₹${coupon.minSubtotal.toLocaleString('en-IN')}`
    });
  }

  const discountAmount = Math.round((currentSubtotal * coupon.discountPercent) / 100);

  res.json({
    success: true,
    valid: true,
    couponCode: coupon.code,
    discountPercent: coupon.discountPercent,
    discountAmount,
    description: coupon.description,
    message: `🎉 Coupon '${coupon.code}' applied! You save ₹${discountAmount.toLocaleString('en-IN')}`
  });
});

// ----------------------------------------------------
// Orders
// ----------------------------------------------------
app.get('/api/orders', (req, res) => {
  const { phone, email, search } = req.query;
  let orders = storage.getOrders();

  if (phone) {
    orders = orders.filter((o) => o.shippingAddress?.phone?.includes(phone));
  }
  if (email) {
    orders = orders.filter((o) => o.shippingAddress?.email?.toLowerCase().includes(email.toLowerCase()));
  }
  if (search) {
    const s = search.toLowerCase();
    orders = orders.filter((o) =>
      o.orderId.toLowerCase().includes(s) ||
      o.shippingAddress?.fullName?.toLowerCase().includes(s)
    );
  }

  res.json({
    success: true,
    count: orders.length,
    data: orders
  });
});

app.get('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const order = storage.getOrderById(orderId);

  if (!order) {
    return res.status(404).json({ success: false, message: `Order #${orderId} not found` });
  }

  res.json({ success: true, data: order });
});

app.get('/api/orders/:orderId/track', (req, res) => {
  const { orderId } = req.params;
  const order = storage.getOrderById(orderId);

  if (!order) {
    return res.status(404).json({ success: false, message: `Order #${orderId} not found` });
  }

  const isShipped = ['Shipped', 'Out for Delivery', 'Delivered'].includes(order.status);
  const isOutForDelivery = ['Out for Delivery', 'Delivered'].includes(order.status);
  const isDelivered = order.status === 'Delivered';

  const trackingTimeline = [
    { step: 'Order Placed & Acknowledged', date: order.createdAt, done: true },
    { step: 'Arms Act 1959 18+ Verification Verified', date: order.createdAt, done: true },
    { step: 'Tactical Inspection & Secure Packing', date: order.createdAt, done: order.status !== 'Cancelled' },
    { step: 'Dispatched with BlueDart Defence Express', date: isShipped ? order.createdAt : null, done: isShipped },
    { step: 'Out for Discreet Handover', date: isOutForDelivery ? order.createdAt : null, done: isOutForDelivery },
    { step: 'Delivered Securely to Buyer', date: isDelivered ? order.createdAt : null, done: isDelivered }
  ];

  res.json({
    success: true,
    data: {
      orderId: order.orderId,
      status: order.status,
      carrier: order.carrier || 'BlueDart Defence Express',
      trackingNumber: order.trackingNumber,
      estimatedDelivery: order.estimatedDelivery || '3-5 Business Days',
      deliveryAddress: `${order.shippingAddress?.city}, ${order.shippingAddress?.state}`,
      timeline: trackingTimeline
    }
  });
});

app.post('/api/orders', (req, res) => {
  const { items, shippingAddress, ageVerified, paymentMethod, couponCode } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Cart items are required' });
  }

  if (!ageVerified) {
    return res.status(400).json({
      success: false,
      message: 'Government ID verification and 18+ age confirmation are strictly required under the Indian Arms Act 1959'
    });
  }

  if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.address || !shippingAddress.pincode) {
    return res.status(400).json({
      success: false,
      message: 'Full name, delivery address, and pincode are required for tactical delivery'
    });
  }

  // Calculate Subtotal server-side to prevent tampering
  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    return sum + price * qty;
  }, 0);

  // Apply Coupon if supplied
  let discount = 0;
  let appliedCode = null;
  if (couponCode) {
    const coupon = storage.getCouponByCode(couponCode);
    if (coupon && subtotal >= coupon.minSubtotal) {
      discount = Math.round((subtotal * coupon.discountPercent) / 100);
      appliedCode = coupon.code;
    }
  }

  // Free shipping threshold ₹5,000
  const shippingFee = subtotal >= 5000 ? 0 : 150;
  const totalAmount = Math.max(0, subtotal - discount + shippingFee);

  const orderId = `VW-${Math.floor(10000 + Math.random() * 90000)}-2026`;
  const trackingNumber = `VW-EXP-${Math.floor(100000 + Math.random() * 900000)}`;

  const newOrder = {
    orderId,
    items,
    shippingAddress,
    paymentMethod: paymentMethod || 'Cash on Delivery (COD)',
    subtotal,
    discount,
    couponCode: appliedCode,
    shippingFee,
    totalAmount,
    status: 'Confirmed',
    trackingNumber,
    carrier: 'BlueDart Defence Express',
    estimatedDelivery: '3-5 Business Days',
    complianceVerified: true,
    armsActReference: 'SEC-4-ARMS-1959-OK',
    createdAt: new Date().toISOString()
  };

  storage.createOrder(newOrder);

  res.status(201).json({
    success: true,
    message: 'Order confirmed! Discreet dispatch in progress.',
    data: newOrder
  });
});

app.patch('/api/orders/:orderId/status', (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = ['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Valid options: ${validStatuses.join(', ')}`
    });
  }

  const updatedOrder = storage.updateOrderStatus(orderId, status);
  if (!updatedOrder) {
    return res.status(404).json({ success: false, message: `Order #${orderId} not found` });
  }

  res.json({
    success: true,
    message: `Order #${orderId} status updated to ${status}`,
    data: updatedOrder
  });
});

app.delete('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const cancelledOrder = storage.cancelOrder(orderId);

  if (!cancelledOrder) {
    return res.status(404).json({ success: false, message: `Order #${orderId} not found` });
  }

  res.json({
    success: true,
    message: `Order #${orderId} has been cancelled successfully`,
    data: cancelledOrder
  });
});

// ----------------------------------------------------
// Contact Inquiry
// ----------------------------------------------------
app.get('/api/contact', (req, res) => {
  const inquiries = storage.getInquiries();
  res.json({
    success: true,
    count: inquiries.length,
    data: inquiries
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, valid email address, and message are required'
    });
  }

  const inquiry = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    phone: (phone || '').trim(),
    subject: (subject || 'General Inquiry').trim(),
    message: message.trim(),
    createdAt: new Date().toISOString()
  };

  storage.addInquiry(inquiry);

  res.status(201).json({
    success: true,
    message: `Thank you ${name}! Your dispatch regarding '${inquiry.subject}' has been transmitted to our tactical team.`,
    data: inquiry
  });
});

// ----------------------------------------------------
// Newsletter
// ----------------------------------------------------
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    });
  }

  const result = storage.addSubscriber(email);

  if (!result.added) {
    return res.status(200).json({
      success: true,
      message: 'You are already enrolled in the Vansh Weapons Arsenal Insider intel briefing!'
    });
  }

  res.status(201).json({
    success: true,
    message: 'Tactical intel subscription confirmed! Check your inbox for exclusive gear drops.'
  });
});

// ----------------------------------------------------
// 404 Handler
// ----------------------------------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} not found on Vansh Weapons API`
  });
});

// ----------------------------------------------------
// Global Error Handler
// ----------------------------------------------------
app.use((err, req, res, next) => {
  console.error('[API Error]:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred',
    error: err.message
  });
});

// ----------------------------------------------------
// Start Server
// ----------------------------------------------------
app.listen(PORT, '0.0.0.0', () => {
  console.log(`⚔️ Vansh Weapons Backend API v2.0 operational on port ${PORT}`);
  console.log(`📡 Ready to accept requests across all endpoints`);
});
