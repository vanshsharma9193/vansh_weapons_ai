import React from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveFromCart,
  onCheckout
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const freeShippingThreshold = 5000;
  const freeShippingProgress = Math.min(100, (total / freeShippingThreshold) * 100);

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Arsenal ({cart.reduce((s, i) => s + i.qty, 0)})</h3>
          <button onClick={onClose} aria-label="Close Cart">
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        {cart.length > 0 && (
          <div style={{ padding: '12px 20px', background: 'var(--bg-dark)', borderBottom: '1px solid var(--bg-border)' }}>
            <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--text-secondary)' }}>
              <span>
                {total >= freeShippingThreshold ? (
                  <strong style={{ color: '#27ae60' }}>🎉 You qualify for FREE Shipping!</strong>
                ) : (
                  <span>Add <strong>₹{(freeShippingThreshold - total).toLocaleString('en-IN')}</strong> more for FREE Shipping</span>
                )}
              </span>
            </div>
            <div style={{ height: '4px', background: 'var(--bg-border)', borderRadius: '2px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${freeShippingProgress}%`,
                  background: 'linear-gradient(90deg, var(--gold-dark), var(--gold-light))',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>
        )}

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={56} style={{ opacity: 0.3, color: 'var(--gold)' }} />
              <p>Your cart is empty</p>
              <span>Add some gear to your arsenal to get started</span>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-icon">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="cart-item-emoji-fallback" style={{ display: 'none' }}>
                    {item.emoji}
                  </span>
                </div>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price.toLocaleString('en-IN')}</p>
                  <div className="cart-qty-controls">
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty - 1)}>
                      <Minus size={12} />
                    </button>
                    <span className="qty-val">{item.qty}</span>
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty + 1)}>
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => onRemoveFromCart(item.id)}
                  title="Remove from cart"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total Amount:</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <button className="btn-primary" onClick={onCheckout}>
              Proceed to Checkout 🛒
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
