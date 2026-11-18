import express from 'express';
import cors from 'cors';
import { productsData, categoriesData } from './data/productsData.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all local development ports
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// In-memory data stores
const productsDB = JSON.parse(JSON.stringify(productsData));
const categoriesDB = JSON.parse(JSON.stringify(categoriesData));

const ordersDB = [
  {
    orderId: 'VW-94821-2026',
    items: [
      {
        id: 1,
        name: 'Predator Hunting Blade',
        price: 2499,
        qty: 1,
        category: 'knives',
        image: '/images/knife1.png'
      }
    ],
    shippingAddress: {
      fullName: 'Vikram Singh Rathore',
      email: 'vikram.rathore@example.com',
      phone: '+91 98765 43210',
      address: 'Plot 42, Defence Colony',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302001',
      idType: 'Aadhaar Card',
      idNumber: 'XXXX-XXXX-9012'
    },
    paymentMethod: 'Cash on Delivery (COD)',
    subtotal: 2499,
    discount: 0,
    shippingFee: 150,
    totalAmount: 2649,
    status: 'Shipped',
    trackingNumber: 'VW-EXP-883921',
    carrier: 'BlueDart Defence Express',
    estimatedDelivery: '3 Business Days',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

const contactInquiriesDB = [];
const newsletterSubscribersDB = new Set(['arsenal.insider@vanshweapons.com']);

const COUPONS = {
  VANSH20: { discountPercent: 20, minSubtotal: 2000, description: '20% off on orders above ₹2,000' },
  FIRSTBUY: { discountPercent: 10, minSubtotal: 0, description: '10% off on your first order' },
  TACTICAL15: { discountPercent: 15, minSubtotal: 1500, description: '15% off on tactical gear above ₹1,500' }
};

// ----------------------------------------------------
// Health Check
// ----------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: '⚔️ Vansh Weapons REST API is operational',
    version: '1.2.0',
    timestamp: new Date().toISOString()
  });
});

// ----------------------------------------------------
// Store Stats / Overview
// ----------------------------------------------------
app.get('/api/stats', (req, res) => {
  const totalRevenue = ordersDB.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
  res.json({
    success: true,
    data: {
      totalProducts: productsDB.length,
      totalCategories: categoriesDB.length,
      totalOrders: ordersDB.length,
      totalRevenue,
      subscribersCount: newsletterSubscribersDB.size,
      satisfactionRate: '98.6%',
      complianceStatus: '100% Indian Arms Act Compliant'
    }
  });
});

// ----------------------------------------------------
// Categories
// ----------------------------------------------------
app.get('/api/categories', (req, res) => {
  res.json({ success: true, count: categoriesDB.length, data: categoriesDB });
});

// ----------------------------------------------------
// Products
// ----------------------------------------------------
app.get('/api/products', (req, res) => {
  const { category, search, sort, minPrice, maxPrice, limit } = req.query;
  let results = [...productsDB];

  // Category filter
  if (category && category !== 'all') {
    results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  // Search filter
  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.desc && p.desc.toLowerCase().includes(q))
    );
  }

  // Price range filters
  if (minPrice && !isNaN(Number(minPrice))) {
    results = results.filter((p) => p.price >= Number(minPrice));
  }
  if (maxPrice && !isNaN(Number(maxPrice))) {
    results = results.filter((p) => p.price <= Number(maxPrice));
  }

  // Sorting
  if (sort === 'price-low') {
    results.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    results.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    results.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'reviews') {
    results.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
  }

  // Limit
  if (limit && !isNaN(Number(limit))) {
    results = results.slice(0, Number(limit));
  }

  res.json({ success: true, count: results.length, data: results });
});

app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = productsDB.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const related = productsDB
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  res.json({ success: true, data: product, related });
});

// Add Review to Product
app.post('/api/products/:id/reviews', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { author, rating, comment } = req.body;

  const product = productsDB.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const numRating = Number(rating);
  if (!author || isNaN(numRating) || numRating < 1 || numRating > 5) {
    return res.status(400).json({ success: false, message: 'Valid author and rating (1-5) required' });
  }

  if (!product.userReviews) {
    product.userReviews = [];
  }

  const newReview = {
    id: product.userReviews.length + 1,
    author: author.trim(),
    rating: numRating,
    comment: (comment || '').trim(),
    date: new Date().toISOString()
  };

  product.userReviews.push(newReview);
  // Recalculate average rating
  const totalReviews = (product.reviews || 0) + 1;
  const currentSum = (product.rating || 4.5) * (product.reviews || 1);
  product.rating = Number(((currentSum + numRating) / totalReviews).toFixed(1));
  product.reviews = totalReviews;

  res.status(201).json({
    success: true,
    message: 'Review submitted successfully!',
    data: { productRating: product.rating, reviewsCount: product.reviews, review: newReview }
  });
});

// ----------------------------------------------------
// Orders
// ----------------------------------------------------
app.get('/api/orders', (req, res) => {
  res.json({ success: true, count: ordersDB.length, data: ordersDB });
});

app.get('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const order = ordersDB.find((o) => o.orderId.toLowerCase() === orderId.toLowerCase());

  if (!order) {
    return res.status(404).json({ success: false, message: `Order ${orderId} not found` });
  }

  res.json({ success: true, data: order });
});

app.get('/api/orders/:orderId/track', (req, res) => {
  const { orderId } = req.params;
  const order = ordersDB.find((o) => o.orderId.toLowerCase() === orderId.toLowerCase());

  if (!order) {
    return res.status(404).json({ success: false, message: `Order ${orderId} not found` });
  }

  const trackingTimeline = [
    { step: 'Order Placed & Verified', date: order.createdAt, done: true },
    { step: 'Arms Act Verification Approved', date: order.createdAt, done: true },
    { step: 'Package Dispatched from Warehouse', date: order.createdAt, done: order.status !== 'Confirmed' },
    { step: 'In Transit with Express Logistics', date: null, done: order.status === 'Shipped' || order.status === 'Delivered' },
    { step: 'Out for Delivery', date: null, done: order.status === 'Delivered' },
    { step: 'Delivered', date: null, done: order.status === 'Delivered' }
  ];

  res.json({
    success: true,
    data: {
      orderId: order.orderId,
      status: order.status,
      carrier: order.carrier || 'BlueDart Defence Express',
      trackingNumber: order.trackingNumber || `VW-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDelivery: order.estimatedDelivery || '2-4 Business Days',
      timeline: trackingTimeline
    }
  });
});

app.patch('/api/orders/:orderId/status', (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = ['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
    });
  }

  const order = ordersDB.find((o) => o.orderId.toLowerCase() === orderId.toLowerCase());
  if (!order) {
    return res.status(404).json({ success: false, message: `Order ${orderId} not found` });
  }

  order.status = status;
  res.json({ success: true, message: `Order status updated to ${status}`, data: order });
});

app.post('/api/orders', (req, res) => {
  const { items, shippingAddress, ageVerified, paymentMethod, couponCode } = req.body;

  if (!items || !Array.isArray(items) || !items.length) {
    return res.status(400).json({ success: false, message: 'Cart items required' });
  }

  if (!ageVerified) {
    return res.status(400).json({
      success: false,
      message: 'Government ID & 18+ legal age verification required under Indian Arms Act'
    });
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);

  // Apply Coupon
  let discount = 0;
  if (couponCode) {
    const coupon = COUPONS[couponCode.trim().toUpperCase()];
    if (coupon && subtotal >= coupon.minSubtotal) {
      discount = Math.round((subtotal * coupon.discountPercent) / 100);
    }
  }

  const shippingFee = subtotal >= 5000 ? 0 : 150;
  const totalAmount = subtotal - discount + shippingFee;

  const orderId = `VW-${Math.floor(10000 + Math.random() * 90000)}-2026`;
  const trackingNumber = `VW-EXP-${Math.floor(100000 + Math.random() * 900000)}`;

  const newOrder = {
    orderId,
    items,
    shippingAddress: shippingAddress || {},
    paymentMethod: paymentMethod || 'Cash on Delivery (COD)',
    subtotal,
    discount,
    couponCode: discount > 0 ? couponCode.trim().toUpperCase() : null,
    shippingFee,
    totalAmount,
    status: 'Confirmed',
    trackingNumber,
    carrier: 'BlueDart Defence Express',
    estimatedDelivery: '3-5 Business Days',
    createdAt: new Date().toISOString()
  };

  ordersDB.unshift(newOrder);

  res.status(201).json({
    success: true,
    message: 'Order placed successfully! Legal verification complete.',
    data: newOrder
  });
});

// ----------------------------------------------------
// Coupons Verification
// ----------------------------------------------------
app.post('/api/coupons/verify', (req, res) => {
  const { couponCode, subtotal } = req.body;

  if (!couponCode) {
    return res.status(400).json({ success: false, message: 'Coupon code required' });
  }

  const code = couponCode.trim().toUpperCase();
  const coupon = COUPONS[code];

  if (!coupon) {
    return res.status(404).json({ success: false, message: 'Invalid coupon code' });
  }

  const currentSubtotal = Number(subtotal) || 0;
  if (currentSubtotal < coupon.minSubtotal) {
    return res.status(400).json({
      success: false,
      message: `Coupon '${code}' requires a minimum subtotal of ₹${coupon.minSubtotal.toLocaleString()}`
    });
  }

  const discountAmount = Math.round((currentSubtotal * coupon.discountPercent) / 100);

  res.json({
    success: true,
    valid: true,
    couponCode: code,
    discountPercent: coupon.discountPercent,
    discountAmount,
    description: coupon.description,
    message: `Coupon '${code}' applied! You save ₹${discountAmount.toLocaleString()}`
  });
});

// ----------------------------------------------------
// Newsletter
// ----------------------------------------------------
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
  }

  const cleanEmail = email.trim().toLowerCase();
  if (newsletterSubscribersDB.has(cleanEmail)) {
    return res.status(200).json({
      success: true,
      message: 'You are already subscribed to the Vansh Weapons newsletter!'
    });
  }

  newsletterSubscribersDB.add(cleanEmail);
  res.status(201).json({
    success: true,
    message: 'Thank you for subscribing! Exclusive tactical deals and arms updates await.'
  });
});

// ----------------------------------------------------
// Contact Inquiry
// ----------------------------------------------------
app.get('/api/contact', (req, res) => {
  res.json({ success: true, count: contactInquiriesDB.length, data: contactInquiriesDB });
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Please fill all required fields' });
  }

  const inquiry = {
    id: contactInquiriesDB.length + 1,
    name: name.trim(),
    email: email.trim(),
    phone: (phone || '').trim(),
    subject: subject.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString()
  };

  contactInquiriesDB.unshift(inquiry);

  res.status(200).json({
    success: true,
    message: `Thank you ${name}! Your inquiry regarding '${subject}' has been received. Our team will contact you shortly.`,
    data: inquiry
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
  console.error('API Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred',
    error: err.message
  });
});

app.listen(PORT, () => {
  console.log(`⚔️ Vansh Weapons Backend API operational on http://localhost:${PORT}`);
  console.log(`📡 Ready to accept requests across all endpoints`);
});
