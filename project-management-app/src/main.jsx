import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import { ProjectsIndex } from './components/Projects/ProjectsIndex.jsx';
import { BugsIndex } from './components/Bugs/BugsIndex.jsx';
import { ViewBug } from './components/Bugs/ViewBug.jsx';
import { AddBug } from './components/Bugs/AddBug.jsx';
import { EmployeesIndex } from './components/Employees/EmployeesIndex.jsx';
import { ProjectManagersIndex } from './components/ProjectManagers/ProjectManagersIndex.jsx';
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
		path: "viewbug",
		element: <ViewBug />
	},
	{
		path: "addbug",
		element: <AddBug />
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
