import React from 'react';
import { Link } from 'react-router-dom';
import Bug from '/src/assets/laptop-bug.png';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Spinner from 'react-bootstrap/Spinner';


// Component outputs to the user all bug records
// that exist in the database.
export function BugsIndex() {
    const [bugsList, setBugsList] = useState(null);

    // Function returns the correct outline
    // color for the priority level using the 
    // bug object's priority property. 
    function getPriority(bug) {
        switch(bug.priority) {
            case "Low": 
                return <p className="card-text shadow blink" id="low-priority">{bug.priority} Priority</p>
            case "Medium":
                return <p className="card-text shadow blink" id="medium-priority">{bug.priority} Priority</p>
            case "High": 
                return <p className="card-text shadow blink" id="high-priority">{bug.priority} Priority</p>
        }
    }

    // Calls an API endpoint and sets the 
    // state of the bugsList with all the bug records
    // when the BugsIndex component is rendered.
    useEffect(() => {
        async function fetchBugs() {
            try {
                const response = await fetch('https://projectsmanagementapi.azurewebsites.net/api/Bugs/GetAllBugs');
                const bugs = await response.json();
                setBugsList(bugs);
            } catch(error) {
                console.log(error);
            }
        }
        fetchBugs();
    },[])

    return (
        <motion.div className="container"
        initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div className="row my-5 d-sm-inline-flex d-none">
            {bugsList ? ( bugsList.map(bug => {
                return (
                    <div className="col-md-4 mb-3" key={bug.bugId}>
                        <motion.div className="card mb-3 shadow" id="card-color-transition"
                        whileHover={{scale: 1.05}} whileTap={{scale: .9}}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={Bug} className="img-fluid center-image" alt="lightbulb picture"></img>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title card-text-color" id="text-underline">Bug Id: {bug.bugId}</h5>
                                        <p className="card-text card-text-color">{bug.description.substring(0, 70)}...</p>
                                        <p className="card-text"><small className="card-date-color">Date Submitted: {bug.date}</small></p>
                                        {getPriority(bug)}
                                        <Link to={`/viewbug/${bug.bugId}`} className="card-link"></Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )
            })) : (<Spinner className="center-loader" animation="border" role="status">
                       <span className="visually-hidden">Loading...</span>
                  </Spinner>)}
            </div>
            <div className="text-center">
                <Link to="/AddBug" className="my-5 btn btn-md btn-secondary shadow">+ Add a bug</Link>
            </div>
        </motion.div>
    )
}