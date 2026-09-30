import React from 'react';
import { useNavigate } from 'react-router-dom';
import AboutSection from '../components/AboutSection';
import TrustSection from '../components/TrustSection';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-page" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <AboutSection onExploreClick={() => navigate('/shop')} />
      <TrustSection />
    </div>
  );
}
