import React from 'react';
import ContactSection from '../components/ContactSection';

export default function ContactPage({ onShowNotification }) {
  return (
    <div className="contact-page" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <ContactSection onShowNotification={onShowNotification} />
    </div>
  );
}
