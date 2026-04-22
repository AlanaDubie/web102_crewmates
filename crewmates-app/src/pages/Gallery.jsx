import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'

export default function Gallery() {
  const [crewmates, setCrewmates] = useState([])

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .order('created_at', { ascending: false })  // newest first!

      if (error) console.error(error)
      else setCrewmates(data)
    }
    fetchCrewmates()
  }, [])

  if (crewmates.length === 0) return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <p>No crewmates yet! <Link to="/create">Create one</Link></p>
    </div>
  )

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <h2>Your Crew</h2>
      {crewmates.map(c => (
        <div key={c.id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
          <Link to={`/crewmate/${c.id}`}><strong>{c.name}</strong></Link>
          <p>Color: {c.color} | Speed: {c.speed} | Role: {c.role}</p>
          <Link to={`/edit/${c.id}`}><button>Edit</button></Link>
        </div>
      ))}
    </div>
  )
}