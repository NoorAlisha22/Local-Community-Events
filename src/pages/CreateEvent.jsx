import { useState } from 'react'

// Basic validation: all fields required
export default function CreateEvent({ addEvent }) {
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [host, setHost] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!title || !type || !date || !location || !host || !description) {
      setError('Please fill all fields.')
      return
    }

    addEvent({ title, type, date, location, host, description })
    setSuccess('Event created successfully!')
    setTitle(''); setType(''); setDate(''); setLocation(''); setHost(''); setDescription('')
  }

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Create Event</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <div>
            <label>Title</label>
            <input className="input" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <label>Type</label>
            <input className="input" value={type} onChange={e => setType(e.target.value)} placeholder="Workshop, Music, Sports..." />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Date</label>
            <input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div>
            <label>Location</label>
            <input className="input" value={location} onChange={e => setLocation(e.target.value)} />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Host</label>
            <input className="input" value={host} onChange={e => setHost(e.target.value)} />
          </div>
          <div>
            <label>Description</label>
            <textarea className="textarea" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
        </div>

        {error && <p style={{ color: 'crimson' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <button className="btn" type="submit">Create</button>
      </form>
    </div>
  )
}
