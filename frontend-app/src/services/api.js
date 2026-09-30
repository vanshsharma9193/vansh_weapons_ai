const API_BASE_URL = 'http://localhost:5000/api';

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
