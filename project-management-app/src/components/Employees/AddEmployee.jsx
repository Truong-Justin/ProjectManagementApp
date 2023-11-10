import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Component allows a user to add a new 
// employee record to the database by using sending
// a POST request to the API endpoint.
export function AddEmployee() {
    const [projectsList, setProjectsList] = useState([]);
    const navigate = useNavigate();
    const {
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm();

    // Sends a GET request to get all the 
    // project titles from the projects table. 
    async function getProjectTitles() {
        const response = await fetch('https://projectsmanagementapi.azurewebsites.net/api/Projects/GetProjectTitles');
        const projects = await response.json();
        return projects;
    }

    // Sends a POST request to the API
    // endpoint when the user submits the 
    // form data using the submit button.
    const onSubmit = async (data) => {
        await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Employees/AddEmployee?ProjectId=${data.project}&FirstName=${data.firstName}&LastName=${data.lastName}&HireDate=${data.date}&Phone=${data.phone}&Zip=${data.zip}&Address=${data.address}`, {
            method: "POST"
        });
        navigate('/employeesindex');
    }

    // Sets the state of the projectTitles collection
    // that is used to populate a drop-down menu
    // that a user can select projects from. 
    useEffect(() => {
        async function fetchData() {
            try {
                const projectTitles = await getProjectTitles();
                setProjectsList(projectTitles);
            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    },[])

    return (
        <>
        <div className="container">
            <div className="my-5 mx-auto">
                <div className="card shadow bg-light">
                    <div className="col-md-11 mx-auto">
                        <h1 className="mt-3 text-center text-decoration-underline">Add Employee</h1>
                        <hr />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card px-3 py-3 mx-3 my-4 shadow">
                                <div className="form-group mb-4 mt-4">
                                    <h4 className="text-decoration-underline">Hire Date</h4>
                                    <input type="date" name="date" {...register("date", {required: true})} className="form-control shadow"></input>
                                    {errors.date?.type === "required" && (
                                        <p className="errorMsg text-danger">A date must be selected.</p>
                                    )}
                                </div>
                                <div className="form-group mb-4">
                                    <h4 className="text-decoration-underline">First Name</h4>
                                    <input type="text" name="firstName" placeholder="Enter a first name." {...register("firstName", {required: true})} className="form-control shadow"></input>
                                    {errors.firstName?.type === "required" && (
                                        <p className="errorMsg text-danger">A first name is required.</p>
                                    )}
                                </div>
                                <div className="form-group mb-4">
                                    <h4 className="text-decoration-underline">Last Name</h4>
                                    <input type="text" name="lastName" placeholder="Enter a last name." {...register("lastName", {required: true})} className="form-control shadow"></input>
                                    {errors.lastName?.type === "required" && (
                                        <p className="errorMsg text-danger">A last name is required.</p>
                                    )}
                                </div>
                                <div className="form-group mb-4">
                                    <h4 className="text-decoration-underline">Phone</h4>
                                    <input type="text" name="phone" placeholder="Enter a phone number." {...register("phone", {required: true})} className="form-control shadow"></input>
                                    {errors.phone?.type === "required" && (
                                        <p className="errorMsg text-danger">A phone number is required.</p>
                                    )}
                                </div>
                                <div className="form-group mb-4">
                                    <h4 className="text-decoration-underline">Zip</h4>
                                    <input type="text" name="zip" placeholder="Enter a zipcode." {...register("zip", {required: true})} className="form-control shadow"></input>
                                    {errors.zip?.type === "required" && (
                                        <p className="errorMsg text-danger">A zip code is required.</p>
                                    )}
                                </div>
                                <div className="form-group mb-4">
                                    <h4 className="text-decoration-underline">Address</h4>
                                    <input type="text" name="address" placeholder="Enter an address" {...register("address", {required: true})} className="form-control shadow"></input>
                                    {errors.address?.type === "required" && (
                                        <p className="errorMsg text-danger">An address is required.</p>
                                    )}
                                </div>
                                <div className="form-group mb-4">
                                    <h4 className="text-decoration-underline">Project Assigned-To</h4>
                                    <select name="project" {...register("project", {required: true})} className="form-control shadow bg-light">
                                        <option value="">Select a project</option>
                                        {projectsList.map(project => {
                                            return <option key={project.value} value={project.value}>{project.text}</option>
                                        })}
                                    </select>
                                    {errors.project?.type === "required" && (
                                        <p className="errorMsg text-danger">A project must be selected.</p>
                                    )}
                                    
                                </div>
                                <hr />
                                <div>
                                    <Link to={"/employeesindex"} className="btn btn-secondary">Back</Link>
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
