import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>🚀 Crewmates Builder</h1>
      <p>Assemble your perfect crew!</p>
      <Link to="/create"><button>Create a Crewmate</button></Link>
      <Link to="/gallery"><button>View Gallery</button></Link>
    </div>
  )
}