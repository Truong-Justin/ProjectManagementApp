import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import '../App.css';
import { Layout } from './Layout.jsx'; 
import { ProjectsIndex } from './Projects/ProjectsIndex';
import { ViewProject } from './Projects/ViewProject';
import { BugsIndex} from './Bugs/BugsIndex';
import { ViewBug } from './Bugs/ViewBug';

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />} >
                    <Route path="/" element={<ProjectsIndex />} />
                    <Route path="/viewproject/:id" element={<ViewProject />} />
                    <Route path="bugsindex" element={<BugsIndex />} />
                    <Route path="/viewbug/:bugId" element={<ViewBug />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App;