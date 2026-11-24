import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="preloader" className={!loading ? 'hidden' : ''}>
      <div className="preloader-content">
        <div className="preloader-logo">VW</div>
        <div className="preloader-bar">
          <div className="preloader-fill"></div>
        </div>
        <p className="preloader-text">Loading Arsenal...</p>
      </div>
    </div>
  );
}
