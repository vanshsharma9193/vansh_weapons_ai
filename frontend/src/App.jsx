import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout & Global Components
import Preloader from './components/Preloader';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CartDrawer from './components/CartDrawer';
import ProductQuickViewModal from './components/ProductQuickViewModal';
import Footer from './components/Footer';
import NotificationToast from './components/NotificationToast';
import BackToTop from './components/BackToTop';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import WishlistPage from './pages/WishlistPage';

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('vw_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('vw_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal / Drawer States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Notification Toast State
  const [notification, setNotification] = useState({ text: '', visible: false });

  useEffect(() => {
    try {
      localStorage.setItem('vw_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('vw_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const showNotification = (msg) => {
    setNotification({ text: msg, visible: true });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Cart Management
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

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Management
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

  const wishlistIds = wishlist.map((item) => item.id);

  return (
    <Router>
      <div className="app">
        <Preloader />
        <AnnouncementBar />

        <Navbar
          cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
          wishlistCount={wishlist.length}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => {}}
        />

        <SearchBar
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchSubmit={() => {
            setIsSearchOpen(false);
            window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`;
          }}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onUpdateQty={handleUpdateQty}
          onRemoveFromCart={handleRemoveFromCart}
          onCheckout={() => {
            setIsCartOpen(false);
            window.location.href = '/checkout';
          }}
        />

        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        />

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  wishlistIds={wishlistIds}
                  onShowNotification={showNotification}
                />
              }
            />

            <Route
              path="/shop"
              element={
                <ShopPage
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  wishlistIds={wishlistIds}
                />
              }
            />

            <Route
              path="/product/:id"
              element={
                <ProductDetailPage
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  wishlistIds={wishlistIds}
                />
              }
            />

            <Route path="/categories" element={<CategoriesPage />} />

            <Route path="/about" element={<AboutPage />} />

            <Route
              path="/contact"
              element={<ContactPage onShowNotification={showNotification} />}
            />

            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  onUpdateQty={handleUpdateQty}
                  onRemoveFromCart={handleRemoveFromCart}
                  onShowNotification={showNotification}
                />
              }
            />

            <Route
              path="/checkout"
              element={
                <CheckoutPage
                  cart={cart}
                  onClearCart={handleClearCart}
                  onShowNotification={showNotification}
                />
              }
            />

            <Route path="/order-success" element={<OrderSuccessPage />} />

            <Route
              path="/wishlist"
              element={
                <WishlistPage
                  wishlist={wishlist}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              }
            />
          </Routes>
        </main>

        <Footer
          onCategorySelect={(catKey) => {
            window.location.href = `/shop?category=${catKey}`;
          }}
          onShowNotification={showNotification}
        />

        <NotificationToast message={notification.text} isVisible={notification.visible} />

        <BackToTop />
      </div>
    </Router>
  );
}
