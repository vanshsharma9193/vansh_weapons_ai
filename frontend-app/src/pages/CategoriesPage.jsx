import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoriesSection from '../components/CategoriesSection';

export default function CategoriesPage() {
  const navigate = useNavigate();

  const handleSelectCategory = (catKey) => {
    navigate(`/shop?category=${catKey}`);
  };

  return (
    <div className="categories-page" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <CategoriesSection onSelectCategory={handleSelectCategory} />
    </div>
  );
}
