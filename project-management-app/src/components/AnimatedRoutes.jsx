import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './Layout.jsx'; 
import { ProjectsIndex } from './Projects/ProjectsIndex';
import { ViewProject } from './Projects/ViewProject';
import { EditProject } from './Projects/EditProject';
import { AddProject } from './Projects/AddProject';
import { BugsIndex} from './Bugs/BugsIndex';
import { ViewBug } from './Bugs/ViewBug';
import { EditBug} from './Bugs/EditBug';
import { AddBug } from './Bugs/AddBug';
import { EmployeesIndex } from './Employees/EmployeesIndex';
import { ViewEmployee } from './Employees/ViewEmployee';
import { AddEmployee } from './Employees/AddEmployee';
import { EditEmployee } from './Employees/EditEmployee';
import { ProjectManagersIndex } from './ProjectManagers/ProjectManagersIndex';
import { ViewProjectManager } from './ProjectManagers/ViewProjectManager';
import { AddProjectManager } from './ProjectManagers/AddProjectManager';
import { EditProjectManager } from './ProjectManagers/EditProjectManager';

// Function holds the different routes and enables
// Frame-Motion animations to be utilized within
// the different components/
export function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                    <Route element={<Layout />} >
                        <Route path="/" element={<ProjectsIndex />} />
                        <Route path="/viewproject/:projectId" element={<ViewProject />} />
                        <Route path="/addproject" element={<AddProject />} />
                        <Route path="/editproject" element={<EditProject />} />
                        <Route path="/bugsindex" element={<BugsIndex />} />
                        <Route path="/viewbug/:bugId" element={<ViewBug />} />
                        <Route path="/editbug" element={<EditBug />} />
                        <Route path="/addbug" element={<AddBug />}></Route>
                        <Route path="/employeesindex" element={<EmployeesIndex />} />
                        <Route path="/viewemployee/:employeeId" element={<ViewEmployee />} />
                        <Route path="/addemployee" element={<AddEmployee />} />
                        <Route path="editemployee" element={<EditEmployee />} />
                        <Route path="/projectmanagersindex" element={<ProjectManagersIndex />} />
                        <Route path="/viewprojectmanager/:projectManagerId" element={<ViewProjectManager />} />
                        <Route path="/addprojectmanager" element={<AddProjectManager />} />
                        <Route path="/editprojectmanager" element={<EditProjectManager />} />
                    </Route>
            </Routes>
        </AnimatePresence>
    )
}