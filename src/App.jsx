import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import EventDetail from './pages/EventDetail'
import RSVP from './pages/RSVP'
import CreateEvent from './pages/CreateEvent'
import { useState } from 'react'
import eventsJson from './data/events.json'

// Provide events + RSVP state here (simple Context-like via props)
function App() {
  // Expecting { events: [...] } from your JSON
  const [events, setEvents] = useState(eventsJson.events || [])
  // RSVPs kept in memory (state only)
  // Structure: { [eventId]: [{ name, email, guests, comments, timestamp }] }
  const [rsvps, setRsvps] = useState({})

  const addRSVP = (eventId, entry) => {
    setRsvps(prev => ({
      ...prev,
      [eventId]: [...(prev[eventId] || []), entry]
    }))
  }

  const addEvent = (newEvent) => {
    // Assign an incremental id
    const nextId = (events[events.length - 1]?.id || 0) + 1
    setEvents(prev => [...prev, { ...newEvent, id: nextId }])
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home events={events} />} />
          <Route path="/event/:id" element={<EventDetail events={events} />} />
          <Route path="/rsvp" element={<RSVP events={events} rsvps={rsvps} addRSVP={addRSVP} />} />
          <Route path="/create" element={<CreateEvent addEvent={addEvent} />} />
        </Routes>
      </div>
    </>
  )
}

export default App
