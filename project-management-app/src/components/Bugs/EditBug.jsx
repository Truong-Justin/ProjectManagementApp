import React, { useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Component lets the user 
// perform a full or partial
// update of a selected bug record.
export function EditBug() {
    const location = useLocation();
    const { bug } = location.state;
    const [employeesList, setEmployeesList] = useState([]);
    const navigate = useNavigate();
    const {
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm({ defaultValues: {priority: bug.priority,
                                  assignment: bug.assignment,
                                  description: bug.description}});

    // Sends a GET request to get all
    // the employee first and last names
    // within the employees table.
    async function getEmployees() {
        const response = await fetch('https://projectsmanagementapi.azurewebsites.net/api/Employees/GetEmployeeNames');
        const employees = await response.json();
        return employees;
    }

    // Sends a PUT request to the API
    // endpoint to perform a full or 
    // partial update of the chosen record.
    const onSubmit = async (data) => {
        await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Bugs/UpdateBug?id=${bug.bugId}&description=${data.description}&priority=${data.priority}&assignment=${data.assignment}`, {
            method: "PUT"
        });
        navigate("/bugsindex");
    }

    // Sets the state of the employeesList
    // collection, that is used to populate
    // a drop-down menu for the user to 
    // re-assign the bug to a different employee.
    useEffect(() => {
        async function fetchData() {
            try {
                const employees = await getEmployees();
                setEmployeesList(employees);
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
                        <h1 className="mt-3 text-center text-decoration-underline">Edit Bug</h1>
                        <hr />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card px-5 py-5 mx-5 my-5 shadow">
                                <div className="row my-5">
                                    <div className="col">
                                        <div className="form-outline">
                                            <h4 className="text-decoration-underline">Priority</h4>
                                            <select name="priority" {...register("priority")} className="form-control shadow w-75 bg-light">
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <h4 className="text-decoration-underline">Assignment</h4>
                                            <select name="assignment" {...register("assignment")} className="form-control shadow w-75 bg-light">
                                                <option value={bug.assignment}>Select an employee to re-assign</option>
                                                {employeesList.map(employee => {
                                                    return <option key={employee.value} value={employee.text}>{employee.text}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-5">
                                    <div className="form-outline">
                                        <h4 className="text-decoration-underline">Description</h4>
                                        <textarea placeholder="Enter a description." rows="4" type="text" name="description" {...register("description", {required: true})} className="form-control shadow"></textarea>
                                        {errors.description?.type === "required" && (
                                            <p className="errorMsg text-danger">A description is required.</p>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <Link to={`/viewbug/${bug.bugId}`} className="btn btn-secondary">Back</Link>
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