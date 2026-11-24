import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CategoriesSection({ onSelectCategory }) {
  const categories = [
    {
      id: 'knives',
      bgClass: 'cat-bg-1',
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M8 40 L38 10 L42 14 L16 44 Z" fill="#c8a84b" opacity="0.8"/>
          <path d="M38 10 L44 8 L42 14 Z" fill="#f0d060"/>
          <rect x="5" y="38" width="8" height="5" rx="1" fill="#888" transform="rotate(-45 9 40.5)"/>
        </svg>
      ),
      title: 'Hunting Knives',
      desc: 'Premium blades for hunting & outdoor survival',
      count: '85+ Products'
    },
    {
      id: 'bow',
      bgClass: 'cat-bg-2',
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M8 40 Q20 30 12 8" stroke="#c8a84b" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M8 40 L8 8" stroke="#f0d060" strokeWidth="1.5"/>
          <path d="M26 24 L8 24" stroke="#c8a84b" strokeWidth="2"/>
          <path d="M38 20 L26 24 L38 28 L36 24 Z" fill="#c8a84b"/>
        </svg>
      ),
      title: 'Bows & Arrows',
      desc: 'Recurve, compound bows & archery equipment',
      count: '60+ Products'
    },
    {
      id: 'tactical',
      bgClass: 'cat-bg-3',
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="16" stroke="#c8a84b" strokeWidth="2.5" fill="none"/>
          <circle cx="24" cy="24" r="8" stroke="#c8a84b" strokeWidth="1.5" fill="none"/>
          <circle cx="24" cy="24" r="3" fill="#c8a84b"/>
          <line x1="24" y1="8" x2="24" y2="16" stroke="#c8a84b" strokeWidth="2"/>
          <line x1="24" y1="32" x2="24" y2="40" stroke="#c8a84b" strokeWidth="2"/>
          <line x1="8" y1="24" x2="16" y2="24" stroke="#c8a84b" strokeWidth="2"/>
          <line x1="32" y1="24" x2="40" y2="24" stroke="#c8a84b" strokeWidth="2"/>
        </svg>
      ),
      title: 'Tactical Gear',
      desc: 'Professional grade equipment for outdoor ops',
      count: '120+ Products'
    },
    {
      id: 'selfdefense',
      bgClass: 'cat-bg-4',
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 6 L38 12 L38 26 Q38 36 24 42 Q10 36 10 26 L10 12 Z" stroke="#c8a84b" strokeWidth="2.5" fill="none"/>
          <path d="M24 12 L32 16 L32 26 Q32 32 24 36 Q16 32 16 26 L16 16 Z" fill="#c8a84b" opacity="0.2"/>
          <text x="24" y="29" textAnchor="middle" fill="#c8a84b" fontSize="14" fontWeight="bold">✓</text>
        </svg>
      ),
      title: 'Self-Defense',
      desc: 'Pepper sprays, tasers & personal safety tools',
      count: '95+ Products'
    },
    {
      id: 'accessories',
      bgClass: 'cat-bg-5',
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="6" stroke="#c8a84b" strokeWidth="2.5" fill="none"/>
          <path d="M24 6 L24 14 M24 34 L24 42 M6 24 L14 24 M34 24 L42 24" stroke="#c8a84b" strokeWidth="3" strokeLinecap="round"/>
          <path d="M11 11 L17 17 M31 31 L37 37 M11 37 L17 31 M31 17 L37 11" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Accessories',
      desc: 'Holsters, sheaths, lights & tactical attachments',
      count: '200+ Products'
    }
  ];

  return (
    <section className="categories-section" id="categories">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Browse By Type</span>
          <h2 className="section-title">
            Our <span className="gold">Categories</span>
          </h2>
          <p className="section-desc">
            Explore our wide range of premium legal weapons and tactical equipment
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="category-card"
              onClick={() => onSelectCategory(cat.id)}
            >
              <div className={`cat-bg ${cat.bgClass}`}></div>
              <div className="cat-icon">{cat.icon}</div>
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
              <span className="cat-count">{cat.count}</span>
              <div className="cat-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
