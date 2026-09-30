import React from 'react';
import { Tag } from 'lucide-react';

export default function CtaBanner({ onShopNowClick }) {
  return (
    <section className="cta-banner">
      <div className="cta-bg"></div>
      <div className="container cta-content">
        <div className="cta-text">
          <span className="section-tag">
            <Tag size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
            Limited Time Offer
          </span>
          <h2>
            Get <span className="gold">20% OFF</span> Your First Order
          </h2>
          <p>
            Use code <strong>VANSH20</strong> at checkout. Valid on all products above ₹2,000.
          </p>
        </div>

        <div className="cta-action">
          <button className="btn-primary" onClick={onShopNowClick}>
            Shop Now & Save
          </button>
          <p className="cta-disclaimer">*T&C Apply. Legal products only. Age 18+ required.</p>
        </div>
      </div>
    </section>
  );
}
