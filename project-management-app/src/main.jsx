import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import { ProjectsIndex } from './Projects/ProjectsIndex.jsx';
import { BugsIndex } from './Bugs/BugsIndex.jsx';
import { EmployeesIndex } from './Employees/EmployeesIndex.jsx';
import { ProjectManagersIndex } from './ProjectManagers/ProjectManagersIndex.jsx';
import './index.css';

const router = createBrowserRouter([
	{
		path: "/",
		element: <ProjectsIndex />
	},
	{
		path: "bugsindex",
		element: <BugsIndex />
	},
	{
		path: "employeesindex",
		element: <EmployeesIndex />
	},
	{
		path: "projectmanagersindex",
		element: <ProjectManagersIndex />
	}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
