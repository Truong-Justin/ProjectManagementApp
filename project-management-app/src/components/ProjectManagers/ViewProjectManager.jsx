import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export function ViewProjectManager() {
    const { projectManagerId } = useParams();
    const [projectManager, setProjectManager] = useState({});
    const [projectsList, setProjectsList] = useState([]);

    async function getProjectManager() {
        const response = await fetch(`https://projectsmanagementapi.azurewebsites.net/api/ProjectManager/GetProjectManagerById?id=${projectManagerId}`);
        const data = response.json();
        return data;
    }

    async function getProjectsForManager() {
        const response = await fetch(`https://projectsmanagementapi.azurewebsites.net/api/ProjectManager/GetAllProjectsForManager?projectManagerId=${projectManagerId}`);
        const data = response.json();
        return data;
    }

    useEffect(() => {
        async function fetchData() {
            const projectManager = await getProjectManager();
            setProjectManager(projectManager);

            const projects = await getProjectsForManager();
            setProjectsList(projects);
        }
        fetchData();
    },[])


    return (
        <>
        <p>{projectManager.projectManagerId}</p>
        <p>{projectManager.firstName}</p>
        <p>{projectManager.lastName}</p>

        <ol>
            {projectsList.map(project => {
                return (
                    <li key={project.projectId}>
                        {project.projectTitle}
                    </li>
                )
            })}
        </ol>
        </>
    )
}