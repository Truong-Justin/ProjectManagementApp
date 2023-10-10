import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"; 

export function IndexNav() {
    return (
        <div class="container">
            <div class="text-center my-3">
                <a href="/Projects/ProjectsIndex" class="btn-sm btn-secondary shadow mx-1">
                    Projects
                </a>
                <a href="/Bugs/BugsIndex" class="btn-sm btn-secondary shadow mx-1">
                    Bugs
                </a>
                <a href="/Employees/EmployeeIndex" class="btn-sm btn-secondary shadow mx-1">
                    Employees
                </a>
                <a href="/ProjectManagers/ProjectManagerIndex" class="btn-sm btn-secondary shadow mx-1">
                    Managers
                </a>
            </div>
        </div>
    )
}