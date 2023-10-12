import React from 'react';
import { useLocation } from 'react-router-dom';
import { IndexNav } from '../IndexNav.jsx';
import { Banner } from '../Banner.jsx';

// Component renders the individual bug
// object the user selected for viewing
// using prop passed by the Link component.
export function ViewBug() {
    const location = useLocation();
    const data = location.state;

    return (
        <>
        <Banner/ >
        <IndexNav />
            <p>Id: {data.bugId}</p>
            <p>Date: {data.date}</p>
            <p>bug.priority: {data.priority}</p>
        </>
    )
}