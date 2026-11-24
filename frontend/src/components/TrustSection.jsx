import React from 'react';
import { ShieldCheck, Truck, Lock, Award } from 'lucide-react';

export default function TrustSection() {
  const items = [
    {
      icon: <ShieldCheck size={32} style={{ color: 'var(--gold)' }} />,
      title: '100% Legal',
      desc: 'All products comply with Indian Arms Act & local regulations'
    },
    {
      icon: <Truck size={32} style={{ color: 'var(--gold)' }} />,
      title: 'Fast Shipping',
      desc: 'Pan-India delivery within 3-5 business days'
    },
    {
      icon: <Lock size={32} style={{ color: 'var(--gold)' }} />,
      title: 'Secure Payments',
      desc: '256-bit SSL encrypted payment gateway'
    },
    {
      icon: <Award size={32} style={{ color: 'var(--gold)' }} />,
      title: 'Quality Guarantee',
      desc: 'Premium grade materials with 1-year warranty'
    }
  ];

  return (
    <section className="trust-section">
      <div className="container">
        <div className="trust-grid">
          {items.map((item, i) => (
            <div key={i} className="trust-item">
              <div className="trust-icon">{item.icon}</div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
