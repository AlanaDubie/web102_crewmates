import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const COLORS = ['Red', 'Blue', 'Green', 'Purple', 'Yellow', 'Orange']
const SPEEDS = [1, 2, 3, 4, 5]
const ROLES = ['Engineer', 'Medic', 'Pilot', 'Scout', 'Captain']

export default function EditCrewmate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName]   = useState('')
  const [color, setColor] = useState('')
  const [speed, setSpeed] = useState(null)
  const [role, setRole]   = useState('')

  // Load current values
  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single()

      if (error) console.error(error)
      else {
        setName(data.name)
        setColor(data.color)
        setSpeed(data.speed)
        setRole(data.role)
      }
    }
    fetch()
  }, [id])

  const handleUpdate = async (e) => {
    e.preventDefault()
    const { error } = await supabase
      .from('crewmates')
      .update({ name, color, speed, role })
      .eq('id', id)

    if (error) console.error(error)
    else navigate('/gallery')
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure?')) return
    const { error } = await supabase
      .from('crewmates')
      .delete()
      .eq('id', id)

    if (error) console.error(error)
    else navigate('/gallery')
  }

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>Edit Crewmate</h2>
      <form onSubmit={handleUpdate}>
        <label>Name:</label>
        <input value={name} onChange={e => setName(e.target.value)} />

        <p>Pick a color:</p>
        {COLORS.map(c => (
          <button type="button" key={c} onClick={() => setColor(c)}
            className={color === c ? 'selected' : ''}>
            {c}
          </button>
        ))}

        <p>Pick a speed:</p>
        {SPEEDS.map(s => (
          <button type="button" key={s} onClick={() => setSpeed(s)}
            className={speed === s ? 'selected' : ''}>
            {s}
          </button>
        ))}

        <p>Pick a role:</p>
        {ROLES.map(r => (
          <button type="button" key={r} onClick={() => setRole(r)}
            className={role === r ? 'selected' : ''}>
            {r}
          </button>
        ))}

        <br /><br />
        <button type="submit">Update Crewmate</button>
      </form>
      <button onClick={handleDelete} style={{ background: 'red', color: 'white', marginTop: '1rem' }}>
        Delete Crewmate
      </button>
    </div>
  )
}