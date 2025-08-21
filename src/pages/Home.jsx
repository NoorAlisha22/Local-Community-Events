import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const PAGE_SIZE = 6

export default function Home({ events }) {
  // Filters
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const [location, setLocation] = useState('All')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [page, setPage] = useState(1)

  // Unique filter options
  const types = useMemo(() => ['All', ...Array.from(new Set(events.map(e => e.type)))], [events])
  const locations = useMemo(() => ['All', ...Array.from(new Set(events.map(e => e.location)))], [events])

  // Apply filters + search
  const filtered = useMemo(() => {
    let list = events.slice()

    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(e => e.title.toLowerCase().includes(q))
    }
    if (type !== 'All') list = list.filter(e => e.type === type)
    if (location !== 'All') list = list.filter(e => e.location === location)
    if (fromDate) list = list.filter(e => e.date >= fromDate)
    if (toDate) list = list.filter(e => e.date <= toDate)

    return list.sort((a,b) => a.date.localeCompare(b.date))
  }, [events, query, type, location, fromDate, toDate])

  // Pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1
  const current = Math.min(page, totalPages)
  const start = (current - 1) * PAGE_SIZE
  const currentPageItems = filtered.slice(start, start + PAGE_SIZE)

  const resetToFirst = () => setPage(1)

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Explore Events</h2>

      <div className="filters">
        <input className="searchInput" placeholder="Search by title..." value={query} onChange={e => { setQuery(e.target.value); resetToFirst() }} />
        <select className="select" value={type} onChange={e => { setType(e.target.value); resetToFirst() }}>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select className="select" value={location} onChange={e => { setLocation(e.target.value); resetToFirst() }}>
          {locations.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <input className="dateInput" type="date" value={fromDate} onChange={e => { setFromDate(e.target.value); resetToFirst() }} />
        <input className="dateInput" type="date" value={toDate} onChange={e => { setToDate(e.target.value); resetToFirst() }} />
      </div>

      <div className="grid">
        {currentPageItems.map(e => (
          <article key={e.id} className="card">
            <h3>{e.title}</h3>
            <div className="meta">{e.type} • {e.location}</div>
            <div className="meta">Date: {e.date}</div>
            <p style={{ marginTop: 8 }}>{e.description}</p>
            <div className="actions">
              <Link className="btn" to={`/event/${e.id}`}>View Details</Link>
              <Link className="btn secondary" to={`/rsvp?eventId=${e.id}`}>RSVP</Link>
            </div>
          </article>
        ))}
      </div>

      <div className="pagination" style={{ marginTop: 16 }}>
        <button className="pagebtn" disabled={current === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button key={p} className={`pagebtn ${current === p ? 'active' : ''}`} onClick={() => setPage(p)}>{p}</button>
        ))}
        <button className="pagebtn" disabled={current === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  )
}
