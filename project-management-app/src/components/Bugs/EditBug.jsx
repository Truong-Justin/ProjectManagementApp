import React, { useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select'; 
import 'react-datepicker/dist/react-datepicker.css';

// Component will let the user 
// perform a full or partial
// update of a selected bug record.
export function EditBug() {
    const { bugId } = useParams();
    const [bug, setBug] = useState({});
    const [employeesList, setEmployeesList] = useState({});
    const navigate = useNavigate();
    const {control, register, handleSubmit, formState: { errors },} = useForm();

    // Sends a GET request to 
    // get the selected bug's
    // attributes
    async function getBug() {
        const response = await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Bugs/GetBugById?id=${bugId}`);
        const bug = await response.json();
        return bug;
    }

    // Sends a GET request to get all
    // the employee first and last names
    // within the employees table.
    async function getEmployees() {
        const response = await fetch('https://projectsmanagementapi.azurewebsites.net/api/Employees/GetEmployeeNames');
        const employees = await response.json();
        return employees;
    }

    // Sends a PUT request to the API
    // endpoint when the user submits 
    // the form data using the submit button.
    const onSubmit =  (data) => {
        console.log(data.employee.value);
        // await fetch(`https://projectsmanagementapi.azurewebsites.net/api/Bugs/UpdateBug?date=${data.date}&description=${data.description}&priority=${data.priority}&assignment=${data.assignment}`, {
        //     method: "PUT"
        // });
        // navigate("/bugsindex");
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const bug = await getBug();
                setBug(bug);

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="employee"
                control={control} 
                rules={{required: true}}
                render={({field}) => (
                    <Select  {...field}
                    options={employeesList}
                    getOptionLabel={(option) => option.text}
                    getOptionValue={(option) => option.value}
                    defaultValue={{label: "Justin Truong", value: "Justin Truong"}}
                 />
                )}
                />
                <button type="submit">Submit</button>
                <input type="text" name="phone" {...register("phone")}></input>
        </form>
        </>
    )


}