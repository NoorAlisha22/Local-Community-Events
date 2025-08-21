export default function Modal({ open, title = 'Confirmation', children, onClose }) {
  if (!open) return null
  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginTop: 0 }}>{title}</h3>
        <div style={{ margin: '10px 0' }}>{children}</div>
        <div style={{ textAlign: 'right' }}>
          <button className="pagebtn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
