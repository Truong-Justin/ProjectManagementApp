import React from 'react';
import { useState, useEffect } from 'react';


// Method sends a GET request to the ProjectManagementAPI
// to get a list of all bug objects
export function BugsIndex() {
    const [bugsList, setBugsList] = useState([]);
    useEffect(() => {
        fetch('https://projectsmanagementapi.azurewebsites.net/api/Bugs/GetAllBugs')
        .then(response => response.json())
        .then(data => setBugsList(data))
    },[])

    return (
        <>
            {bugsList.map(bug => {
                return (
                    <div key={bug.bugId}>
                        <p>{bug.description}</p>
                        <p>{bug.date}</p>
                    </div>
                )
            })}
        </>
    )
}