import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export function ViewEmployee() {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState({});
    const [project, setProject] = useState({});

    async function getEmployee() {
        const response = await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Employees/GetEmployeeById?id=${employeeId}`);
        const data = await response.json();
        return data;
    }

    async function getProject(employee) {
        const response = await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Projects/GetProjectById?projectId=${employee.projectId}`);
        const data = await response.json();
        return data;
    }

    useEffect(() => {
        async function fetchData() {
            const employee = await getEmployee();
            setEmployee(employee);

            const project = await getProject(employee);
            setProject(project);
        }
        fetchData();
    },[])

    return (
        <>
        <p>{employee.employeeId}</p>
        <p>{employee.firstName}</p>
        <p>{employee.lastName}</p>
        <p>{project.projectTitle}</p>
        </>
    )
}