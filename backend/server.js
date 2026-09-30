import express from 'express';
import cors from 'cors';
import { productsData, categoriesData } from './data/productsData.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory orders store
const ordersDB = [];

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Vansh Weapons API operational', timestamp: new Date() });
});

// GET /api/categories
app.get('/api/categories', (req, res) => {
  res.json({ success: true, data: categoriesData });
});

// GET /api/products
app.get('/api/products', (req, res) => {
  const { category, search, sort } = req.query;
  let results = [...productsData];

  if (category && category !== 'all') {
    results = results.filter((p) => p.category === category.toLowerCase());
  }

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)
    );
  }

  if (sort === 'price-low') {
    results.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    results.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    results.sort((a, b) => b.rating - a.rating);
  }

  res.json({ success: true, count: results.length, data: results });
});

// GET /api/products/:id
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = productsData.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const related = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  res.json({ success: true, data: product, related });
});

// POST /api/orders
app.post('/api/orders', (req, res) => {
  const { items, shippingAddress, ageVerified, paymentMethod, couponCode } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({ success: false, message: 'Cart items required' });
  }

  if (!ageVerified) {
    return res.status(400).json({
      success: false,
      message: 'Government ID & 18+ legal age verification required under Indian Arms Act'
    });
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = couponCode === 'VANSH20' && subtotal >= 2000 ? Math.round(subtotal * 0.2) : 0;
  const shippingFee = subtotal >= 5000 ? 0 : 150;
  const totalAmount = subtotal - discount + shippingFee;

  const orderId = `VW-${Math.floor(10000 + Math.random() * 90000)}-2026`;
  const newOrder = {
    orderId,
    items,
    shippingAddress,
    paymentMethod: paymentMethod || 'Cash on Delivery (COD)',
    subtotal,
    discount,
    shippingFee,
    totalAmount,
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  ordersDB.push(newOrder);

  res.status(201).json({
    success: true,
    message: 'Order placed successfully! Legal verification complete.',
    data: newOrder
  });
});

// POST /api/contact
app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Please fill all required fields' });
  }

  res.status(200).json({
    success: true,
    message: `Thank you ${name}! Your inquiry regarding '${subject}' has been received. Our team will contact you shortly.`
  });
});

app.listen(PORT, () => {
  console.log(`⚔️ Vansh Weapons Backend API running on http://localhost:${PORT}`);
});
