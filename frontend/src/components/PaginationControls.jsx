import React from 'react';

export default function PaginationControls({ meta = {}, onPageChange, currentPage }) {
  const { totalPages = 1 } = meta;
  return (
    <div className="pagination">
      <button className="button" onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage <= 1}>Previous</button>
      <div className="small">Page {currentPage} / {totalPages}</div>
      <button className="button" onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage >= totalPages}>Next</button>
    </div>
  );
}