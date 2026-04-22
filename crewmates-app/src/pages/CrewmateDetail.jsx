import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { CREWMATE_IMAGES, DEFAULT_IMAGE } from '../utils/amongus'

// Extra fun stats based on attributes
function getCrewStats(crewmate) {
  const trustScore = crewmate.speed * 18 + (crewmate.role === 'Captain' ? 10 : 0)
  const susLevel = crewmate.color === 'Red' ? 'Very Sus 🔴' : 'Not Sus ✅'
  const taskScore = crewmate.speed * 12
  return { trustScore, susLevel, taskScore }
}

export default function CrewmateDetail() {
  const { id } = useParams()
  const [crewmate, setCrewmate] = useState(null)

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single()
      if (error) console.error(error)
      else setCrewmate(data)
    }
    fetchCrewmate()
  }, [id])

  if (!crewmate) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>

  const { trustScore, susLevel, taskScore } = getCrewStats(crewmate)

  return (
    <div style={{ maxWidth: '420px', margin: '3rem auto', textAlign: 'center', padding: '0 1rem' }}>
      <img
        src={CREWMATE_IMAGES[crewmate.color] || DEFAULT_IMAGE}
        alt={crewmate.color}
        style={{ width: '140px', height: 'auto', marginBottom: '1rem' }}
      />
      <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{crewmate.name}</h2>

      {/* Basic info — also shown in gallery */}
      <div style={{ background: '#1e1e2e', borderRadius: '12px', padding: '1rem', margin: '1rem 0' }}>
        <p>🎨 Color: <strong>{crewmate.color}</strong></p>
        <p>⚡ Speed: <strong>{crewmate.speed}</strong></p>
        <p>🧑‍🚀 Role: <strong>{crewmate.role}</strong></p>
      </div>

      {/* Extra info — only on detail page */}
      <div style={{ background: '#16213e', border: '1px solid #5b8dd9', borderRadius: '12px', padding: '1rem', margin: '1rem 0' }}>
        <h3 style={{ marginBottom: '0.75rem', color: '#5b8dd9' }}>📊 Crew Stats</h3>
        <p>🗓️ Joined: <strong>{new Date(crewmate.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
        <p>🤝 Trust Score: <strong>{trustScore}/100</strong></p>
        <p>✅ Tasks Completed: <strong>{taskScore}</strong></p>
        <p>🔍 Sus Level: <strong>{susLevel}</strong></p>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '1rem' }}>
        <Link to={`/edit/${crewmate.id}`}><button>✏️ Edit</button></Link>
        <Link to="/gallery"><button>← Back to Gallery</button></Link>
      </div>
    </div>
  )
}