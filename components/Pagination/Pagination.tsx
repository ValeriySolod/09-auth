'use client';

import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrev = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={css.pagination}>
      <button
        className={css.button}
        onClick={handlePrev}
        disabled={page === 1}
        type="button"
      >
        Prev
      </button>

      <span className={css.text}>
        Page {page} of {totalPages}
      </span>

      <button
        className={css.button}
        onClick={handleNext}
        disabled={page === totalPages}
        type="button"
      >
        Next
      </button>
    </div>
  );
}