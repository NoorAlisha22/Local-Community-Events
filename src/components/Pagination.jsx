export default function Pagination({ current, totalPages, onPage }) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="pagination">
      <button className="pagebtn" disabled={current === 1} onClick={() => onPage(current - 1)}>Prev</button>
      {pages.map(p => (
        <button
          key={p}
          className={`pagebtn ${current === p ? 'active' : ''}`}
          onClick={() => onPage(p)}
        >
          {p}
        </button>
      ))}
      <button className="pagebtn" disabled={current === totalPages} onClick={() => onPage(current + 1)}>Next</button>
    </div>
  )
}
