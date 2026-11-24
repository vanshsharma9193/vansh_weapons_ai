import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart
}) {
  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Saved Gear ({wishlist.length})</h3>
          <button onClick={onClose} aria-label="Close Wishlist">
            <X size={20} />
          </button>
        </div>

        <div className="cart-items">
          {wishlist.length === 0 ? (
            <div className="empty-cart">
              <Heart size={56} style={{ opacity: 0.3, color: '#e74c3c' }} />
              <p>Your wishlist is empty</p>
              <span>Click the heart icon on any product to save it for later</span>
            </div>
          ) : (
            wishlist.map((item) => (
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
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    className="cart-item-remove"
                    onClick={() => onMoveToCart(item)}
                    title="Move to Cart"
                    style={{ color: 'var(--gold)' }}
                  >
                    <ShoppingBag size={16} />
                  </button>
                  <button
                    className="cart-item-remove"
                    onClick={() => onRemoveFromWishlist(item.id)}
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}
