import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <div>
      <input
        className="search-bar"
        placeholder="Search by customer name or phone..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}