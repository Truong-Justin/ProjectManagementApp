import React from 'react';
import { Link } from 'react-router-dom'; 

export function IndexNav() {
    return (
        <div className="container">
            <div className="text-center my-3">
                <button className="btn btn-sm btn-secondary shadow mx-1">
                    <Link className="text-light" to={'/'}>Projects</Link>
                </button>
                <button className="btn btn-sm btn-secondary shadow mx-1">
                    <Link className="text-light" to={'/BugsIndex'}>Bugs</Link>
                </button>
                <button className="btn btn-sm btn-secondary shadow mx-1">
                    <Link className="text-light" to={'/EmployeesIndex'}>Employees</Link>
                </button>
                <button className="btn btn-sm btn-secondary shadow mx-1">
                    <Link className="text-light" to={'/ProjectManagersIndex'}>Employees</Link>
                </button>
            </div>
        </div>
    )
}