import React from 'react';
import Person from '/src/assets/person-picture.png';
import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';


// Component sends a GET request to GetAllBugs
// API endpoint and returns all the employees objects 
// to user 
export function EmployeesIndex() {
    const [employeesList, setEmployeesList] = useState(null);

    useEffect(() => {
        async function fetchEmployees() {
            try {
                const response = await fetch('https://projectsmanagementapi.azurewebsites.net/api/Employees/GetAllEmployees')
                const employees = await response.json();
                setEmployeesList(employees);
            } catch(error) {
                console.log(error);
            }
        }
        fetchEmployees();
    },[])

    return (
        <>
        <div className="container">
            <div className="row my-5 d-sm-inline-flex d-none">
            {employeesList ? ( employeesList.map(employee => {
                return (
                    <div className="col-md-4 mb-3" key={employee.employeeId}>
                        <div className="card mb-3 shadow bg-light">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={Person} className="img-fluid center-image" alt="lightbulb picture"></img>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title" id="text-underline">{employee.firstName} {employee.lastName}</h5>
                                        <p className="card-text">Employee Id: {employee.employeeId}</p>
                                        <p className="card-text"><small className="text-muted">Hire Date: {employee.hireDate}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })) : (<Spinner className="center-loader" animation="border" role="status">
                       <span className="visually-hidden">Loading...</span>
                   </Spinner>)}
            </div>
        </div>
        </>
    )
}