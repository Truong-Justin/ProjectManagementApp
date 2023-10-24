import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export function ViewProject() {
    const { projectId } = useParams();
    const [project, setProject] = useState({});
    const [projectManager, setProjectManager] = useState({});
    const [bugsList, setBugsList] = useState([]);
    const [employeesList, setEmployeesList]  = useState([]);

    async function getProject() {
        const response = await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Projects/GetProjectById?projectId=${projectId}`);
        const data = await response.json();
        return data;
    }

    async function getProjectManager(project) {
        const response = await fetch(`https://projectsmanagementapi.azurewebsites.net/api/ProjectManager/GetProjectManagerById?id=${project.projectManagerId}`);
        const data = await response.json();
        return data;
    }

    async function getAllBugsForProject() {
        const response = await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Projects/GetAllBugsForProject?projectId=${projectId}`);
        const data = await response.json();
        return data;
    }

    async function getAllEmployeesForProject() {
        const response = await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Projects/GetAllEmployeesForProject?projectId=${projectId}`);
        const data = await response.json();
        return data;
    }

    function getPriority(project) {
        switch(project.priority) {
            case "Low": 
                return <p className="card-text blink" id="low-priority">{project.priority} Priority</p>
            case "Medium":
                return <p className="card-text blink" id="medium-priority">{project.priority} Priority</p>
            case "High": 
                return <p className="card-text blink" id="high-priority">{project.priority} Priority</p>
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const project = await getProject();
                setProject(project);
                
                const projectManager = await getProjectManager(project);
                setProjectManager(projectManager);
                
                const bugs = await getAllBugsForProject();
                setBugsList(bugs);

                const employees = await getAllEmployeesForProject();
                setEmployeesList(employees);
            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    },[])

    return (
        <>
        <div className="container d-none d-sm-none d-md-block">
            <div className="my-5 mx-auto">
                <div className="card shadow bg-light">
                    <div className="col-md-11 mx-auto">
                        <h1 className="text-decoration-underline text-center">Project Details</h1>
                        <hr />
                        <div className="card px-5 py-5 mx-5 my-5 shadow">
                            <div className="row my-5">
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Project Id</h3>
                                        <h5 className="fw-light">{project.projectId}</h5>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Project Title</h3>
                                        <h5 className="fw-light">{project.projectTitle}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Project Manager</h3>
                                        <Link to={`/viewprojectmanager/${project.projectManagerId}`}>{projectManager.firstName} {projectManager.lastName}</Link>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Start Date</h3>
                                        <h5 className="fw-light">{project.date}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Priority</h3>
                                        <h5 className="fw-light">{getPriority(project)}</h5>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Description</h3>
                                        <h5 className="fw-light">{project.description}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <Link className="btn btn-secondary shadow" to={"/"}>Back</Link>
                                {/*Add a delete and edit button*/}
                            </div>
                            <hr className="my-5"/>
                            <div className="card bg-light shadow">
                                <div className="row my-5 px-5">
                                    <div className="col px-5">
                                        <div className="form-outline">
                                            <h3 className="text-decoration-underline">Project Bugs</h3>
                                            <ol>
                                                {bugsList.map(bug => {
                                                    return (
                                                        <li key={bug.bugId}>
                                                            <Link to={`/viewbug/${bug.bugId}`}>{bug.description}</Link>
                                                        </li>
                                                    )
                                                })}
                                            </ol>
                                        </div>
                                    </div>
                                    <div className="col px-5">
                                        <div className="form-outline">
                                            <h3 className="text-decoration-underline">Assigned Employees</h3>
                                            <ol>
                                                {employeesList.map(employee => {
                                                    return (
                                                        <li key={employee.employeeId}>
                                                            <Link to={`/viewemployee/${employee.employeeId}`}>{employee.firstName} {employee.lastName}</Link>
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
        </>
    )
}