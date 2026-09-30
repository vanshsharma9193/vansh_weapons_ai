import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { products as fallbackProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Star, ShieldCheck, ShoppingBag, Heart, ArrowLeft, Truck, Award } from 'lucide-react';

export default function ProductDetailPage({
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  wishlistIds
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await fetchProductById(id);
      if (res && res.data) {
        setProduct(res.data);
        setRelated(res.related || []);
      } else {
        const found = fallbackProducts.find((p) => p.id === parseInt(id, 10));
        setProduct(found || fallbackProducts[0]);
        setRelated(fallbackProducts.filter((p) => p.id !== parseInt(id, 10)).slice(0, 4));
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '150px', paddingBottom: '100px', textAlign: 'center', color: 'var(--gold)' }}>
        Loading weapon specifications...
      </div>
    );
  }

  if (!product) return null;

  const isWishlisted = wishlistIds.includes(product.id);

  return (
    <div className="product-detail-page container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <button className="btn-ghost" onClick={() => navigate(-1)} style={{ marginBottom: '24px', padding: '8px 16px', fontSize: '13px' }}>
        <ArrowLeft size={16} /> Back to Catalog
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '48px', marginBottom: '80px' }}>
        {/* Visual Box */}
        <div style={{ background: 'linear-gradient(145deg, #0e0e12, #1a1a22)', borderRadius: '20px', padding: '40px', border: '1px solid var(--bg-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ maxHeight: '360px', width: '100%', objectFit: 'contain' }}
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
            }}
          />
          <span className="product-emoji-fallback" style={{ display: 'none', fontSize: '120px' }}>
            {product.emoji}
          </span>
          {product.badge && (
            <span className={`product-badge ${product.badgeClass}`} style={{ top: '20px', left: '20px', fontSize: '12px', padding: '6px 14px' }}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Info Box */}
        <div>
          <span className="product-category" style={{ fontSize: '12px' }}>{product.category}</span>
          <h1 className="section-title" style={{ fontSize: '36px', textAlign: 'left', margin: '8px 0 16px' }}>
            {product.name}
          </h1>

          <div className="product-rating" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', color: 'var(--gold)', gap: '4px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.floor(product.rating) ? 'var(--gold)' : 'none'} stroke="var(--gold)" />
              ))}
            </div>
            <span className="rating-count" style={{ fontSize: '14px' }}>({product.reviews} customer reviews)</span>
          </div>

          <div className="product-price" style={{ marginBottom: '24px' }}>
            <span className="price-current" style={{ fontSize: '32px' }}>₹{product.price.toLocaleString('en-IN')}</span>
            <span className="price-original" style={{ fontSize: '18px' }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
            <span className="price-discount" style={{ fontSize: '13px' }}>{product.discount}% OFF</span>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.7', marginBottom: '24px' }}>
            {product.desc}
          </p>

          {/* Specs List */}
          {product.specs && (
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--bg-border)', marginBottom: '28px' }}>
              <h4 style={{ color: 'var(--gold)', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
                TECHNICAL SPECIFICATIONS
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k}>
                    <span style={{ color: 'var(--text-muted)' }}>{k.replace(/([A-Z])/g, ' $1')}: </span>
                    <strong style={{ color: 'var(--text-primary)' }}>{v}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Actions */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--bg-border)', borderRadius: '10px', padding: '4px' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ padding: '8px 14px', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '16px' }}>-</button>
              <span style={{ padding: '0 12px', fontWeight: 'bold' }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ padding: '8px 14px', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '16px' }}>+</button>
            </div>

            <button
              className="btn-primary"
              onClick={() => {
                for (let i = 0; i < qty; i++) onAddToCart(product);
              }}
              style={{ flex: 1 }}
            >
              <ShoppingBag size={18} />
              Add to Arsenal
            </button>

            <button
              className="btn-ghost"
              onClick={() => onToggleWishlist(product)}
              style={{ padding: '13px', color: isWishlisted ? '#e74c3c' : 'inherit' }}
              title="Save to Wishlist"
            >
              <Heart size={20} fill={isWishlisted ? '#e74c3c' : 'none'} />
            </button>
          </div>

          {/* Guarantees */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid var(--bg-border)', paddingTop: '20px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} style={{ color: '#27ae60' }} />
              <span>100% Legal & Arms Act Compliant</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={18} style={{ color: 'var(--gold)' }} />
              <span>Free Express Shipping &gt; ₹5,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h3 className="section-title" style={{ fontSize: '28px', textAlign: 'left', marginBottom: '24px' }}>
            Recommended <span className="gold">Gear</span>
          </h3>
          <div className="products-grid">
            {related.map((p) => (
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
        </div>
      )}
    </div>
  );
}
