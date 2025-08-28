import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import RSVP from './pages/RSVP';
import CreateEvent from './pages/CreateEvent';
import { useState } from 'react';
import eventsJson from './data/events.json';
import './index.css'


function IntroPage({ onContinue }) {
  return (
    <div className="intro-page animated-intro-bg">
      {/* Animated floating shapes */}
      <div className="intro-shapes">
        <span className="shape shape1"></span>
        <span className="shape shape2"></span>
        <span className="shape shape3"></span>
        <span className="shape shape4"></span>
        <span className="shape shape5"></span>
      </div>
      <div className="intro-content">
        <h1 className="intro-title">Welcome to Community Events</h1>
        <p className="intro-desc">
          Discover, create, and join local events in your community! Our platform helps you connect with others, share experiences, and make your neighborhood more vibrant. Whether you want to host a workshop, attend a meetup, or simply explore what's happening nearby, Community Events is your go-to hub.
        </p>
        <button className="btn intro-btn" onClick={onContinue}>
          Let's Go!
        </button>
      </div>
    </div>
  );
}

// Provide events + RSVP state here (simple Context-like via props)
function App() {
  // Expecting { events: [...] } from your JSON
  const [events, setEvents] = useState(eventsJson.events || []);
  // RSVPs kept in memory (state only)
  // Structure: { [eventId]: [{ name, email, guests, comments, timestamp }] }
  const [rsvps, setRsvps] = useState({});
  const [showIntro, setShowIntro] = useState(true);

  const addRSVP = (eventId, entry) => {
    setRsvps(prev => ({
      ...prev,
      [eventId]: [...(prev[eventId] || []), entry]
    }));
  };

  const addEvent = (newEvent) => {
    // Assign an incremental id
    const nextId = (events[events.length - 1]?.id || 0) + 1;
    setEvents(prev => [...prev, { ...newEvent, id: nextId }]);
  };

  if (showIntro) {
    return <IntroPage onContinue={() => setShowIntro(false)} />;
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
  );
}

export default App
