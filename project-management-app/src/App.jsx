import { Routes, Route } from 'react-router-dom';
import {ProjectsIndex} from './Projects/ProjectsIndex.jsx';
import {BugsIndex} from './Bugs/BugsIndex.jsx';
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" elements={<ProjectsIndex />} />
      <Route path="bugsindex" element={<BugsIndex />} />
      <Route path="projectsindex" element={<ProjectsIndex />} />
    </Routes>
  )
}

export default App
