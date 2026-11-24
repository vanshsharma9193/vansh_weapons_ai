import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';

export default function Navbar({
  cartCount,
  wishlistCount,
  onOpenSearch,
  onOpenCart,
  onOpenWishlist
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleCategorySelect = (catKey) => {
    setMobileMenuOpen(false);
    navigate(`/shop?category=${catKey}`);
  };

  return (
    <header id="navbar" className={isScrolled ? 'scrolled' : ''}>
      <nav className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={() => setMobileMenuOpen(false)}>
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
        </Link>

        {/* Nav Links */}
        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>

          <li className="nav-dropdown">
            <NavLink
              to="/categories"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Categories <span className="arrow">▾</span>
            </NavLink>
            <ul className="dropdown-menu">
              <li>
                <button onClick={() => handleCategorySelect('knives')}>🔪 Hunting Knives</button>
              </li>
              <li>
                <button onClick={() => handleCategorySelect('bow')}>🏹 Bows & Arrows</button>
              </li>
              <li>
                <button onClick={() => handleCategorySelect('tactical')}>⚡ Tactical Gear</button>
              </li>
              <li>
                <button onClick={() => handleCategorySelect('selfdefense')}>🛡️ Self-Defense</button>
              </li>
              <li>
                <button onClick={() => handleCategorySelect('accessories')}>🔧 Accessories</button>
              </li>
            </ul>
          </li>

          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Nav Actions */}
        <div className="nav-actions">
          <button className="nav-icon-btn" onClick={onOpenSearch} title="Search (Ctrl+K)">
            <Search size={20} />
          </button>
          <Link to="/wishlist" className="nav-icon-btn" title="Wishlist">
            <Heart size={20} />
            {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
          </Link>
          <Link to="/cart" className="nav-icon-btn cart-btn" title="Your Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
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
