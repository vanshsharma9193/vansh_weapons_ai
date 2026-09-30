import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';

export default function Navbar({
  cartCount,
  wishlistCount,
  onOpenSearch,
  onOpenCart,
  onOpenWishlist,
  activeSection,
  onCategorySelect
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (catKey) => {
    setMobileMenuOpen(false);
    onCategorySelect(catKey);
  };

  return (
    <header id="navbar" className={isScrolled ? 'scrolled' : ''}>
      <nav className="nav-container">
        {/* Logo */}
        <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="nav-logo">
          <div className="logo-emblem">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" stroke="#c8a84b" strokeWidth="2" fill="none"/>
              <polygon points="18,7 29,13 29,23 18,29 7,23 7,13" fill="#c8a84b" opacity="0.15"/>
              <text x="18" y="23" textAnchor="middle" fill="#c8a84b" fontSize="12" fontWeight="700" fontFamily="Oswald">V</text>
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-main">VANSH</span>
            <span className="logo-sub">WEAPONS</span>
          </div>
        </a>

        {/* Nav Links */}
        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <li>
            <button
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => scrollToSection('home')}
            >
              Home
            </button>
          </li>
          <li className="nav-dropdown">
            <button className="nav-link">
              Categories <span className="arrow">▾</span>
            </button>
            <ul className="dropdown-menu">
              <li>
                <button onClick={() => handleCategoryClick('knives')}>🔪 Hunting Knives</button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('bow')}>🏹 Bows & Arrows</button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('tactical')}>⚡ Tactical Gear</button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('selfdefense')}>🛡️ Self-Defense</button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('accessories')}>🔧 Accessories</button>
              </li>
            </ul>
          </li>
          <li>
            <button
              className={`nav-link ${activeSection === 'products' ? 'active' : ''}`}
              onClick={() => scrollToSection('products')}
            >
              Shop
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => scrollToSection('about')}
            >
              About
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeSection === 'testimonials' ? 'active' : ''}`}
              onClick={() => scrollToSection('testimonials')}
            >
              Reviews
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </button>
          </li>
        </ul>

        {/* Nav Actions */}
        <div className="nav-actions">
          <button className="nav-icon-btn" onClick={onOpenSearch} title="Search (Ctrl+K)">
            <Search size={20} />
          </button>
          <button className="nav-icon-btn" onClick={onOpenWishlist} title="Wishlist">
            <Heart size={20} />
            {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
          </button>
          <button className="nav-icon-btn cart-btn" onClick={onOpenCart} title="Your Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
