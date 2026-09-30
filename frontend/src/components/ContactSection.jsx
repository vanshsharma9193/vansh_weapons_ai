import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactSection({ onShowNotification }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      onShowNotification("Message sent successfully! We'll get back to you soon. 📬");

      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 2500);
    }, 1500);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container contact-grid">
        <div className="contact-info">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">
            Contact <span className="gold">Us</span>
          </h2>
          <p>
            Have questions about our products or legalities? Our expert team is here to help you make the right choice.
          </p>

          <div className="contact-items">
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <strong>Our Store</strong>
                <p>123, Arms Market, Sector 14, New Delhi – 110001</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <strong>Call Us</strong>
                <p>+91 98765 43210 | +91 11 2345 6789</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div>
                <strong>Email</strong>
                <p>info@vanshweapons.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">🕐</div>
              <div>
                <strong>Store Hours</strong>
                <p>Mon–Sat: 10am – 8pm | Sun: 11am – 5pm</p>
              </div>
            </div>
          </div>

          <div className="social-links">
            <a href="#facebook" onClick={(e) => e.preventDefault()} className="social-btn">Facebook</a>
            <a href="#instagram" onClick={(e) => e.preventDefault()} className="social-btn">Instagram</a>
            <a href="#youtube" onClick={(e) => e.preventDefault()} className="social-btn">YouTube</a>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send a Message</h3>
            <div className="form-group">
              <label htmlFor="contactName">Full Name *</label>
              <input
                type="text"
                id="contactName"
                placeholder="Vansh Kumar"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactEmail">Email *</label>
                <input
                  type="email"
                  id="contactEmail"
                  placeholder="you@email.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactPhone">Phone</label>
                <input
                  type="tel"
                  id="contactPhone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contactSubject">Subject *</label>
              <select
                id="contactSubject"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              >
                <option value="">Select a subject</option>
                <option value="Product Inquiry">Product Inquiry</option>
                <option value="Order Status">Order Status</option>
                <option value="Legal Compliance">Legal Compliance</option>
                <option value="Bulk Purchase">Bulk Purchase</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="contactMessage">Message *</label>
              <textarea
                id="contactMessage"
                rows={4}
                placeholder="Your message here..."
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={submitting || submitted}
              style={{
                background: submitted
                  ? 'linear-gradient(135deg, #1a6e3a, #27ae60)'
                  : undefined
              }}
            >
              <span>
                {submitting ? 'Sending...' : submitted ? 'Message Sent! ✓' : 'Send Message'}
              </span>
              {!submitting && !submitted && <Send size={18} />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
