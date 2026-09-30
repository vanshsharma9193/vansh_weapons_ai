import React, { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ isOpen, onClose, searchQuery, setSearchQuery, onSearchSubmit }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearchSubmit(searchQuery);
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className={`search-bar ${isOpen ? 'open' : ''}`}>
      <div className="search-inner">
        <Search size={20} style={{ color: 'var(--gold)', flexShrink: 0 }} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search weapons, gear, accessories... (Press Enter)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={onClose} aria-label="Close Search">
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
