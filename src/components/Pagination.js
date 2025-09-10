import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  itemsPerPage, 
  onItemsPerPageChange,
  totalItems,
  isLoading 
}) => {
  const pageNumbers = [];
  const maxVisiblePages = 5;
  
  // Calculate which page numbers to show
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const startItem = ((currentPage - 1) * itemsPerPage) + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination-container">
      {/* Items per page selector */}
      <div className="pagination-controls">
        <div className="items-per-page">
          <label htmlFor="itemsPerPage">Show:</label>
          <select 
            id="itemsPerPage"
            value={itemsPerPage} 
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            disabled={isLoading}
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>per page</span>
        </div>

        {/* Page info */}
        <div className="page-info">
          Showing {startItem}-{endItem} of {totalItems.toLocaleString()} cryptocurrencies
        </div>
      </div>

      {/* Page navigation */}
      <div className="pagination-nav">
        {/* First page button */}
        <button 
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || isLoading}
          className="pagination-btn"
          title="First page"
        >
          <i className="fas fa-angle-double-left"></i>
        </button>

        {/* Previous page button */}
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="pagination-btn"
          title="Previous page"
        >
          <i className="fas fa-angle-left"></i>
        </button>

        {/* Page numbers */}
        {startPage > 1 && (
          <>
            <button 
              onClick={() => onPageChange(1)}
              disabled={isLoading}
              className="pagination-btn"
            >
              1
            </button>
            {startPage > 2 && <span className="pagination-ellipsis">...</span>}
          </>
        )}

        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            disabled={isLoading}
            className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
            <button 
              onClick={() => onPageChange(totalPages)}
              disabled={isLoading}
              className="pagination-btn"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next page button */}
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className="pagination-btn"
          title="Next page"
        >
          <i className="fas fa-angle-right"></i>
        </button>

        {/* Last page button */}
        <button 
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || isLoading}
          className="pagination-btn"
          title="Last page"
        >
          <i className="fas fa-angle-double-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
