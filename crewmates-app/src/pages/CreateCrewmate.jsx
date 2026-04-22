import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

const COLORS = ['Red', 'Blue', 'Green', 'Purple', 'Yellow', 'Orange']
const SPEEDS = [1, 2, 3, 4, 5]
const ROLES = ['Engineer', 'Medic', 'Pilot', 'Scout', 'Captain']

export default function CreateCrewmate() {
  const [name, setName]   = useState('')
  const [color, setColor] = useState('')
  const [speed, setSpeed] = useState(null)
  const [role, setRole]   = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !color || !speed || !role) return alert('Fill out all fields!')

    const { error } = await supabase
      .from('crewmates')
      .insert([{ name, color, speed, role }])

    if (error) console.error(error)
    else navigate('/gallery')
  }

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>Create a Crewmate</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input value={name} onChange={e => setName(e.target.value)} />

        <p>Pick a color:</p>
        {COLORS.map(c => (
          <button type="button" key={c}
            onClick={() => setColor(c)}
            className={color === c ? 'selected' : ''}
            >
            {c}
          </button>
        ))}

        <p>Pick a speed:</p>
        {SPEEDS.map(s => (
          <button type="button" key={s}
            onClick={() => setSpeed(s)}
            className={speed === s ? 'selected' : ''}
            >
            {s}
          </button>
        ))}

        <p>Pick a role:</p>
        {ROLES.map(r => (
          <button type="button" key={r}
            onClick={() => setRole(r)}
            className={role === r ? 'selected' : ''}
            >
            {r}
          </button>
        ))}

        <br /><br />
        <button type="submit">Create Crewmate!</button>
      </form>
    </div>
  )
}