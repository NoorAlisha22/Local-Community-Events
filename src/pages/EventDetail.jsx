import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function EventDetail({ events }) {
  const { id } = useParams()
  const event = useMemo(() => events.find(e => String(e.id) === String(id)), [events, id])

  if (!event) return <div className="detail"><p>Event not found.</p></div>

  return (
    <div className="detail">
      <h2 style={{ marginTop: 0 }}>{event.title}</h2>
      <p><strong>Type:</strong> {event.type}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Host:</strong> {event.host}</p>
      <p style={{ marginTop: 10 }}>{event.description}</p>
      <div className="actions" style={{ marginTop: 14 }}>
        <Link className="btn" to={`/rsvp?eventId=${event.id}`}>RSVP / Join</Link>
        <Link className="btn secondary" to="/">Back</Link>
      </div>
    </div>
  )
}
