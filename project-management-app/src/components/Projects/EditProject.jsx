import React, { useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';

// Component lets the user 
// perform a full or partial
// update of a selected project record.
export function EditProject() {
    const location = useLocation();
    const { project }  = location.state;
    const navigate = useNavigate();
    const [projectManagersList, setProjectManagersList] = useState([]);
    const {
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm({defaultValues: {projectTitle: project.projectTitle, 
                                 projectManager: project.projectManagerId,
                                 priority: project.priority,
                                 description: project.description}});

    // Sends a GET request to get all the 
    // project manager names from the project
    // managers table. 
    async function getAllProjectManagerNames() {
        const response = await fetch('https://projectsmanagementapi.azurewebsites.net/api/ProjectManager/GetProjectManagerNames');
        const projectManagers = await response.json();
        return projectManagers;
    }
    
    // Sends a PUT request to the API
    // endpoint to perform a full or 
    // partial update of the chosen record.
    const onSubmit = async (data) => {
        await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Projects/UpdateProject?projectId=${project.projectId}&projectTitle=${data.projectTitle}&description=${data.description}&priority=${data.priority}&projectManagerId=${data.projectManager}`, {
            method: "PUT"
        });
        navigate('/');
    }

    // Sets the state of the projectManagersList
    // collection, that is used to populate
    // a drop-down menu for the user to 
    // re-assign the project to a different project manager.
    useEffect(() => {
        async function fetchData() {
            try {
                const projectManagers = await getAllProjectManagerNames();
                setProjectManagersList(projectManagers);
            } catch(error) {
                console.log(error)
            }
        }
        fetchData();
    },[])


    return (
        <div className="container d-none d-sm-none d-md-block">
            <div className="my-5 mx-auto">
                <div className="card shadow bg-light">
                    <div className="col-md-11 mx-auto">
                        <h1 className="mt-3 text-center text-decoration-underline">Edit Project</h1>
                        <hr />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card px-5 py-5 mx-5 my-5 shadow">
                                <div className="row my-5">
                                    <div className="col">
                                        <div className="form-outline">
                                            <h4 className="text-decoration-underline">Project Title</h4>
                                            <textarea placeholder="Enter a project title." rows="2" name="projectTitle" type="text" {...register("projectTitle", {required: true})} className="form-control w-75 shadow"></textarea>
                                            {errors.projectTitle?.type === "required" && (
                                                <p className="errorMsg text-danger">A project title is required.</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <h4 className="text-decoration-underline">Project Manager Re-assignment</h4>
                                            <select name="projectManager" {...register("projectManager")} className="form-control shadow w-75 bg-light">
                                                <option value={project.projectManagerId}>Select a manager to re-assign</option>
                                                {projectManagersList.map(projectManager => {
                                                    return <option key={projectManager.value} value={projectManager.value}>{projectManager.text}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-5">
                                    <div className="col">
                                        <div className="form-outline">
                                            <h4 className="text-decoration-underline">Priority</h4>
                                            <select name="priority" {...register("priority")} className="form-control shadow w-25 bg-light">
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
                                        <textarea placeholder="Enter a description." rows="4" type="text" name="description" {...register("description", {required: true})} className="form-control shadow"></textarea>
                                        {errors.description?.type === "required" && (
                                                <p className="errorMsg text-danger">A project description is required.</p>
                                            )}
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <Link to={`/viewproject/${project.projectId}`} className="btn btn-secondary">Back</Link>
                                    <input type="submit" value="Save" className="btn btn-primary shadow mx-1" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}