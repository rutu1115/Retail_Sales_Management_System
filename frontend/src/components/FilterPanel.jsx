
import React, { useState } from 'react';

/**
 * For simplicity this panel exposes UI controls for:
 * - regions (comma-separated tags input)
 * - genders (checkboxes)
 * - age range (two number inputs)
 * - product categories (comma-separated)
 * - tags (comma-separated)
 * - payment methods (comma-separated)
 * - date range (two date inputs)
 *
 * In a production app you'd implement multi-select dropdowns; here,
 * to keep the assignment focused we use simple inputs that map to query params.
 */

function commaListToArray(s) {
  return s ? s.split(',').map(x => x.trim()).filter(Boolean) : undefined;
}

export default function FilterPanel({ filters, setFilters }) {
  const [local, setLocal] = useState({
    regions: (filters.regions || []).join(', '),
    genders: (filters.genders || []).join(', '),
    ageMin: filters.ageRange?.[0] || '',
    ageMax: filters.ageRange?.[1] || '',
    productCategories: (filters.productCategories || []).join(', '),
    tags: (filters.tags || []).join(', '),
    paymentMethods: (filters.paymentMethods || []).join(', '),
    dateFrom: filters.dateRange?.[0] || '',
    dateTo: filters.dateRange?.[1] || ''
  });

  function apply() {
    setFilters({
      regions: commaListToArray(local.regions),
      genders: commaListToArray(local.genders),
      ageRange: (local.ageMin || local.ageMax) ? [Number(local.ageMin || 0), Number(local.ageMax || 999)] : undefined,
      productCategories: commaListToArray(local.productCategories),
      tags: commaListToArray(local.tags),
      paymentMethods: commaListToArray(local.paymentMethods),
      dateRange: (local.dateFrom || local.dateTo) ? [local.dateFrom || undefined, local.dateTo || undefined] : undefined
    });
  }

  function reset() {
    setLocal({
      regions: '',
      genders: '',
      ageMin: '',
      ageMax: '',
      productCategories: '',
      tags: '',
      paymentMethods: '',
      dateFrom: '',
      dateTo: ''
    });
    setFilters({});
  }

  return (
    <div className="filter-panel">
      <h3>Filters</h3>

      <div className="small">Regions (comma-separated)</div>
      <input value={local.regions} onChange={e => setLocal({ ...local, regions: e.target.value })} />

      <div className="small" style={{marginTop:8}}>Genders (comma-separated: Male,Female)</div>
      <input value={local.genders} onChange={e => setLocal({ ...local, genders: e.target.value })} />

      <div className="small" style={{marginTop:8}}>Age Range</div>
      <div className="controls">
        <input type="number" placeholder="Min" value={local.ageMin} onChange={e => setLocal({ ...local, ageMin: e.target.value })} />
        <input type="number" placeholder="Max" value={local.ageMax} onChange={e => setLocal({ ...local, ageMax: e.target.value })} />
      </div>

      <div className="small" style={{marginTop:8}}>Product Categories</div>
      <input value={local.productCategories} onChange={e => setLocal({ ...local, productCategories: e.target.value })} />

      <div className="small" style={{marginTop:8}}>Tags</div>
      <input value={local.tags} onChange={e => setLocal({ ...local, tags: e.target.value })} />

      <div className="small" style={{marginTop:8}}>Payment Methods</div>
      <input value={local.paymentMethods} onChange={e => setLocal({ ...local, paymentMethods: e.target.value })} />

      <div className="small" style={{marginTop:8}}>Date Range</div>
      <div className="controls">
        <input type="date" value={local.dateFrom} onChange={e => setLocal({ ...local, dateFrom: e.target.value })} />
        <input type="date" value={local.dateTo} onChange={e => setLocal({ ...local, dateTo: e.target.value })} />
      </div>

      <div style={{marginTop:10}} className="controls">
        <button className="button" onClick={apply}>Apply</button>
        <button className="button" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}