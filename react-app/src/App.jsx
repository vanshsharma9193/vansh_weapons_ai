import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import ProductQuickViewModal from './components/ProductQuickViewModal';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import CategoriesSection from './components/CategoriesSection';
import ProductsSection from './components/ProductsSection';
import CtaBanner from './components/CtaBanner';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import NotificationToast from './components/NotificationToast';
import BackToTop from './components/BackToTop';

import { products } from './data/products';

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Drawers & Modals State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Active section for Navbar link indicator
  const [activeSection, setActiveSection] = useState('home');

  // Notification Toast State
  const [notification, setNotification] = useState({ text: '', visible: false });

  const showNotification = (msg) => {
    setNotification({ text: msg, visible: true });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Cart Handlers
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        showNotification(`${product.name} qty updated in Arsenal! 🛒`);
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      showNotification(`${product.name} added to Arsenal! ⚔️`);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, qty: newQty } : item))
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showNotification('Item removed from cart 🗑');
  };

  const handleCheckout = () => {
    showNotification('Proceeding to Secure Checkout... 🛒');
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showNotification(`${product.name} removed from Wishlist 💔`);
        return prev.filter((item) => item.id !== product.id);
      }
      showNotification(`${product.name} added to Wishlist! ❤️`);
      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
    showNotification('Removed from Wishlist');
  };

  const handleMoveToCart = (product) => {
    handleAddToCart(product);
    handleRemoveFromWishlist(product.id);
  };

  // Filtered Products Logic
  const filteredProducts = products.filter((p) => {
    const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectCategory = (catKey) => {
    setCurrentCategory(catKey);
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = () => {
    setIsSearchOpen(false);
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsCartOpen(false);
        setIsWishlistOpen(false);
        setQuickViewProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Section Observer for Nav Active States
  useEffect(() => {
    const sections = ['home', 'categories', 'products', 'about', 'testimonials', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <Preloader />
      <AnnouncementBar />

      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
        wishlistCount={wishlist.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        activeSection={activeSection}
        onCategorySelect={handleSelectCategory}
      />

      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveToCart}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlist.some((item) => item.id === quickViewProduct.id) : false}
      />

      <main>
        <Hero
          onShopNowClick={() => handleSelectCategory('all')}
          onBrowseCategoriesClick={() => {
            const el = document.getElementById('categories');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <TrustSection />

        <CategoriesSection onSelectCategory={handleSelectCategory} />

        <ProductsSection
          products={filteredProducts}
          currentCategory={currentCategory}
          onCategoryChange={(cat) => setCurrentCategory(cat)}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(p) => setQuickViewProduct(p)}
          wishlistIds={wishlist.map((item) => item.id)}
        />

        <CtaBanner onShopNowClick={() => handleSelectCategory('all')} />

        <AboutSection
          onExploreClick={() => {
            const el = document.getElementById('products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <TestimonialsSection />

        <ContactSection onShowNotification={showNotification} />
      </main>

      <Footer
        onCategorySelect={handleSelectCategory}
        onShowNotification={showNotification}
      />

      <NotificationToast message={notification.text} isVisible={notification.visible} />

      <BackToTop />
    </div>
  );
}
