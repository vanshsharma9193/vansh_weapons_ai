import React, { useEffect, useState } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero({ onShopNowClick, onBrowseCategoriesClick }) {
  const [stats, setStats] = useState({ products: 0, customers: 0, experience: 0 });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        products: Math.floor(500 * progress),
        customers: Math.floor(15000 * progress),
        experience: Math.floor(12 * progress)
      });

      if (step >= steps) {
        setStats({ products: 500, customers: 15000, experience: 12 });
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-particle"></div>
        <div className="hero-grid"></div>
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          <span>100% Legal & Certified</span>
        </div>

        <h1 className="hero-title">
          <span className="hero-title-sub">WELCOME TO</span>
          <span className="hero-title-main">
            VANSH<br />
            <em>WEAPONS</em>
          </span>
        </h1>

        <p className="hero-desc">
          India's premier destination for premium legal weapons, tactical gear, and self-defense tools. Crafted for warriors. Built to last.
        </p>

        <div className="hero-cta">
          <button className="btn-primary" onClick={onShopNowClick}>
            <span>Shop Now</span>
            <ArrowRight size={18} />
          </button>
          <button className="btn-ghost" onClick={onBrowseCategoriesClick}>
            Browse Categories
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">{stats.products.toLocaleString('en-IN')}</span>
            <span>+</span>
            <span className="stat-label">Products</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-num">{stats.customers.toLocaleString('en-IN')}</span>
            <span>+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-num">{stats.experience.toLocaleString('en-IN')}</span>
            <span>+</span>
            <span className="stat-label">Years Experience</span>
          </div>
        </div>
      </div>

      {/* Hero Visual Emblem */}
      <div className="hero-visual">
        <div className="hero-ring ring-1"></div>
        <div className="hero-ring ring-2"></div>
        <div className="hero-ring ring-3"></div>
        <div className="hero-emblem">
          <svg width="220" height="220" viewBox="0 0 220 220">
            <defs>
              <linearGradient id="goldGradHero" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f0d060"/>
                <stop offset="50%" stopColor="#c8a84b"/>
                <stop offset="100%" stopColor="#8b6914"/>
              </linearGradient>
            </defs>
            {/* Shield */}
            <path d="M110 20 L190 55 L190 120 Q190 170 110 200 Q30 170 30 120 L30 55 Z" fill="none" stroke="url(#goldGradHero)" strokeWidth="2.5"/>
            <path d="M110 35 L175 65 L175 120 Q175 160 110 185 Q45 160 45 120 L45 65 Z" fill="#c8a84b" opacity="0.08"/>
            {/* Crossed swords */}
            <line x1="75" y1="75" x2="145" y2="145" stroke="url(#goldGradHero)" strokeWidth="3" strokeLinecap="round"/>
            <line x1="145" y1="75" x2="75" y2="145" stroke="url(#goldGradHero)" strokeWidth="3" strokeLinecap="round"/>
            {/* Sword guards */}
            <line x1="92" y1="92" x2="75" y2="75" stroke="url(#goldGradHero)" strokeWidth="4"/>
            <line x1="95" y1="79" x2="79" y2="95" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round"/>
            <line x1="128" y1="92" x2="145" y2="75" stroke="url(#goldGradHero)" strokeWidth="4"/>
            <line x1="125" y1="79" x2="141" y2="95" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round"/>
            {/* Star */}
            <polygon points="110,95 113,105 124,105 115,111 118,121 110,115 102,121 105,111 96,105 107,105" fill="url(#goldGradHero)"/>
            {/* Text */}
            <text x="110" y="168" textAnchor="middle" fill="#c8a84b" fontSize="11" fontFamily="Oswald" letterSpacing="4">VANSH WEAPONS</text>
            {/* Dots decoration */}
            <circle cx="110" cy="180" r="2" fill="#c8a84b"/>
            <circle cx="100" cy="183" r="1.5" fill="#c8a84b" opacity="0.6"/>
            <circle cx="120" cy="183" r="1.5" fill="#c8a84b" opacity="0.6"/>
          </svg>
        </div>
      </div>

      <div className="hero-scroll">
        <button onClick={onBrowseCategoriesClick}>
          <span>Scroll</span>
          <div className="scroll-line">
            <div className="scroll-dot"></div>
          </div>
        </button>
      </div>
    </section>
  );
}
