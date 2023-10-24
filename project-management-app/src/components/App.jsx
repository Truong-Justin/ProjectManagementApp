import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import '../App.css';
import { Layout } from './Layout.jsx'; 
import { ProjectsIndex } from './Projects/ProjectsIndex';
import { ViewProject } from './Projects/ViewProject';
import { BugsIndex} from './Bugs/BugsIndex';
import { ViewBug } from './Bugs/ViewBug';
import { EmployeesIndex } from './Employees/EmployeesIndex';
import { ViewEmployee } from './Employees/ViewEmployee';
import { ProjectManagersIndex } from './ProjectManagers/ProjectManagersIndex';
import { ViewProjectManager } from './ProjectManagers/ViewProjectManager';

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />} >
                    <Route path="/" element={<ProjectsIndex />} />
                    <Route path="/viewproject/:projectId" element={<ViewProject />} />
                    <Route path="/bugsindex" element={<BugsIndex />} />
                    <Route path="/viewbug/:bugId" element={<ViewBug />} />
                    <Route path="/employeesindex" element={<EmployeesIndex />} />
                    <Route path="/viewemployee/:employeeId" element={<ViewEmployee />} />
                    <Route path="/projectmanagersindex" element={<ProjectManagersIndex />} />
                    <Route path="/viewprojectmanager/:projectManagerId" element={<ViewProjectManager />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App;