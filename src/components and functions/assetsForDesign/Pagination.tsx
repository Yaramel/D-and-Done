/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';

interface Inputs {
    items: any[];
    itemsPerPage: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
}

export default function Pagination({ items, itemsPerPage, currentPage, paginate }: Inputs) {
    const totalPages = Math.ceil(items.length / itemsPerPage);

    // Calculate the start and end page numbers to display
    let startPage, endPage;
    if (totalPages <= 5) {
        // Less than 5 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // More than 5 total pages so calculate start and end pages
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 2 >= totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }
    }

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    const noItems = items.length === 0;

    return (
        <div className=''>
            <ul className="pagination pagination-custom justify-content-center">
                <li className={`page-item ${currentPage === 1 || noItems ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => {paginate(currentPage - 1); window.scrollTo(0, 0);}}>
                        &laquo;
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number || noItems ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => {paginate(number); window.scrollTo(0, 0);}}>
                            {number}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages || noItems ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => {paginate(currentPage + 1); window.scrollTo(0, 0);}}>
                        &raquo;
                    </button>
                </li>
            </ul>
        </div>
    );
}
