import React from 'react';
import { Link } from 'react-router-dom';
import Person from '/src/assets/person-picture.png';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Spinner from 'react-bootstrap/Spinner';


// Component outputs to the user all employee records
// that exist in the database.
export function EmployeesIndex() {
    const [employeesList, setEmployeesList] = useState(null);

    // Calls an API endpoint and sets the 
    // state of the employeesList with all the 
    // employee records when the BugsIndex component is rendered.
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
        <div className="container">
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
            className="row my-5 d-sm-none">
            {employeesList ? ( employeesList.map(employee => {
                return (
                    <div className="col-md-4 mb-3" key={employee.employeeId}>
                        <div className="card mb-3 shadow bg-light">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={Person} className="img-fluid center-image w-25 mt-5" alt="character silhouette"></img>
                                </div>
                                <div className="col-md-8 text-center">
                                    <div className="card-body">
                                        <h5 className="card-title" id="text-underline">{employee.firstName} {employee.lastName}</h5>
                                        <p className="card-text">Employee Id: {employee.employeeId}</p>
                                        <p className="card-text"><small className="text-muted">Hire Date: {employee.hireDate}</small></p>
                                        <Link to={`/viewemployee/${employee.employeeId}`} className="card-link"></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })) : (<Spinner className="center-loader" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </Spinner>)}
            </motion.div>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
            className="row my-5 d-sm-inline-flex d-none">
            {employeesList ? ( employeesList.map(employee => {
                return (
                    <div className="col-md-4 mb-3" key={employee.employeeId}>
                        <motion.div className="card mb-3 shadow" id="card-color-transition"
                        whileHover={{scale: 1.05}} whileTap={{scale: .9}}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={Person} className="img-fluid center-image img-scale" alt="character silhouette"></img>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title card-text-color" id="text-underline">{employee.firstName} {employee.lastName}</h5>
                                        <p className="card-text card-text-color">Employee Id: {employee.employeeId}</p>
                                        <p className="card-text"><small className="card-date-color">Hire Date: {employee.hireDate}</small></p>
                                    </div>
                                </div>
                            </div>
                            <Link to={`/viewemployee/${employee.employeeId}`} className="card-link"></Link>
                        </motion.div>
                    </div>
                )
            })) : (<Spinner className="center-loader" animation="border" role="status">
                       <span className="visually-hidden">Loading...</span>
                   </Spinner>)}
            </motion.div>
            <div className="text-center">
                <Link to="/addemployee" className="my-5 btn btn-md btn-secondary shadow">+ Add an employee</Link>
            </div>
        </div>
    )
}