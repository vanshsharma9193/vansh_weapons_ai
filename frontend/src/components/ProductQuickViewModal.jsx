import React from 'react';
import { X, Star, ShieldCheck, ShoppingBag, Heart } from 'lucide-react';

export default function ProductQuickViewModal({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close Modal">
          <X size={20} />
        </button>

        <div className="modal-image-col">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
            }}
          />
          <span className="product-emoji-fallback" style={{ display: 'none', fontSize: '100px' }}>
            {product.emoji}
          </span>
          {product.badge && (
            <span className={`product-badge ${product.badgeClass}`} style={{ top: '20px', left: '20px' }}>
              {product.badge}
            </span>
          )}
        </div>

        <div className="modal-info-col">
          <div>
            <span className="product-category">{product.category}</span>
            <h2 className="section-title" style={{ fontSize: '26px', margin: '8px 0' }}>
              {product.name}
            </h2>

            <div className="product-rating" style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', color: 'var(--gold)', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating) ? 'var(--gold)' : 'none'}
                    stroke="var(--gold)"
                  />
                ))}
              </div>
              <span className="rating-count">({product.reviews} reviews)</span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px', lineHeight: '1.6' }}>
              {product.desc}
            </p>

            {/* Specifications */}
            {product.specs && (
              <div style={{ background: 'var(--bg-dark)', padding: '16px', borderRadius: '10px', marginBottom: '20px', border: '1px solid var(--bg-border)' }}>
                <h4 style={{ fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>
                  TECHNICAL SPECIFICATIONS
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key}>
                      <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}:</span>{' '}
                      <strong style={{ color: 'var(--text-primary)' }}>{val}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="product-price" style={{ marginBottom: '24px' }}>
              <span className="price-current" style={{ fontSize: '28px' }}>₹{product.price.toLocaleString('en-IN')}</span>
              <span className="price-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              <span className="price-discount">{product.discount}% OFF</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-primary" onClick={() => { onAddToCart(product); onClose(); }}>
              <ShoppingBag size={18} />
              Add to Arsenal
            </button>
            <button
              className="btn-ghost"
              onClick={() => onToggleWishlist(product)}
              style={{ color: isWishlisted ? '#e74c3c' : 'inherit', borderColor: isWishlisted ? '#e74c3c' : undefined }}
              title="Save to Wishlist"
            >
              <Heart size={18} fill={isWishlisted ? '#e74c3c' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
