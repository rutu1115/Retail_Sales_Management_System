import React from 'react';

const options = [
  { label: 'Date (Newest first)', value: 'date_desc' },
  { label: 'Date (Oldest first)', value: 'date_asc' },
  { label: 'Quantity (High -> Low)', value: 'quantity_desc' },
  { label: 'Quantity (Low -> High)', value: 'quantity_asc' },
  { label: 'Customer Name (A-Z)', value: 'customerName_asc' },
  { label: 'Customer Name (Z-A)', value: 'customerName_desc' }
];

export default function SortingDropdown({ sort, setSort }) {
  const handleChange = (e) => {
    const [sortBy, sortDir] = e.target.value.split('_');
    setSort({ sortBy, sortDir });
  };

  const cur = `${sort.sortBy}_${sort.sortDir}`;
  return (
    <select value={cur} onChange={handleChange}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}