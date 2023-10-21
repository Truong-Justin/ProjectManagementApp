import React from 'react';
import Project from '/src/assets/project-picture.png';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


// Component sends a GET request to GetAllProjects
// API endpoint and returns all the project objects 
// to user 
export function ProjectsIndex() {
    const [projectsList, setProjectsList] = useState(null);

    useEffect(() => {
        fetch('https://projectsmanagementapi.azurewebsites.net/api/Projects/GetAllProjects')
        .then(response => response.json())
        .then(data => setProjectsList(data))
    },[])

    return (
        <>
        <div className="container">
            <div className="row my-5 d-sm-inline-flex d-none">
            {projectsList ? ( projectsList.map(project => {
                return (
                    <div className="col-md-4 mb-3" key={project.projectId}>
                        <div className="card mb-3 shadow bg-light">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={Project} className="img-fluid center-image" alt="project picture"></img>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title" id="text-underline">{project.projectTitle.substring(0, 40)}...</h5>
                                        <p className="card-text" >{project.description.substring(0, 70)}...</p>
                                        <p className="card-text"><small className="text-muted">Date Submitted: {project.date}</small></p>
                                        {/*anonymous function uses switch statement to set the priority color based on the project's priority*/}
                                        {(() => {
                                            switch(project.priority) {
                                                case "Low": 
                                                    return <p className="card-text blink" id="low-priority">{project.priority} Priority</p>
                                                case "Medium":
                                                    return <p className="card-text blink" id="medium-priority">{project.priority} Priority</p>
                                                case "High": 
                                                    return <p className="card-text blink" id="high-priority">{project.priority} Priority</p>
                                            }
                                        })()}
                                        <Link to={`/viewproject/${project.projectId}`} state={{project}} className="card-link"></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })) : <h2>Loading...</h2>}
            </div>
        </div>
        </>
    )
}