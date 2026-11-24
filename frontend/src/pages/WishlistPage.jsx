import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';

export default function WishlistPage({
  wishlist,
  onAddToCart,
  onToggleWishlist,
  onQuickView
}) {
  return (
    <div className="wishlist-page container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="section-header">
        <span className="section-tag">Saved Equipment</span>
        <h2 className="section-title">
          Your <span className="gold">Wishlist</span> ({wishlist.length})
        </h2>
      </div>

      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 20px', background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--bg-border)' }}>
          <Heart size={72} style={{ opacity: 0.3, color: '#e74c3c', margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '8px' }}>Your wishlist is empty</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Click the heart icon on any product in our arsenal to save it for later.</p>
          <Link to="/shop" className="btn-primary" style={{ display: 'inline-flex', width: 'auto' }}>
            Explore Weapons Arsenal
          </Link>
        </div>
      ) : (
        <div className="products-grid">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              isWishlisted={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
