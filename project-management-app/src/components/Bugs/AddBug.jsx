import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';


export function AddBug() {
    const [projectsList, setProjectsList] = useState([]);
    const [employeesList, setEmployeesList] = useState([]);
    const navigate = useNavigate();

    async function getProjectTitles() {
        const response = await fetch('https://projectsmanagementapi.azurewebsites.net/api/Projects/GetProjectTitles');
        const projects = await response.json();
        return projects;
    }

    async function getEmployeeNames() {
        const response = await fetch('https://projectsmanagementapi.azurewebsites.net/api/Employees/GetEmployeeNames');
        const employees = await response.json();
        return employees;
    }

    const {register, handleSubmit, formState: { errors },} = useForm();

    const onSubmit = async (data) => {
        await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Bugs/AddBug?Assignment=${data.employee}&ProjectId=${data.project}&Date=${data.date}&Description=${data.description}&Priority=${data.priority}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
        });
        navigate("/bugsindex");

    }

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
        <div className="container d-none d-sm-none d-md-block">
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
        </div>
    )
    
}