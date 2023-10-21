import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// Component renders the individual bug
// object the user selected to view.
export function ViewBug() {
    const { bugId } = useParams();
    const [bug, setBug] = useState({});
    const [project, setProject] = useState({});

    // Function calls the the GetBugById
    // API endpoint and returns the individual
    // bug object.
    async function getBug() {
        const response = await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Bugs/GetBugById?id=${bugId}`);
        const data = await response.json();
        return data;
    }

    // Function calls the GetProjectById
    // using the bug id and returns the 
    // project the bug belongs to.
    async function getProject(bug) {
        const response = await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Projects/GetProjectById?projectId=${bug.projectId}`);
        const data = await response.json();
        return data;
    }

    // Function returns the correct outline
    // color for the priority level using the 
    // bug object's priority property. 
    function getPriority(bug) {
        switch(bug.priority) {
            case "Low": 
                return <p className="card-text blink" id="low-priority">{bug.priority} Priority</p>
            case "Medium":
                return <p className="card-text blink" id="medium-priority">{bug.priority} Priority</p>
            case "High": 
                return <p className="card-text blink" id="high-priority">{bug.priority} Priority</p>
        }
    }

    // Sets the state of the bug and project
    // objects whenever the ViewBug component
    // is rendered.
    useEffect(() => {
        async function fetchData() {
            try {
                const responseBug = await getBug();
                setBug(responseBug);

                const responseProject = await getProject(responseBug);
                setProject(responseProject);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    },[])

    return (
        <div className="container d-none d-sm-none d-md-block">
            <div className="my-5 mx-auto">
                <div className="card shadow bg-light">
                    <div className="col-md-11 mx-auto">
                        <h1 className="mt-3 text-center text-decoration-underline">Bug Details</h1>
                        <hr />
                        <div className="card px-5 py-5 mx-5 my-5 shadow">
                            <div className="row my-5">
                                <div className="col">
                                    <div className="form-outline">
                                        <h4 className="text-decoration-underline">Project</h4>
                                        <Link to={`/viewproject/${bug.projectId}`}>{project.projectTitle}</Link>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <h4 className="text-decoration-underline">Bug Id</h4>
                                        <h5 className="fw-light">{bug.bugId}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col">
                                    <div className="form-outline">
                                        <h4 className="text-decoration-underline">Date Submitted</h4>
                                        <h5 className="fw-light">{bug.date}</h5>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <h4 className="text-decoration-underline">Priority Level</h4>
                                        <h5 className="fw-light">{getPriority(bug)}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col">
                                    <div className="form-outline">
                                        <h4 className="text-decoration-underline">Assigned-To</h4>
                                        <h5 className="fw-light">{bug.assignment}</h5>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <h4 className="text-decoration-underline">Description</h4>
                                        <h5 className="fw-light">{bug.description}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <Link className="btn btn-secondary shadow" to="/bugsindex">Back</Link>
                                {/*Add an edit and delete bug button*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}