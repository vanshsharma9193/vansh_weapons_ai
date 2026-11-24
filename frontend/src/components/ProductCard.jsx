import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  isWishlisted
}) {
  const [imgError, setImgError] = useState(false);

  const getCategoryTag = (cat) => {
    const map = {
      knives: '🔪 Hunting Knives',
      bow: '🏹 Bows & Arrows',
      tactical: '⚡ Tactical Gear',
      selfdefense: '🛡️ Self-Defense',
      accessories: '🔧 Accessories'
    };
    return map[cat] || cat;
  };

  return (
    <div className="product-card" id={`product-${product.id}`}>
      <div className="product-image-wrapper" onClick={() => onQuickView(product)}>
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="product-emoji-fallback">{product.emoji}</span>
        )}

        {product.badge && (
          <span className={`product-badge ${product.badgeClass}`}>
            {product.badge}
          </span>
        )}

        <button
          className={`product-wishlist ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-label="Wishlist"
        >
          <Heart size={16} fill={isWishlisted ? '#e74c3c' : 'none'} color={isWishlisted ? '#e74c3c' : 'currentColor'} />
        </button>
      </div>

      <div className="product-info">
        <div className="product-category">{getCategoryTag(product.category)}</div>
        <h3 className="product-name" onClick={() => onQuickView(product)} style={{ cursor: 'pointer' }}>
          {product.name}
        </h3>

        <div className="product-rating">
          <div style={{ display: 'flex', color: 'var(--gold)', gap: '2px' }}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.floor(product.rating) ? 'var(--gold)' : 'none'}
                stroke="var(--gold)"
              />
            ))}
          </div>
          <span className="rating-count">({product.reviews})</span>
        </div>

        <div className="product-price">
          <span className="price-current">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="price-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          <span className="price-discount">{product.discount}% OFF</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="product-add-btn"
            onClick={() => onAddToCart(product)}
            id={`addBtn-${product.id}`}
          >
            <ShoppingBag size={15} />
            Add to Arsenal
          </button>
          <button
            className="product-add-btn"
            onClick={() => onQuickView(product)}
            title="Quick View"
            style={{ width: '40px', padding: 0, flexShrink: 0 }}
          >
            <Eye size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
