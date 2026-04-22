import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { CREWMATE_IMAGES, DEFAULT_IMAGE } from '../utils/amongus'

export default function CrewmateDetail() {
  const { id } = useParams()
  const [crewmate, setCrewmate] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single()
      if (error) console.error(error)
      else setCrewmate(data)
    }
    fetch()
  }, [id])

  if (!crewmate) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>

  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto', textAlign: 'center', padding: '0 1rem' }}>
      <img
        src={CREWMATE_IMAGES[crewmate.color] || DEFAULT_IMAGE}
        alt={crewmate.color}
        style={{ width: '140px', height: 'auto', marginBottom: '1rem' }}
      />
      <h2>{crewmate.name}</h2>
      <p style={{ color: '#aaa', margin: '8px 0' }}>Color: {crewmate.color}</p>
      <p style={{ color: '#aaa', margin: '8px 0' }}>Speed: {crewmate.speed}</p>
      <p style={{ color: '#aaa', margin: '8px 0' }}>Role: {crewmate.role}</p>
      <p style={{ color: '#555', fontSize: '0.8rem', margin: '8px 0' }}>
        Created: {new Date(crewmate.created_at).toLocaleDateString()}
      </p>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <Link to={`/edit/${crewmate.id}`}><button>Edit</button></Link>
        <Link to="/gallery"><button>← Back</button></Link>
      </div>
    </div>
  )
}