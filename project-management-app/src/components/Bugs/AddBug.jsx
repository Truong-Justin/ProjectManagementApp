import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

// Component allows a user to add a new 
// bug record to the database by using sending
// a POST request to the API endpoint.
export function AddBug() {
    const [projectsList, setProjectsList] = useState([]);
    const [employeesList, setEmployeesList] = useState([]);
    const navigate = useNavigate();
    const {
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm();

    // Sends a GET request to get all
    // the project titles within the 
    // projects table.
    async function getProjectTitles() {
        const response = await fetch('https://projectsmanagementapi.azurewebsites.net/api/Projects/GetProjectTitles');
        const projects = await response.json();
        return projects;
    }

    // Sends a GET request to get all
    // the employee first and last names
    // within the employees table.
    async function getEmployeeNames() {
        const response = await fetch('https://projectsmanagementapi.azurewebsites.net/api/Employees/GetEmployeeNames');
        const employees = await response.json();
        return employees;
    }

    // Sends a POST request to the API
    // endpoint when the user submits the 
    // form data using the submit button.
    const onSubmit = async (data) => {
        console.log(data);
        await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Bugs/AddBug?Assignment=${data.employee}&ProjectId=${data.project}&Date=${data.date}&Description=${data.description}&Priority=${data.priority}`, {
            method: "POST"
        });
        navigate("/bugsindex");
    }

    // Sets the state of the projectsList
    // and employeesList collections, that is used to 
    // populate a drop-down menu for the 
    // user to select employees and projects
    // from.
    useEffect(() => {
        async function fetchData() {
            try {
                const projectTitles = await getProjectTitles();
                setProjectsList(projectTitles);

                const employeeNames = await getEmployeeNames();
                setEmployeesList(employeeNames);
            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    },[])

    return (
        <>
        <motion.div className="container d-none d-sm-none d-md-block"
        initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div className="my-5 mx-auto">
                <div className="card shadow bg-light">
                    <div className="col-md-11 mx-auto">
                        <h1 className="mt-3 text-center text-dark text-decoration-underline">Add Bug</h1>
                        <hr />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card px-5 py-5 mx-5 my-5 shadow">
                                <div className="row my-5">
                                    <div className="col">
                                        <div className="form-outline">
                                            <h4 className="text-decoration-underline">Project Assignment</h4>
                                            <select name="project" {...register("project", {required: true})} className="form-control shadow bg-light w-75">
                                                <option value="">Select a project</option>
                                                {projectsList.map(project => {
                                                    return <option key={project.value} value={project.value}>{project.text}</option>
                                                })}
                                            </select>
                                            {errors.project?.type === "required" && (
                                                <p className="errorMsg text-danger">A project must be selected.</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <h4 className="text-decoration-underline">Employee Assignment</h4>
                                            <select name="employee" {...register("employee", {required: true})} className="form-control bg-light shadow w-75">
                                                <option value="">Select an employee</option>
                                                {employeesList.map(employee => {
                                                    return <option key={employee.value} value={employee.text}>{employee.text}</option>
                                                })}
                                            </select>
                                            {errors.employee?.type === "required" && (
                                                <p className="errorMsg text-danger">An employee must be assigned to the bug.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-5">
                                    <div className="col">
                                        <div className="form-outline">
                                            <h4 className="text-decoration-underline">Date Submitted</h4>
                                            <input type="date" name="date" {...register("date", {required: true})} className="form-control shadow w-50"></input>
                                            {errors.date?.type === "required" && (
                                                <p className="errorMsg text-danger">A date must be chosen.</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <h4 className="text-decoration-underline">Priority</h4>
                                            <select name="priority" {...register("priority")} className="form-control bg-light shadow w-75">
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-5">
                                    <div className="form-outline">
                                        <h4 className="text-decoration-underline">Description</h4>
                                        <textarea placeholder="Enter a description." rows="4" type="text" name="description" {...register("description", {required: true})} className="form-control"></textarea>
                                        {errors.description?.type === "required" && (
                                            <p className="errorMsg text-danger">A description is required.</p>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group mt-5">
                                    <Link to={"/bugsindex"} className="btn btn-secondary">Back</Link>
                                    <button type="submit" className="btn btn-primary mx-1">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
        <hr />
        </>
    )
    
}