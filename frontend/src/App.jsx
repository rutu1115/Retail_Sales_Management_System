import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortingDropdown from './components/SortingDropdown';
import TransactionsTable from './components/TransactionsTable';
import PaginationControls from './components/PaginationControls';
import api from './services/api';

export default function App() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ sortBy: 'date', sortDir: 'desc' });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [result, setResult] = useState({ data: [], meta: {} });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    // Build params
    const params = {
      q: query || undefined,
      page,
      pageSize,
      sortBy: sort.sortBy,
      sortDir: sort.sortDir,
      // filters need to be sent as CSV strings
      regions: filters.regions?.join(','),
      genders: filters.genders?.join(','),
      ageMin: filters.ageRange?.[0],
      ageMax: filters.ageRange?.[1],
      productCategories: filters.productCategories?.join(','),
      tags: filters.tags?.join(','),
      paymentMethods: filters.paymentMethods?.join(','),
      dateFrom: filters.dateRange?.[0],
      dateTo: filters.dateRange?.[1]
    };

    try {
      const res = await api.getSales(params);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // fetch whenever dependencies change
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filters, sort, page]);

  // Reset to first page when query/filters/sort change
  useEffect(() => {
    setPage(1);
  }, [query, filters, sort]);

  return (
    <div className="container">
      <h1>Retail Sales Manager</h1>
      <SearchBar value={query} onChange={setQuery} />
      <div className="main-grid">
        <FilterPanel filters={filters} setFilters={setFilters} />
        <div className="right-panel">
          <div className="toolbar">
            <SortingDropdown sort={sort} setSort={setSort} />
          </div>
          <TransactionsTable loading={loading} data={result.data} />
          <PaginationControls
            meta={result.meta}
            onPageChange={setPage}
            currentPage={page}
          />
        </div>
      </div>
    </div>
  );
}
