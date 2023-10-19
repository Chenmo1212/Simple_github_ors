import React, {useEffect} from 'react';
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

    // Bind keyboard event to control navigation
    useEffect(() => {
        const handleKeyboardNavigation = (event) => {
            if (event.key === 'ArrowLeft' && page > 1) {
                onPageChange(page - 1);
            } else if (event.key === 'ArrowRight' && page < totalPages) {
                onPageChange(page + 1);
            }
        };

        document.addEventListener('keydown', handleKeyboardNavigation);
        return () => document.removeEventListener('keydown', handleKeyboardNavigation);
    }, [onPageChange, page, totalPages]);

    const handleKeyboardNavigation = (event) => {
        if (event.key === 'ArrowLeft' && page > 1) {
            onPageChange(page - 1);
        } else if (event.key === 'ArrowRight' && page < totalPages) {
            onPageChange(page + 1);
        }
    };

    return (
        <div className="pagination" tabIndex={0} onKeyDown={handleKeyboardNavigation}>
            <button onClick={() => onPageChange(1)}
                    disabled={page === 1 || page > totalPages}
                    title="First Page"
                    aria-label="First Page">
                First
            </button>
            <button onClick={() => onPageChange(page - 1)}
                    disabled={page === 1 || page > totalPages}
                    title="Previous Page"
                    aria-label="Previous Page"
            >
                &lt; Previous
            </button>
            {pageNumbers.map((pageNum) => (
                <button key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className={pageNum === page ? 'active page' : 'page'}
                        title={`Page ${pageNum}`}
                        aria-label={`Page ${pageNum}`}
                >
                    {pageNum}
                </button>
            ))}
            <button onClick={() => onPageChange(page + 1)}
                    disabled={page === totalPages || page > totalPages}
                    title="Next Page"
                    aria-label="Next Page"
            >
                Next &gt;
            </button>
            <button onClick={() => onPageChange(totalPages)}
                    disabled={page === totalPages || page > totalPages}
                    title="Last Page"
                    aria-label="Last Page">
                Last
            </button>
        </div>

    );
};

export default Pagination;

