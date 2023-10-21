import React from 'react';
import { Link } from 'react-router-dom';
import Bug from '/src/assets/laptop-bug.png';
import { useState, useEffect } from 'react';


// Component outputs to the user all bugs
// that are returned from the database.
export function BugsIndex() {

    // bugsList is a collection that contains all bug
    // objects returned from the database, that is populated
    // using the useState hook.
    const [bugsList, setBugsList] = useState([]);

    // useEffect hook sends a GET request to API endpoint everytime
    // the BugsIndex component is rendered.
    useEffect(() => {
        fetch('https://projectsmanagementapi.azurewebsites.net/api/Bugs/GetAllBugs')
        .then(response => response.json())
        .then(data => setBugsList(data))
    },[])

    return (
        <>
        <div className="container">
            <div className="row my-5 d-sm-inline-flex d-none">
            {bugsList ? ( bugsList.map(bug => {
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
                                        {/*Anonymous function uses switch statement to set the priority color based on the bug's priority.*/}
                                        {(() => {
                                            switch(bug.priority) {
                                                case "Low": 
                                                    return <p className="card-text blink" id="low-priority">{bug.priority} Priority</p>
                                                case "Medium":
                                                    return <p className="card-text blink" id="medium-priority">{bug.priority} Priority</p>
                                                case "High": 
                                                    return <p className="card-text blink" id="high-priority">{bug.priority} Priority</p>
                                            }
                                        })()}
                                            {/*Bug object is passed as a property to the ViewBug component
                                            to render the individual bug object for the user.*/}
                                            <Link to={`/viewbug/${bug.bugId}`} className="card-link"></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })) : <h2>Loading... </h2>}
            </div>
            <div className="text-center">
                <Link to="/AddBug" className="my-5 btn btn-md btn-secondary shadow">+ Add a bug</Link>
            </div>
        </div>
        </>
    )
}