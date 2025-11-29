// Pagination.jsx
import React from "react";

const Pagination = ({ count, limit, page, onPageChange }) => {
    const totalPages = Math.ceil(count / limit);

    if (totalPages <= 1) return null;

    const renderPageButton = (p) => (
        <button
            key={p}
            className={`px-3 btn py-1 rounded border ${
                page === p
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => onPageChange(p)}
        >
            {p}
        </button>
    );

    return (
        <div className="flex justify-end flex-wrap gap-2 mt-6">
            <button
                className={`px-3 btn py-1 rounded border bg-white text-gray-700 border-gray-300 hover:bg-gray-100 ${
                    page === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => page > 1 && onPageChange(page - 1)}
            >
                Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                if (
                    p === 1 ||
                    p === 2 ||
                    p === totalPages ||
                    p === totalPages - 1 ||
                    (p >= page - 1 && p <= page + 1)
                ) {
                    return renderPageButton(p);
                } else if (
                    (p === 3 && page > 4) ||
                    (p === totalPages - 2 && page < totalPages - 3)
                ) {
                    return (
                        <span
                            key={p}
                            className="px-3 btn border-gray-300 py-1 rounded border bg-gray-100 text-gray-400 cursor-default"
                        >
                            ...
                        </span>
                    );
                }
                return null;
            })}

            <button
                className={`px-3 py-1 btn rounded border bg-white text-gray-700 border-gray-300 hover:bg-gray-100 ${
                    page === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => page < totalPages && onPageChange(page + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
