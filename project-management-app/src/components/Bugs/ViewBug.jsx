import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Component renders the individual bug
// object the user selected to view.
export function ViewBug() {
    const { bugId } = useParams();
    const [bug, setBug] = useState({});
    const [project, setProject] = useState({});
    const navigate = useNavigate();

    // Sends a GET request to get the
    // selected bug for viewing. 
    async function getBug() {
        const response = await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Bugs/GetBugById?bugId=${bugId}`);
        const bug = await response.json();
        return bug;
    }

    // Sends a GET request to get the
    // project the selected bug belongs to.
    async function getProject(bug) {
        const response = await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Projects/GetProjectById?projectId=${bug.projectId}`);
        const project = await response.json();
        return project;
    }

    // Send a DELETE request to API endpoint
    // to delete the bug. Then the user is 
    // redirected back to the bugsindex page.
    async function deleteBug() {
        await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Bugs/DeleteBug?bugId=${bugId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(null)
        });
        navigate("/bugsindex");
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
                const bug = await getBug();
                setBug(bug);

                const project = await getProject(bug);
                setProject(project);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    },[])

    return (
        <>
        <motion.div className="container d-none d-sm-none d-md-block"
        initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div className="my-5 mx-auto">
                <div className="card shadow bg-light">
                    <div className="col-md-11 mx-auto">
                        <h1 className="mt-3 text-center text-decoration-underline">Bug Details</h1>
                        <hr />
                        <div className="card px-5 py-5 my-5 shadow">
                            <div className="row my-5">
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Project</h3>
                                        <Link to={`/viewproject/${bug.projectId}`} className="pe-5">{project.projectTitle}</Link>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Bug Id</h3>
                                        <h5 className="fw-light">{bug.bugId}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Date Submitted</h3>
                                        <h5 className="fw-light">{bug.date}</h5>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Priority Level</h3>
                                        <h5 className="fw-light">{getPriority(bug)}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Assigned-To</h3>
                                        <h5 className="fw-light">{bug.assignment}</h5>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Description</h3>
                                        <h5 className="fw-light">{bug.description}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <Link className="btn btn-secondary shadow" to="/bugsindex">Back</Link>
                                {/*Pass the bug object to the EditBug component so we won't have to 
                                make another GET request to get the selected bugs's data.*/}
                                <Link className="btn btn-dark shadow mx-1" to={'/editbug'} state={{bug}}>Edit Bug</Link>
                                <button onClick={() => deleteBug()} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
        <hr />
        </>
    )
}