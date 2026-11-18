const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Fetch all products with optional filters
 * @param {Object} params - { category, search, sort, minPrice, maxPrice, limit }
 */
export async function fetchProducts(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/products?${query}`);
    const data = await response.json();
    return data.data || [];
  } catch (err) {
    console.warn('API error, falling back to local fallback data:', err);
    return null;
  }
}

/**
 * Fetch a single product by ID with related items
 */
export async function fetchProductById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn('API error:', err);
    return null;
  }
}

/**
 * Fetch all categories
 */
export async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    const data = await response.json();
    return data.data || [];
  } catch (err) {
    console.warn('Categories API error:', err);
    return null;
  }
}

/**
 * Submit an order with legal age verification
 */
export async function submitOrder(orderPayload) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    return await response.json();
  } catch (err) {
    console.error('Order submission API error:', err);
    return { success: false, message: 'Network connection failed' };
  }
}

/**
 * Fetch order details by order ID
 */
export async function fetchOrderById(orderId) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
    return await response.json();
  } catch (err) {
    console.error('Fetch order API error:', err);
    return { success: false, message: 'Failed to fetch order details' };
  }
}

/**
 * Track order delivery status and timeline
 */
export async function trackOrder(orderId) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/track`);
    return await response.json();
  } catch (err) {
    console.error('Track order API error:', err);
    return { success: false, message: 'Failed to track order' };
  }
}

/**
 * Validate coupon code
 */
export async function verifyCoupon(couponCode, subtotal) {
  try {
    const response = await fetch(`${API_BASE_URL}/coupons/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ couponCode, subtotal })
    });
    return await response.json();
  } catch (err) {
    console.error('Coupon verify API error:', err);
    return { success: false, message: 'Failed to verify coupon' };
  }
}

/**
 * Submit contact inquiry
 */
export async function submitContactForm(contactPayload) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactPayload)
    });
    return await response.json();
  } catch (err) {
    console.error('Contact API error:', err);
    return { success: false, message: 'Network error submitting inquiry' };
  }
}

/**
 * Subscribe email to newsletter
 */
export async function subscribeNewsletter(email) {
  try {
    const response = await fetch(`${API_BASE_URL}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return await response.json();
  } catch (err) {
    console.error('Newsletter API error:', err);
    return { success: false, message: 'Failed to subscribe' };
  }
}

/**
 * Submit a customer review for a product
 */
export async function submitProductReview(productId, reviewData) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    return await response.json();
  } catch (err) {
    console.error('Submit review API error:', err);
    return { success: false, message: 'Failed to submit review' };
  }
}

/**
 * Fetch store statistics
 */
export async function fetchStoreStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`);
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error('Stats API error:', err);
    return null;
  }
}
