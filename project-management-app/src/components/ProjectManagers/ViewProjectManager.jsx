import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export function ViewProjectManager() {
    const { projectManagerId } = useParams();
    const [projectManager, setProjectManager] = useState({});
    const [projectsList, setProjectsList] = useState([]);
    const navigate = useNavigate();

    // Sends a GET request to get the selected
    // project manager for viewing. 
    async function getProjectManager() {
        const response = await fetch(`https://projectsmanagementapi.azurewebsites.net/api/ProjectManager/GetProjectManagerById?id=${projectManagerId}`);
        const data = response.json();
        return data;
    }

    // Sends a GET request to get all projects
    // that the selected project manager is in 
    // charge of.
    async function getProjectsForManager() {
        const response = await fetch(`https://projectsmanagementapi.azurewebsites.net/api/ProjectManager/GetAllProjectsForManager?projectManagerId=${projectManagerId}`);
        const data = response.json();
        return data;
    }

     // Send a DELETE request to API endpoint
    // to delete the project manager. Then the user is 
    // redirected back to the projectmanagersindex page.
    async function deleteManager() {
        await fetch(`https://projectsmanagementapi.azurewebsites.net/api/ProjectManager/DeleteProjectManager?id=${projectManagerId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'      
            },
            body: JSON.stringify(null)
        });
        navigate("/projectmanagersindex");
    }

    // Sets the state of the projectManager object and the
    // projectsList whenever the ViewProjectManager
    // component is rendered.
    useEffect(() => {
        async function fetchData() {
            const projectManager = await getProjectManager();
            setProjectManager(projectManager);

            const projects = await getProjectsForManager();
            setProjectsList(projects);
        }
        fetchData();
    },[])

    return (
        <div className="container d-none d-sm-none d-md-block">
            <div className="my-5 mx-auto">
                <div className="card shadow bg-light">
                    <div className="col-md-11 mx-auto">
                        <h1 className="mt-3 text-center text-decoration-underline">Project Manager Details</h1>
                        <hr />
                        <div className="card px-5 py-5 mx-5 my-5 shadow">
                            <div className="row my-5">
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Name</h3>
                                        <h5 className="fw-light">{projectManager.firstName} {projectManager.lastName}</h5>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Manager Id</h3>
                                        <h5 className="fw-light">{projectManager.projectManagerId}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Hire Date</h3>
                                        <h5 className="fw-light">{projectManager.hireDate}</h5>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Address</h3>
                                        <h5 className="fw-light">{projectManager.address}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Zip Code</h3>
                                        <h5 className="fw-light">{projectManager.zip}</h5>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Phone Number</h3>
                                        <h5 className="fw-light">{projectManager.phone}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <Link className="btn btn-secondary shadow" to="/projectmanagersindex">Back</Link>
                                <Link className="btn btn-dark shadow mx-1" to="/editprojectmanager" state={{projectManager}}>Edit Manager</Link>
                                <button onClick={() => deleteManager()} className="btn btn-danger">Delete</button>
                            </div>
                            <hr className="my-5"/>
                            <div className="card bg-light shadow">
                                <div className="row my-5">
                                    <div className="col px-5">
                                        <div className="form-outline">
                                            <h3 className="text-decoration-underline">Projects In-Charge Of</h3>
                                            <ol>
                                                {projectsList.map(project => {
                                                    return (
                                                        <li key={project.projectId}>
                                                            <Link to={`/viewproject/${project.projectId}`}>{project.projectTitle}</Link>
                                                        </li>
                                                    )
                                                })}
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}