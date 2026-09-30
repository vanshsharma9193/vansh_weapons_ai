import React from 'react';
import { Check, Award, Shield, ArrowRight } from 'lucide-react';

export default function AboutSection({ onExploreClick }) {
  return (
    <section className="about-section" id="about">
      <div className="container about-grid">
        <div className="about-visual">
          <div className="about-card-main">
            <div className="about-emblem-large">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <defs>
                  <linearGradient id="goldGradAbout" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f0d060"/>
                    <stop offset="100%" stopColor="#8b6914"/>
                  </linearGradient>
                </defs>
                <polygon points="70,10 130,40 130,100 70,130 10,100 10,40" fill="none" stroke="url(#goldGradAbout)" strokeWidth="2"/>
                <polygon points="70,22 118,48 118,92 70,118 22,92 22,48" fill="#c8a84b" opacity="0.07"/>
                <text x="70" y="80" textAnchor="middle" fill="url(#goldGradAbout)" fontSize="40" fontFamily="Oswald" fontWeight="700">VW</text>
                <text x="70" y="100" textAnchor="middle" fill="#c8a84b" fontSize="8" letterSpacing="3" fontFamily="Inter">EST. 2012</text>
              </svg>
            </div>
            <div className="about-float-badge">
              <span className="badge-num">12+</span>
              <span className="badge-label">Years of Trust</span>
            </div>
          </div>

          <div className="about-card-side">
            <div className="about-mini-stat">
              <span className="gold">🏆</span>
              <div>
                <strong>Award-Winning</strong>
                <p>Best Tactical Store 2023</p>
              </div>
            </div>
            <div className="about-mini-stat">
              <span className="gold">📜</span>
              <div>
                <strong>Fully Licensed</strong>
                <p>Government approved dealer</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-text">
          <span className="section-tag">Our Story</span>
          <h2 className="section-title">
            India's Most <span className="gold">Trusted</span> Legal Weapons Store
          </h2>
          <p>
            Founded in 2012, Vansh Weapons has been at the forefront of India's legal weapons and tactical gear industry. We believe that every individual has the right to protect themselves and their loved ones through legal means.
          </p>
          <p>
            With over <strong>15,000 satisfied customers</strong> across India, we pride ourselves on offering only the highest quality products from certified manufacturers, ensuring every purchase is both legal and reliable.
          </p>

          <div className="about-features">
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div>
                <h4>Legally Compliant</h4>
                <p>All products verified under Indian Arms Act 1959</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div>
                <h4>Expert Consultation</h4>
                <p>Our team guides you to the right product for your needs</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div>
                <h4>Authentic Products</h4>
                <p>Direct partnerships with certified manufacturers</p>
              </div>
            </div>
          </div>

          <button className="btn-primary" onClick={onExploreClick} style={{ width: 'auto' }}>
            Explore Our Products
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
