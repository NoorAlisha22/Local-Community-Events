import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Modal from '../components/Modal'

export default function RSVP({ events, rsvps, addRSVP }) {
  const [params] = useSearchParams()
  const initialEventId = params.get('eventId') ? Number(params.get('eventId')) : ''
  const [eventId, setEventId] = useState(initialEventId)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [guests, setGuests] = useState(1)
  const [comments, setComments] = useState('')
  const [open, setOpen] = useState(false)

  // current event label
  const currentEvent = useMemo(() => events.find(e => e.id === Number(eventId)), [events, eventId])

  // RSVPs list for selected event
  const listForEvent = useMemo(() => rsvps[eventId] || [], [rsvps, eventId])

  useEffect(() => {
    if (!eventId && events.length) {
      setEventId(events[0].id)
    }
  }, [events, eventId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!eventId) return
    addRSVP(Number(eventId), {
      name, email, guests: Number(guests), comments, timestamp: new Date().toISOString()
    })
    setOpen(true) // show confirmation
    setName('')
    setEmail('')
    setGuests(1)
    setComments('')
  }
  
  const handleInvalid = (e) => {
        e.target.setCustomValidity('🤯Enter the valid input😵');
  };

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>RSVP</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Event</label>
        <select className="selectFull" value={eventId} onChange={e => setEventId(Number(e.target.value))}>
          {events.map(e => <option key={e.id} value={e.id}>{e.title} — {e.date}</option>)}
        </select>

        <div className="row">
          <div>
            <label>Name</label>
            <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required/>
          </div>
          <div>
            <label>Email</label>
            <input className="input" onInvalid={handleInvalid} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Guests</label>
            <input className="input" type="number" min="1" value={guests} onChange={e => setGuests(e.target.value)} required />
          </div>
          <div>
            <label>Comments</label>
            <input className="input" value={comments} onChange={e => setComments(e.target.value)} placeholder="Any notes..." />
          </div>
        </div>

        <button className="btn" type="submit">Submit RSVP</button>
      </form>

      <h3 style={{ marginTop: 20 }}>Submitted RSVPs {currentEvent ? `for "${currentEvent.title}"` : ''}</h3>
      <div className="card">
        {listForEvent.length === 0 ? (
          <p className="meta">No RSVPs yet.</p>
        ) : (
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {listForEvent.map((r, i) => (
              <li key={i} style={{ margin: '6px 0' }}>
                <strong>{r.name}</strong> — {r.email} • Guests: {r.guests}
                {r.comments ? ` • "${r.comments}"` : '' }
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="RSVP Confirmed" className="Popup">
        <p style={{ marginTop: 0 }}>
          Your RSVP {currentEvent ? `for "${currentEvent.title}"` : ''} has been recorded.
        </p>
        <p className="meta">Thank you for joining!</p>
      </Modal>
    </div>
  )
}
