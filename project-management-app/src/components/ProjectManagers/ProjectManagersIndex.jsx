import React from 'react';
import { Link } from 'react-router-dom';
import Person from '/src/assets/person-picture.png';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Spinner from 'react-bootstrap/Spinner';


// Component outputs to the user all project
// manager records that exist in the database.
export function ProjectManagersIndex() {
    const [managersList, setManagersList] = useState(null);

    // Calls an API endpoint and sets the 
    // state of the managersList with all the project 
    // manager records when the ProjectManagersIndex component 
    // is rendered.
    useEffect(() => {
        async function fetchManagers() {
            try {
                const response = await fetch('https://projectsmanagementapi.azurewebsites.net/api/ProjectManager/GetAllProjectManagers');
                const managers = await response.json();
                setManagersList(managers);
            } catch(error) {
                console.log(error);
            }
        }
        fetchManagers();
    },[])

    return (
        <div className="container">
            {/*UI for mobile view*/}
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
            className="row my-5 d-sm-none">
            {managersList ? ( managersList.map(projectManager => {
                return (
                    <div className="col-md-4 mb-3" key={projectManager.projectManagerId}>
                        <div className="card mb-3 shadow bg-light">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={Person} className="img-fluid center-image w-25 mt-5" alt="character silhouette"></img>
                                </div>
                                <div className="col-md-8 text-center">
                                    <div className="card-body">
                                        <h5 className="card-title" id="text-underline">{projectManager.firstName} {projectManager.lastName}</h5>
                                        <p className="card-text">Manager Id: {projectManager.projectManagerId}</p>
                                        <p className="card-text"><small className="text-muted">Hire Date: {projectManager.hireDate}</small></p>
                                        <Link to={`/viewprojectmanager/${projectManager.projectManagerId}`} className="card-link"></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })) : (<Spinner className="center-loader" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </Spinner>)}
            </motion.div>
            {/*UI for desktop view*/}
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} 
            className="row my-5 d-sm-inline-flex d-none">
            {managersList ? ( managersList.map(projectManager => {
                return (
                    <div className="col-md-4 mb-3" key={projectManager.projectManagerId}>
                        <motion.div className="card mb-3 shadow" id="card-color-transition"
                        whileHover={{scale: 1.05}} whileTap={{scale: .9}}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={Person} className="img-fluid center-image img-scale" alt="character silhouette"></img>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title card-text-color" id="text-underline">{projectManager.firstName} {projectManager.lastName}</h5>
                                        <p className="card-text card-text-color">Manager Id: {projectManager.projectManagerId}</p>
                                        <p className="card-text"><small className="card-date-color">Hire Date: {projectManager.hireDate}</small></p>
                                    </div>
                                </div>
                            </div>
                            <Link className="card-link" to={`/viewprojectmanager/${projectManager.projectManagerId}`}></Link>
                        </motion.div>
                    </div>
                )
            })) : (<Spinner className="center-loader" animation="border" role="status">
                       <span className="visually-hidden">Loading...</span>
                   </Spinner>)}
            </motion.div>
            <div className="text-center">
                <Link to="/addprojectmanager" className="my-5 btn btn-md btn-secondary shadow">+ Add a project manager</Link>
            </div>
        </div>
    )
}