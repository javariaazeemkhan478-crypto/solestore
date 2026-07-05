import './Pagination.css';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, currentPage + 2);
  if (start === 1) end = Math.min(totalPages, 5);
  if (end === totalPages) start = Math.max(1, totalPages - 4);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="pagination">
      <button
        className="pg-btn pg-arrow"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >← Prev</button>

      {start > 1 && (
        <>
          <button className="pg-btn" onClick={() => onPageChange(1)}>1</button>
          {start > 2 && <span className="pg-ellipsis">…</span>}
        </>
      )}

      {pages.map(p => (
        <button
          key={p}
          className={`pg-btn ${p === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(p)}
        >{p}</button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="pg-ellipsis">…</span>}
          <button className="pg-btn" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}

      <button
        className="pg-btn pg-arrow"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >Next →</button>
    </div>
  );
}