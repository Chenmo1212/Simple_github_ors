import React from 'react';
import './Pagination.css'

const Pagination = ({page, totalPages, onPageChange}) => {
    // Number of pages to show on each side of the current page
    const pagesToShow = 1;

    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = page - pagesToShow; i <= page + pagesToShow; i++) {
            if (i > 0 && i <= totalPages) {
                pageNumbers.push(i);
            }
        }
        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="pagination">
            <button onClick={() => onPageChange(1)}
                    disabled={page === 1}
                    aria-label="First Page">
                First
            </button>
            <button onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                    aria-label="Previous Page"
            >
                &lt; Previous
            </button>
            {pageNumbers.map((pageNum) => (
                <button key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className={pageNum === page ? 'active page' : 'page'}
                        aria-label={`Page ${pageNum}`}
                >
                    {pageNum}
                </button>
            ))}
            <button onClick={() => onPageChange(page + 1)}
                    disabled={page === totalPages}
                    aria-label="Next Page"
            >
                Next &gt;
            </button>
            <button onClick={() => onPageChange(totalPages)}
                    disabled={page === totalPages}
                    aria-label="Last Page">
                Last
            </button>
        </div>

    );
};

export default Pagination;

