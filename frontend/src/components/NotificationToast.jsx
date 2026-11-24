import React from 'react';

export default function NotificationToast({ message, isVisible }) {
  return (
    <div className={`notification ${isVisible ? 'show' : ''}`}>
      <span>{message}</span>
    </div>
  );
}
