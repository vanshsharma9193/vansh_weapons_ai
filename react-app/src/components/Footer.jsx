import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

export default function Footer({ onCategorySelect, onShowNotification }) {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      onShowNotification('✅ Subscribed! Welcome to the Vansh Weapons family!');
      setEmail('');
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="nav-logo" style={{ marginBottom: '16px' }}>
              <div className="logo-emblem">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" stroke="#c8a84b" strokeWidth="2" fill="none"/>
                  <text x="18" y="23" textAnchor="middle" fill="#c8a84b" fontSize="12" fontWeight="700" fontFamily="Oswald">V</text>
                </svg>
              </div>
              <div className="logo-text">
                <span className="logo-main">VANSH</span>
                <span className="logo-sub">WEAPONS</span>
              </div>
            </div>
            <p>
              India's most trusted legal weapons and tactical gear store since 2012. All products strictly comply with Indian law.
            </p>
            <div className="footer-badges">
              <span className="footer-badge">🛡️ Licensed Dealer</span>
              <span className="footer-badge">✅ Arms Act Compliant</span>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              <li><button onClick={() => scrollToSection('home')}>Home</button></li>
              <li><button onClick={() => scrollToSection('categories')}>Categories</button></li>
              <li><button onClick={() => scrollToSection('products')}>Shop</button></li>
              <li><button onClick={() => scrollToSection('about')}>About Us</button></li>
              <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Categories</h4>
            <ul>
              <li><button onClick={() => onCategorySelect('knives')}>Hunting Knives</button></li>
              <li><button onClick={() => onCategorySelect('bow')}>Bows & Arrows</button></li>
              <li><button onClick={() => onCategorySelect('tactical')}>Tactical Gear</button></li>
              <li><button onClick={() => onCategorySelect('selfdefense')}>Self-Defense</button></li>
              <li><button onClick={() => onCategorySelect('accessories')}>Accessories</button></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); onShowNotification('FAQs page ready!'); }}>FAQs</a></li>
              <li><a href="#shipping" onClick={(e) => { e.preventDefault(); onShowNotification('Shipping policy: 3-5 days Pan-India delivery'); }}>Shipping Policy</a></li>
              <li><a href="#returns" onClick={(e) => { e.preventDefault(); onShowNotification('Return Policy: 7-day easy returns on unused items'); }}>Return Policy</a></li>
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); onShowNotification('Privacy Policy updated'); }}>Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); onShowNotification('Terms & Conditions applied'); }}>Terms & Conditions</a></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Subscribe for exclusive deals and new arrivals.</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" aria-label="Subscribe">
                <ArrowRight size={18} />
              </button>
            </form>
            <p className="newsletter-disclaimer">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2026 Vansh Weapons. All Rights Reserved. | <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a> | <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Use</a></p>
          <p className="legal-notice">
            ⚠️ All weapons sold are legal under Indian law. Buyers must provide valid ID proof. Age verification required (18+). We do not sell restricted/banned weapons.
          </p>
        </div>
      </div>
    </footer>
  );
}
