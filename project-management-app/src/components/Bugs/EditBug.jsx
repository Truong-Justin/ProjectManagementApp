import React, { useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';

// Component will let the user 
// perform a full or partial
// update of a selected bug record.
export function EditBug() {
    const { bugId } = useParams();
    const [bug, setBug] = useState({});
    const [project, setProject] = useState({});
    const navigate = useNavigate();
    const {register, handleSubmit, formState: { errors },} = useForm();

    // Sends a GET request to 
    // get the selected bug's
    // attributes
    async function getBug() {
        const response = await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Bugs/GetBugById?id=${bugId}`);
        const bug = await response.json();
        return bug;
    }

    // Sends a PUT request to the API
    // endpoint when the user submits 
    // the form data using the submit button.
    const onSubmit = async (data) => {
        console.log(data);
        await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Bugs/UpdateBug?date=${data.date}&description=${data.description}&priority=${data.priority}&assignment=${data.assignment}`, {
            method: "PUT"
        });
        navigate("/bugsindex");
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const bug = await getBug();
                setBug(bug);

                const project = await getProject(bug);
                setProject(project);
            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    },[])

    return (
        <>
        {bug.description}
        {project.projectTitle}
        </>
    )


}