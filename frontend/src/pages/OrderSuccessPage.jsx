import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, ShieldCheck, Package, Truck, Home } from 'lucide-react';

export default function OrderSuccessPage() {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="order-success-page container" style={{ paddingTop: '140px', paddingBottom: '80px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ background: 'var(--bg-card)', padding: '48px', borderRadius: '24px', border: '1px solid var(--gold)', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.6), var(--shadow-gold)' }}>
        <CheckCircle size={64} style={{ color: '#27ae60', margin: '0 auto 16px' }} />
        <span className="section-tag">Order Confirmed</span>
        <h1 className="section-title" style={{ fontSize: '36px', margin: '8px 0 16px' }}>
          Thank You For Your <span className="gold">Purchase!</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '24px' }}>
          Your order has been verified under the Indian Arms Act 1959 regulations and is being prepared for dispatch.
        </p>

        {order && (
          <div style={{ background: 'var(--bg-dark)', padding: '24px', borderRadius: '16px', border: '1px solid var(--bg-border)', textAlign: 'left', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-border)', paddingBottom: '12px', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Order ID</span>
                <div style={{ fontFamily: 'Oswald', fontSize: '18px', color: 'var(--gold)' }}>{order.orderId}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Payment Method</span>
                <div style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{order.paymentMethod}</div>
              </div>
            </div>

            <h4 style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '12px' }}>Items Summary</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {order.items?.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <span>{item.name} × {item.qty}</span>
                  <strong>₹{(item.price * item.qty).toLocaleString('en-IN')}</strong>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--bg-border)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold' }}>
              <span>Total Paid</span>
              <span style={{ color: 'var(--gold)' }}>₹{order.totalAmount?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/" className="btn-primary" style={{ display: 'inline-flex', width: 'auto' }}>
            <Home size={18} />
            Back to Home
          </Link>
          <Link to="/shop" className="btn-ghost" style={{ display: 'inline-flex', width: 'auto' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
