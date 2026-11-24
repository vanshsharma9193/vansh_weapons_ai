import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import TrustSection from '../components/TrustSection';
import CategoriesSection from '../components/CategoriesSection';
import ProductsSection from '../components/ProductsSection';
import CtaBanner from '../components/CtaBanner';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import { fetchProducts } from '../services/api';
import { products as fallbackProducts } from '../data/products';

export default function HomePage({
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  wishlistIds,
  onShowNotification
}) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const data = await fetchProducts();
      if (data && data.length > 0) {
        setFeaturedProducts(data);
      } else {
        setFeaturedProducts(fallbackProducts);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSelectCategory = (catKey) => {
    navigate(`/shop?category=${catKey}`);
  };

  return (
    <div className="home-page">
      <Hero
        onShopNowClick={() => navigate('/shop')}
        onBrowseCategoriesClick={() => navigate('/categories')}
      />

      <TrustSection />

      <CategoriesSection onSelectCategory={handleSelectCategory} />

      <ProductsSection
        products={featuredProducts.slice(0, 8)}
        currentCategory="all"
        onCategoryChange={handleSelectCategory}
        searchQuery=""
        onClearSearch={() => {}}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        onQuickView={onQuickView}
        wishlistIds={wishlistIds}
      />

      <CtaBanner onShopNowClick={() => navigate('/shop')} />

      <AboutSection onExploreClick={() => navigate('/shop')} />

      <TestimonialsSection />

      <ContactSection onShowNotification={onShowNotification} />
    </div>
  );
}
