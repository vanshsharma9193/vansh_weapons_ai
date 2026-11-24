import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { productsData } from './data/productsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJSON(fileName, fallback) {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.warn(`[Storage] Warning: Failed to read ${fileName}, using fallback:`, err.message);
  }
  // Initialize file if not found
  writeJSON(fileName, fallback);
  return fallback;
}

function writeJSON(fileName, data) {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    const tempPath = `${filePath}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempPath, filePath);
    return true;
  } catch (err) {
    console.error(`[Storage] Error: Failed to write ${fileName}:`, err.message);
    return false;
  }
}

// In-memory caches synced to JSON
let products = readJSON('products.json', productsData);
let orders = readJSON('orders.json', []);
let inquiries = readJSON('inquiries.json', []);
let subscribers = readJSON('subscribers.json', ['arsenal.insider@vanshweapons.com']);
let testimonials = readJSON('testimonials.json', []);
let coupons = readJSON('coupons.json', []);
let compliance = readJSON('compliance.json', {});

export const storage = {
  // Products
  getProducts() {
    return products;
  },
  getProductById(id) {
    return products.find((p) => p.id === Number(id));
  },
  updateProduct(id, updates) {
    const idx = products.findIndex((p) => p.id === Number(id));
    if (idx === -1) return null;
    products[idx] = { ...products[idx], ...updates };
    writeJSON('products.json', products);
    return products[idx];
  },
  addProductReview(productId, review) {
    const product = products.find((p) => p.id === Number(productId));
    if (!product) return null;
    if (!product.userReviews) product.userReviews = [];
    product.userReviews.push(review);
    const totalReviews = (product.reviews || 0) + 1;
    const currentSum = (product.rating || 4.5) * (product.reviews || 1);
    product.rating = Number(((currentSum + review.rating) / totalReviews).toFixed(1));
    product.reviews = totalReviews;
    writeJSON('products.json', products);
    return product;
  },

  // Orders
  getOrders() {
    return orders;
  },
  getOrderById(orderId) {
    return orders.find((o) => o.orderId.toLowerCase() === String(orderId).toLowerCase());
  },
  createOrder(order) {
    orders.unshift(order);
    writeJSON('orders.json', orders);
    return order;
  },
  updateOrderStatus(orderId, status) {
    const order = orders.find((o) => o.orderId.toLowerCase() === String(orderId).toLowerCase());
    if (!order) return null;
    order.status = status;
    order.updatedAt = new Date().toISOString();
    writeJSON('orders.json', orders);
    return order;
  },
  cancelOrder(orderId) {
    const idx = orders.findIndex((o) => o.orderId.toLowerCase() === String(orderId).toLowerCase());
    if (idx === -1) return null;
    orders[idx].status = 'Cancelled';
    orders[idx].updatedAt = new Date().toISOString();
    writeJSON('orders.json', orders);
    return orders[idx];
  },

  // Inquiries
  getInquiries() {
    return inquiries;
  },
  addInquiry(inquiry) {
    inquiries.unshift(inquiry);
    writeJSON('inquiries.json', inquiries);
    return inquiry;
  },

  // Subscribers
  getSubscribers() {
    return subscribers;
  },
  addSubscriber(email) {
    const clean = email.toLowerCase().trim();
    if (!subscribers.includes(clean)) {
      subscribers.push(clean);
      writeJSON('subscribers.json', subscribers);
      return { added: true, email: clean };
    }
    return { added: false, email: clean };
  },

  // Testimonials
  getTestimonials() {
    return testimonials;
  },
  addTestimonial(testimonial) {
    testimonials.unshift(testimonial);
    writeJSON('testimonials.json', testimonials);
    return testimonial;
  },

  // Coupons
  getCoupons() {
    return coupons;
  },
  getCouponByCode(code) {
    const clean = String(code).trim().toUpperCase();
    return coupons.find((c) => c.code === clean && c.active);
  },

  // Compliance
  getCompliance() {
    return compliance;
  }
};
