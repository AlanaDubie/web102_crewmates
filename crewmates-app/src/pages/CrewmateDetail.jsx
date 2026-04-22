import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

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

  if (!crewmate) return <p>Loading...</p>

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>{crewmate.name}</h2>
      <p><strong>Color:</strong> {crewmate.color}</p>
      <p><strong>Speed:</strong> {crewmate.speed}</p>
      <p><strong>Role:</strong> {crewmate.role}</p>
      <p><strong>Created:</strong> {new Date(crewmate.created_at).toLocaleDateString()}</p>
      <Link to={`/edit/${crewmate.id}`}><button>Edit Crewmate</button></Link>
      <Link to="/gallery"><button>Back to Gallery</button></Link>
    </div>
  )
}