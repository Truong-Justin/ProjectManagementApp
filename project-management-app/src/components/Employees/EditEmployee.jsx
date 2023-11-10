import React, { useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Component lets the user 
// perform a full or partial
// update of a selected employee record.
export function EditEmployee() {
    const [projectsList, setProjectsList] = useState([]);
    const location = useLocation();
    const { employee } = location.state;
    const navigate = useNavigate();
    const {
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm({defaultValues: {project: employee.projectId, 
                                 address: employee.address,
                                 zip: employee.zip,
                                 phone: employee.phone}});

    // Sends a GET request to get all project
    // titles from the projects table.
    async function getAllProjectTitles() {
        const response = await fetch('https://projectsmanagementapi.azurewebsites.net/api/Projects/GetProjectTitles');
        const projects = await response.json();
        return projects;
    }

    // Sends a PUT request to the API
    // endpoint to perform a full or 
    // partial update of the chosen record.
    const onSubmit = async (data) => {
        await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Employees/UpdateEmployee?employeeId=${employee.employeeId}&phone=${data.phone}&zip=${data.zip}&address=${data.address}&projectId=${data.project}`, {
            method: "PUT"
        });
        navigate('/employeesindex');
    }

    // Sets the state of the projectsList
    // collection, that is used to populate
    // a drop-down menu for the user to 
    // re-assign the employee to a different project.
    useEffect(() => {
        async function fetchData() {
            try {
                const projects = await getAllProjectTitles();
                setProjectsList(projects);
            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    },[])

    return (
        <>
        <div className="container d-none d-sm-none d-md-block">
            <div className="my-5 mx-auto">
                <div className="card shadow bg-light">
                    <div className="col-md-11 mx-auto">
                        <h1 className="mt-3 text-center text-decoration-underline">Edit Employee: {employee.firstName} {employee.lastName}</h1>
                        <hr />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card px-5 py-5 mx-5 my-5 shadow">
                                <div className="row my-5">
                                    <div className="col">
                                        <div className="form-outline">
                                            <h4 className="text-decoration-underline">Project Re-Assignment</h4>
                                            <select name="project" {...register("project")} className="form-control w-75 bg-light">
                                                <option value={employee.projectId}>Select a project to re-assign to</option>
                                                {projectsList.map(project => {
                                                    return <option key={project.value} value={project.value}>{project.text}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <h4 className="text-decoration-underline">Address</h4>
                                            <input type="text" name="address" {...register("address")} className="form-control shadow w-75"></input>
                                            {errors.address?.type === "required" && (
                                                <p className="errorMsg text-danger">An address is required.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-5">
                                <div className="col">
                                        <div className="form-outline">
                                            <h4 className="text-decoration-underline">Zip</h4>
                                            <input type="text" name="zip" {...register("zip")} className="form-control shadow w-25"></input>
                                            {errors.zip?.type === "required" && (
                                                <p className="errorMsg text-danger">A zip-code is required.</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <h4 className="text-decoration-underline">Phone</h4>
                                            <input type="text" name="phone" {...register("phone")} className="form-control shadow w-75"></input>
                                            {errors.phone?.type === "required" && (
                                                <p className="errorMsg text-danger">A phone number is required.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <Link to={`/viewemployee/${employee.employeeId}`} className="btn btn-secondary">Back</Link>
                                    <input type="submit" value="Save" className="btn btn-primary shadow mx-1" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <hr />
        </>
    )

}