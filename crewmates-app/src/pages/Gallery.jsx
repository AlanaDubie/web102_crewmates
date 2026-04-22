import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'
import { CREWMATE_IMAGES, DEFAULT_IMAGE } from '../utils/amongus'

export default function Gallery() {
  const [crewmates, setCrewmates] = useState([])

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .order('created_at', { ascending: false })
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
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Your Crew</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {crewmates.map(c => (
          <div key={c.id} style={{
            background: '#1e1e2e',
            border: '1px solid #333',
            borderRadius: '12px',
            padding: '1rem',
            textAlign: 'center'
          }}>
            <img
              src={CREWMATE_IMAGES[c.color] || DEFAULT_IMAGE}
              alt={c.color}
              style={{ width: '80px', height: 'auto' }}
            />
            <div style={{ marginTop: '0.5rem' }}>
              <Link to={`/crewmate/${c.id}`}>
                <strong style={{ fontSize: '1.1rem' }}>{c.name}</strong>
              </Link>
              <p style={{ color: '#aaa', fontSize: '0.85rem', margin: '4px 0' }}>
                {c.role} · Speed {c.speed}
              </p>
              <Link to={`/edit/${c.id}`}>
                <button style={{ marginTop: '8px' }}>Edit</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}