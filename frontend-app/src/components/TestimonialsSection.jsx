import React, { useState, useEffect } from 'react';
import { testimonials } from '../data/testimonials';
import { ChevronLeft, ChevronRight, Star, CheckCircle } from 'lucide-react';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth > 960) return 3;
      if (window.innerWidth > 600) return 2;
    }
    return 1;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Customer Reviews</span>
          <h2 className="section-title">
            What Our <span className="gold">Customers</span> Say
          </h2>
        </div>

        <div className="testimonials-carousel">
          <button className="carousel-btn prev" onClick={handlePrev} aria-label="Previous review">
            <ChevronLeft size={24} />
          </button>

          <div className="testimonials-track-wrapper" style={{ overflow: 'hidden' }}>
            <div
              className="testimonials-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {testimonials.map((item) => (
                <div key={item.id} className="testimonial-card">
                  <div className="test-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        style={{ display: 'inline', marginRight: '2px' }}
                        fill={i < item.rating ? 'var(--gold)' : 'none'}
                        stroke="var(--gold)"
                      />
                    ))}
                  </div>
                  <p className="test-text">"{item.text}"</p>
                  <div className="test-author">
                    <div className="test-avatar">{item.name[0]}</div>
                    <div>
                      <div className="test-name">{item.name}</div>
                      <div className="test-location">📍 {item.location}</div>
                      {item.verified && (
                        <div className="test-verified">
                          <CheckCircle size={10} style={{ display: 'inline', marginRight: '2px' }} />
                          VERIFIED PURCHASE
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-btn next" onClick={handleNext} aria-label="Next review">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="carousel-dots">
          {[...Array(maxIndex + 1)].map((_, i) => (
            <div
              key={i}
              className={`dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
