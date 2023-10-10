import React from 'react';
import Bug from '../assets/laptop-bug.png';
import {IndexNav} from '../IndexNav.jsx';
import { useState, useEffect } from 'react';


// Component sends a GET request to GetAllBugs
// API endpoint and returns all the bug objects 
// to user 
export function BugsIndex() {
    const [bugsList, setBugsList] = useState([]);

    useEffect(() => {
        fetch('https://projectsmanagementapi.azurewebsites.net/api/Bugs/GetAllBugs')
        .then(response => response.json())
        .then(data => setBugsList(data))
    },[])

    return (
        <>
        <IndexNav />
            <div className="container">
                <div className="row my-5 d-sm-inline-flex d-none">
                {bugsList.map(bug => {
                    return (
                        <div className="col-md-4 mb-3" key={bug.bugId}>
                            <div className="card mb-3 shadow bg-light">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={Bug} className="img-fluid center-image" alt="lightbulb picture"></img>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title" id="text-underline">Bug Id: {bug.bugId}</h5>
                                            <p className="card-text">{bug.description.substring(0, 70)}...</p>
                                            <p className="card-text"><small className="text-muted">Date Submitted: {bug.date}</small></p>
                                            {/*anonymous function uses switch statement to set the priority color based on the bug's priority*/}
                                            {(() => {
                                                switch(bug.priority) {
                                                    case "Low": 
                                                        return <p className="card-text blink" id="low-priority">{bug.priority}</p>
                                                    case "Medium":
                                                        return <p className="card-text blink" id="medium-priority">{bug.priority}</p>
                                                    case "High": 
                                                        return <p className="card-text blink" id="high-priority">{bug.priority}</p>
                                                }
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
        </>
    )
}