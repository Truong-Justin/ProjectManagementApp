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

    function deleteEmployee(employeeId) {

    }

    // Sets the state of the employee and
    // project objects
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
        <div className="container d-none d-sm-none d-md-block">
            <div className="my-5 mx-auto">
                <div className="card shadow bg-light">
                    <div className="col-md-11 mx-auto">
                        <h1 className="mt-3 text-center text-decoration-underline">Employee Details</h1>
                        <hr />
                        <div className="card px-5 py-5 my-5 shadow">
                            <div className="row my-5">
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Name</h3>
                                        <h5 className="fw-light">{employee.firstName} {employee.lastName}</h5>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Employee Id</h3>
                                        <h5 className="fw-light">{employee.employeeId}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Project Assigned-To</h3>
                                        <Link to={`/viewproject/${employee.projectId}`}>{project.projectTitle}</Link>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Hire Date</h3>
                                        <h5 className="fw-light">{employee.hireDate}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Address</h3>
                                        <h5 className="fw-light">{employee.address}</h5>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Zip Code</h3>
                                        <h5 className="fw-light">{employee.zip}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col">
                                    <div className="form-outline">
                                        <h3 className="text-decoration-underline">Phone Number</h3>
                                        <h5 className="fw-light">{employee.phone}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <Link className="btn btn-secondary shadow" to="/employeesindex">Back</Link>
                                <button onClick={deleteEmployee(employee.employeeId)} className="btn btn-danger mx-1">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}