import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function ViewEmployee() {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState({});
    const [project, setProject] = useState({});
    const navigate = useNavigate();

    // Sends a GET request to get the
    // selected employee for viewing. 
    async function getEmployee() {
        const response = await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Employees/GetEmployeeById?id=${employeeId}`);
        const data = await response.json();
        return data;
    }

    // Sends a GET request to get the 
    // project the selected employee
    // is assigned to. 
    async function getProject(employee) {
        const response = await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Projects/GetProjectById?projectId=${employee.projectId}`);
        const data = await response.json();
        return data;
    }

     // Send a DELETE request to API endpoint
    // to delete the employee. Then the user is 
    // redirected back to the employeesindex page.
    async function deleteEmployee() {
        await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Employees/DeleteEmployee?id=${employeeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(null)
        });
        navigate("/employeesindex");
    }

    // Sets the state of the employee and
    // project objects whenever the ViewEmployee
    // component is rendered.
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
        <motion.div className="container d-none d-sm-none d-md-block"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}>
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
                                {/*Pass the project object to the EditEmployee component so we won't have to 
                                make another GET request to get the selected employee's data.*/}
                                <Link to="/editemployee" state={{employee}} className="btn btn-dark mx-1">Edit Employee</Link>
                                <button onClick={() => deleteEmployee()} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
        <hr />
        </>
    )
}