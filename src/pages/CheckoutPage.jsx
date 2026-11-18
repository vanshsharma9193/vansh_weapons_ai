import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitOrder } from '../services/api';
import { ShieldCheck, CheckCircle2, Lock, CreditCard } from 'lucide-react';

export default function CheckoutPage({ cart, onClearCart, onShowNotification }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Delhi',
    pincode: '',
    idType: 'Aadhaar Card',
    idNumber: '',
    paymentMethod: 'COD',
    ageVerified: false
  });

  const [submitting, setSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingFee = subtotal >= 5000 || cart.length === 0 ? 0 : 150;
  const total = subtotal + shippingFee;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.ageVerified) {
      onShowNotification('⚠️ You must verify 18+ age & Arms Act legal compliance');
      return;
    }

    if (!cart.length) {
      onShowNotification('Your cart is empty!');
      return;
    }

    setSubmitting(true);

    const orderPayload = {
      items: cart,
      shippingAddress: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        idType: formData.idType,
        idNumber: formData.idNumber
      },
      ageVerified: formData.ageVerified,
      paymentMethod: formData.paymentMethod
    };

    const res = await submitOrder(orderPayload);

    setSubmitting(false);

    if (res && res.success) {
      onShowNotification('✅ Order placed successfully!');
      onClearCart();
      navigate('/order-success', { state: { order: res.data } });
    } else {
      onShowNotification(res?.message || 'Order failed to process. Try again.');
    }
  };

  return (
    <div className="checkout-page container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="section-header">
        <span className="section-tag">Secure Checkout</span>
        <h2 className="section-title">
          Legal Order <span className="gold">Verification</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '32px' }}>
        {/* Form Details */}
        <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: '20px', border: '1px solid var(--bg-border)' }}>
          <h3 style={{ fontFamily: 'Oswald', fontSize: '20px', color: 'var(--gold)', marginBottom: '20px' }}>
            1. Customer & Shipping Information
          </h3>

          <div className="form-group">
            <label>Full Name (as per Govt ID) *</label>
            <input
              type="text"
              required
              placeholder="e.g. Vansh Kumar"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Delivery Address *</label>
            <input
              type="text"
              required
              placeholder="House/Plot No., Street, Landmark"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                required
                placeholder="New Delhi"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>PIN Code *</label>
              <input
                type="text"
                required
                placeholder="110001"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              />
            </div>
          </div>

          <h3 style={{ fontFamily: 'Oswald', fontSize: '20px', color: 'var(--gold)', marginTop: '32px', marginBottom: '20px' }}>
            2. Government ID Proof & Age Verification (Indian Arms Act 1959)
          </h3>

          <div className="form-row">
            <div className="form-group">
              <label>ID Proof Type *</label>
              <select
                value={formData.idType}
                onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
              >
                <option value="Aadhaar Card">Aadhaar Card</option>
                <option value="PAN Card">PAN Card</option>
                <option value="Driving License">Driving License</option>
                <option value="Passport">Passport</option>
              </select>
            </div>
            <div className="form-group">
              <label>ID Number (Last 4 Digits) *</label>
              <input
                type="text"
                required
                placeholder="XXXX-XXXX-1234"
                value={formData.idNumber}
                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
              />
            </div>
          </div>

          <div style={{ background: 'rgba(200,168,75,0.08)', border: '1px solid rgba(200,168,75,0.2)', padding: '16px', borderRadius: '10px', marginTop: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-primary)' }}>
              <input
                type="checkbox"
                required
                checked={formData.ageVerified}
                onChange={(e) => setFormData({ ...formData, ageVerified: e.target.checked })}
                style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: 'var(--gold)' }}
              />
              <span>
                I confirm that I am <strong>18 years of age or older</strong> and that the items purchased will be used strictly in accordance with Indian laws and regulations.
              </span>
            </label>
          </div>

          <h3 style={{ fontFamily: 'Oswald', fontSize: '20px', color: 'var(--gold)', marginTop: '32px', marginBottom: '20px' }}>
            3. Select Payment Method
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {['COD', 'UPI', 'NetBanking', 'Card'].map((method) => (
              <label
                key={method}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px',
                  background: formData.paymentMethod === method ? 'rgba(200,168,75,0.12)' : 'var(--bg-dark)',
                  border: `1px solid ${formData.paymentMethod === method ? 'var(--gold)' : 'var(--bg-border)'}`,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === method}
                  onChange={() => setFormData({ ...formData, paymentMethod: method })}
                  style={{ accentColor: 'var(--gold)' }}
                />
                <span>{method === 'COD' ? '💵 Cash on Delivery' : method === 'UPI' ? '⚡ UPI / GPay / PhonePe' : method === 'Card' ? '💳 Debit / Credit Card' : '🏦 Net Banking'}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sidebar Order Summary */}
        <div>
          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '20px', border: '1px solid var(--bg-border)', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontFamily: 'Oswald', fontSize: '20px', color: 'var(--gold)', marginBottom: '16px' }}>
              Order Review
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '200px', overflowY: 'auto', marginBottom: '16px', paddingRight: '4px' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span>{item.name} × {item.qty}</span>
                  <strong style={{ color: 'var(--gold)' }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</strong>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--bg-border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping</span>
                <span>{shippingFee === 0 ? <strong style={{ color: '#27ae60' }}>FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '8px' }}>
                <span>Total Due</span>
                <span style={{ color: 'var(--gold)' }}>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
              style={{ marginTop: '24px' }}
            >
              {submitting ? 'Verifying & Placing Order...' : 'Confirm Order 🛡️'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
