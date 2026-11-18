import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck } from 'lucide-react';

export default function CartPage({
  cart,
  onUpdateQty,
  onRemoveFromCart,
  onShowNotification
}) {
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = appliedCoupon === 'VANSH20' && subtotal >= 2000 ? Math.round(subtotal * 0.2) : 0;
  const freeShippingThreshold = 5000;
  const shippingFee = subtotal >= freeShippingThreshold || cart.length === 0 ? 0 : 150;
  const total = subtotal - discount + shippingFee;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'VANSH20') {
      if (subtotal < 2000) {
        onShowNotification('Code VANSH20 requires minimum order of ₹2,000');
      } else {
        setAppliedCoupon('VANSH20');
        onShowNotification('🎉 20% Discount applied successfully!');
      }
    } else {
      onShowNotification('Invalid promo code. Try VANSH20');
    }
  };

  return (
    <div className="cart-page container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="section-header">
        <span className="section-tag">Shopping Cart</span>
        <h2 className="section-title">
          Your <span className="gold">Arsenal</span>
        </h2>
      </div>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 20px', background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--bg-border)' }}>
          <ShoppingBag size={72} style={{ opacity: 0.3, color: 'var(--gold)', margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '8px' }}>Your cart is empty</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Add some tactical gear or hunting knives to get started.</p>
          <Link to="/shop" className="btn-primary" style={{ display: 'inline-flex', width: 'auto' }}>
            Explore Arsenal Now
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '32px' }}>
          {/* Cart Table */}
          <div>
            <div style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--bg-border)', padding: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--bg-border)', fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <span>Item Details</span>
                <span>Subtotal</span>
              </div>

              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--bg-border)' }}>
                  <div style={{ width: '80px', height: '80px', background: 'var(--bg-dark)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyCenter: 'center', overflow: 'hidden', flexShrink: 0 }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <span style={{ display: 'none', fontSize: '32px' }}>{item.emoji}</span>
                  </div>

                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '16px', color: 'var(--text-primary)', marginBottom: '4px' }}>{item.name}</h4>
                    <p style={{ fontSize: '14px', color: 'var(--gold)', fontWeight: 'bold' }}>₹{item.price.toLocaleString('en-IN')}</p>
                    <div className="cart-qty-controls" style={{ marginTop: '8px' }}>
                      <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty - 1)}><Minus size={12} /></button>
                      <span className="qty-val">{item.qty}</span>
                      <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty + 1)}><Plus size={12} /></button>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>
                      ₹{(item.price * item.qty).toLocaleString('en-IN')}
                    </div>
                    <button onClick={() => onRemoveFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }} title="Remove item">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--bg-border)', padding: '24px' }}>
              <h3 style={{ fontFamily: 'Oswald', fontSize: '20px', color: 'var(--gold)', letterSpacing: '1px', marginBottom: '20px' }}>
                Order Summary
              </h3>

              {/* Promo Coupon Form */}
              <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="Promo Code (e.g. VANSH20)"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  style={{ flex: 1, background: 'var(--bg-dark)', border: '1px solid var(--bg-border)', padding: '10px 14px', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '13px' }}
                />
                <button type="submit" className="btn-ghost" style={{ padding: '10px 16px', fontSize: '12px' }}>
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div style={{ background: 'rgba(39,174,96,0.1)', border: '1px solid #27ae60', padding: '8px 12px', borderRadius: '8px', color: '#27ae60', fontSize: '12px', marginBottom: '16px' }}>
                  ✓ Code VANSH20 applied (-20%)
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', borderBottom: '1px solid var(--bg-border)', paddingBottom: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#27ae60' }}>
                    <span>Promo Discount (20%)</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Estimated Shipping</span>
                  <span>{shippingFee === 0 ? <strong style={{ color: '#27ae60' }}>FREE</strong> : `₹${shippingFee}`}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '24px' }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--gold)' }}>₹{total.toLocaleString('en-IN')}</span>
              </div>

              <button className="btn-primary" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
                <ArrowRight size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', fontSize: '11px', color: 'var(--text-muted)' }}>
                <ShieldCheck size={14} style={{ color: '#27ae60' }} />
                <span>256-bit SSL Encrypted & Legal Compliance</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
