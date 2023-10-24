import React from 'react';
import Person from '/src/assets/person-picture.png';
import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';


// Component sends a GET request to GetAllBugs
// API endpoint and returns all the project manager objects 
// to user 
export function ProjectManagersIndex() {
    const [managersList, setManagersList] = useState([]);

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
        <>
        <div className="container">
            <div className="row my-5 d-sm-inline-flex d-none">
            {managersList ? ( managersList.map(manager => {
                return (
                    <div className="col-md-4 mb-3" key={manager.projectManagerId}>
                        <div className="card mb-3 shadow bg-light">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={Person} className="img-fluid center-image" alt="lightbulb picture"></img>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title" id="text-underline">{manager.firstName} {manager.lastName}</h5>
                                        <p className="card-text">Manager Id: {manager.projectManagerId}</p>
                                        <p className="card-text"><small className="text-muted">Hire Date: {manager.hireDate}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })) : (<Spinner className="center-loader" animation="border" role="status">
                       <span className="visually-hidden">Loading...</span>
                   </Spinner>)}
            </div>
        </div>
        </>
    )
}