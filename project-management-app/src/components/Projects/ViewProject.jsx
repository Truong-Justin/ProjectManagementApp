import React from 'react';
import { useLocation } from 'react-router-dom';

export function ViewProject() {
    const location = useLocation();
    const { project } = location.state;

    return (
        <>
            <p>{project.projectId}</p>
            <p>{project.description}</p>
        </>
    )
}