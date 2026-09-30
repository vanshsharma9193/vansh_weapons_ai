import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';
import { products as fallbackProducts } from '../data/products';
import { SearchX, Filter, ArrowUpDown } from 'lucide-react';

export default function ShopPage({
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  wishlistIds
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [category, setCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortOption, setSortOption] = useState('default');
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadShopData() {
      setLoading(true);
      const data = await fetchProducts({ category, search: searchQuery, sort: sortOption });
      if (data) {
        setProductList(data);
      } else {
        // Fallback filter
        let res = [...fallbackProducts];
        if (category !== 'all') res = res.filter((p) => p.category === category);
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          res = res.filter((p) => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
        }
        if (sortOption === 'price-low') res.sort((a, b) => a.price - b.price);
        if (sortOption === 'price-high') res.sort((a, b) => b.price - a.price);
        if (sortOption === 'rating') res.sort((a, b) => b.rating - a.rating);
        setProductList(res);
      }
      setLoading(false);
    }
    loadShopData();
  }, [category, searchQuery, sortOption]);

  const handleCategoryChange = (catKey) => {
    setCategory(catKey);
    setSearchParams({ category: catKey, q: searchQuery });
  };

  const categories = [
    { key: 'all', label: 'All Gear' },
    { key: 'knives', label: '🔪 Knives' },
    { key: 'bow', label: '🏹 Bows' },
    { key: 'tactical', label: '⚡ Tactical' },
    { key: 'selfdefense', label: '🛡️ Self-Defense' },
    { key: 'accessories', label: '🔧 Accessories' }
  ];

  return (
    <div className="shop-page container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="section-header">
        <span className="section-tag">Full Catalog</span>
        <h2 className="section-title">
          Vansh Weapons <span className="gold">Arsenal</span>
        </h2>
        <p className="section-desc">
          100% Certified & Compliant Legal Weapons, Hunting Equipment & Outdoor Gear
        </p>
      </div>

      {/* Control Bar */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', background: 'var(--bg-card)', padding: '16px 24px', borderRadius: '16px', border: '1px solid var(--bg-border)' }}>
        {/* Category Tabs */}
        <div className="filter-bar" style={{ marginBottom: 0 }}>
          {categories.map((c) => (
            <button
              key={c.key}
              className={`filter-btn ${category === c.key ? 'active' : ''}`}
              onClick={() => handleCategoryChange(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowUpDown size={16} style={{ color: 'var(--gold)' }} />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{
              background: 'var(--bg-dark)',
              color: 'var(--text-primary)',
              border: '1px solid var(--bg-border)',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            <option value="default">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '64px', color: 'var(--gold)' }}>
          Loading products...
        </div>
      ) : productList.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 20px', color: 'var(--text-muted)' }}>
          <SearchX size={56} style={{ margin: '0 auto 16px', color: 'var(--gold)' }} />
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>No items found</p>
          <button className="btn-ghost" onClick={() => handleCategoryChange('all')} style={{ marginTop: '16px' }}>
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {productList.map((p) => (
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
  );
}
