import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Component allows a user to add a new 
// project record to the database by using sending
// a POST request to the API endpoint.
export function AddProject() {
    const [projectManagersList, setProjectManagers] = useState([]);
    const navigate = useNavigate();
    const {
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm();

    // Sends a GET request to get all the 
    // project manager names from the 
    // project managers table.
    async function getProjectManagerNames() {
        const response = await fetch('https://projectsmanagementapi.azurewebsites.net/api/ProjectManager/GetProjectManagerNames');
        const projectManagers = response.json();
        return projectManagers;
    }

    // Sends a POST request to the API
    // endpoint when the user submits the 
    // form data using the submit button.
    const onSubmit = async (data) => {
        await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Projects/AddProject?ProjectTitle=${data.projectTitle}&ProjectManagerId=${data.projectManager}&Date=${data.date}&Description=${data.description}&Priority=${data.priority}`, {
            method: "POST"
        });
        navigate("/");
    }

    // Sets the state of the projectManagerNames
    // collection that is used to populate a drop-down
    // menu that a user can select project managers from.
    useEffect(() => {
        async function fetchData() {
            try {
                const projectManagerNames = await getProjectManagerNames();
                setProjectManagers(projectManagerNames);
            } catch(error) {
                console.log(error)
            }
        }
        fetchData();
    },[])

    return (
        <>
        {/*Mobile UI*/}
        {/* <div className="container d-sm-none">
            <div className="my-5 mx-auto">
                <div className="card shadow bg-light">
                    <div className="col-md-11 mx-auto">
                        <h1 className="mt-3 text-center text-decoration-underline">Add Project</h1>
                        <hr />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card px-3 py-3 mx-3 my-4 shadow">
                                <div className="row mt-5">
                                    <div className="col text-center mx-auto">
                                        <h4 className="text-decoration-underline text-center">Project Title</h4>
                                        <textarea placeholder="Enter a project title." rows="2" type="text" name="projectTitle" {...register("projectTitle")} className="form-control mx-auto text-center w-75"></textarea>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <h4 className="text-decoration-underline text-center">Project Manager Assignment</h4>
                                    <select className="form-control shadow w-75 center-select-options mx-auto" name="projectManager" {...register("projectManager")}>
                                        <option value="">Select a manager to assign</option>
                                        {projectManagersList.map(projectManager => {
                                            return <option key={projectManager.value} value={projectManager.value}>{projectManager.text}</option>
                                        })}
                                    </select>
                                    {errors.projectManager?.type === "required" && (
                                        <p className="errorMsg text-danger">A project manager must be assigned.</p>
                                    )}
                                </div>
                                <div className="row mt-5">
                                    <h4 className="text-decoration-underline text-center">Start Date</h4>
                                    <input type="date" name="date" {...register("date")} className="shadow form-control w-75 mx-auto text-center" />
                                </div>
                                <div className="row mt-5">
                                    <h4 className="text-decoration-underline text-center">Priority</h4>
                                    <select name="priority" {...register("priority")} className="form-control shadow w-75 center-select-options mx-auto">
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                                <div className="row my-5">
                                    <h4 className="text-decoration-underline text-center">Description</h4>
                                    <textarea placeholder="Enter a description." rows="4" type="text" name="description" {...register("description")} className="form-control mx-auto text-center w-75"></textarea>
                                </div>
                                <hr />
                                <div className="text-center">
                                    <Link to="/projectsindex" className="btn btn-secondary">Back</Link>
                                    <input type="submit" value="Add Project" className="btn btn-primary shadow mx-1" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> */}
        {/*Desktop UI*/}
        <div className="container d-none d-sm-none d-md-block">
            <div className="my-5 mx-auto">
                <div className="card shadow bg-light">
                    <div className="col-md-11 mx-auto">
                        <h1 className="mt-3 text-center text-dark text-decoration-underline">Add Project</h1>
                        <hr />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card px-5 py-5 mx-5 my-5 shadow">
                                <div className="row my-5">
                                    <div className="col">
                                        <div className="form-outline">
                                            <h4 className="text-decoration-underline">Project Title</h4>
                                            <textarea placeholder="Enter a title." rows="2" type="text" name="projectTitle" {...register("projectTitle", {required: true})} className="form-control"></textarea>
                                            {errors.projectTitle?.type === "required" && (
                                                <p className="errorMsg text-danger">A project title is required.</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <h4 className="text-decoration-underline">Project Manager Assignment</h4>
                                            <select name="projectManager" {...register("projectManager", {required: true})} className="form-control bg-light shadow w-75">
                                                <option value="">Select a project manager to assign</option>
                                                {projectManagersList.map(projectManager => {
                                                    return <option key={projectManager.value} value={projectManager.value}>{projectManager.text}</option>
                                                })}
                                            </select> 
                                            {errors.projectManager?.type === "required" && (
                                                <p className="errorMsg text-danger">A project manager must be assigned.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-5">
                                    <div className="col">
                                        <div className="form-outline">
                                            <h4 className="text-decoration-underline">Start Date</h4>
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
                                    <Link to={"/"} className="btn btn-secondary">Back</Link>
                                    <button type="submit" className="btn btn-primary mx-1">Submit</button>
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