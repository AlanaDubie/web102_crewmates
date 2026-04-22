import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#1a1a2e' }}>
      <Link to="/" style={{ color: 'white' }}>🚀 Home</Link>
      <Link to="/gallery" style={{ color: 'white' }}>👾 Gallery</Link>
      <Link to="/create" style={{ color: 'white' }}>➕ Create</Link>
    </nav>
  )
}