import React from 'react';
import ProductCard from './ProductCard';
import { SearchX } from 'lucide-react';

export default function ProductsSection({
  products,
  currentCategory,
  onCategoryChange,
  searchQuery,
  onClearSearch,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  wishlistIds
}) {
  const categories = [
    { key: 'all', label: 'All' },
    { key: 'knives', label: 'Knives' },
    { key: 'bow', label: 'Bows' },
    { key: 'tactical', label: 'Tactical' },
    { key: 'selfdefense', label: 'Self-Defense' },
    { key: 'accessories', label: 'Accessories' }
  ];

  return (
    <section className="products-section" id="products">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Our Arsenal</span>
          <h2 className="section-title">
            Featured <span className="gold">Products</span>
          </h2>
          <p className="section-desc">
            Handpicked premium weapons and gear for the discerning buyer
          </p>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`filter-btn ${currentCategory === cat.key ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search status header */}
        {searchQuery && (
          <div style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-secondary)' }}>
            <span>Showing search results for "<strong>{searchQuery}</strong>"</span>{' '}
            <button
              onClick={onClearSearch}
              style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', textDecoration: 'underline', marginLeft: '8px' }}
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Product Grid */}
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 20px', color: 'var(--text-muted)' }}>
            <SearchX size={56} style={{ margin: '0 auto 16px', color: 'var(--gold)' }} />
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>No products found matching your filter</p>
            <button className="btn-ghost" onClick={() => { onCategoryChange('all'); onClearSearch(); }} style={{ marginTop: '16px' }}>
              View All Products
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                isWishlisted={wishlistIds.includes(p.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
