import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import CreateCrewmate from './pages/CreateCrewmate'
import CrewmateDetail from './pages/CrewmateDetail'
import EditCrewmate from './pages/EditCrewmate'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/gallery"        element={<Gallery />} />
        <Route path="/create"         element={<CreateCrewmate />} />
        <Route path="/crewmate/:id"   element={<CrewmateDetail />} />
        <Route path="/edit/:id"       element={<EditCrewmate />} />
      </Routes>
    </>
  )
}

export default App