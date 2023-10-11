import React from 'react';

export function IndexNav() {
    return (
        <div className="container">
            <div className="text-center my-3">
                <a href="/" className="btn-sm btn-secondary shadow mx-1">
                    Projects
                </a>
                <a href="/BugsIndex" className="btn-sm btn-secondary shadow mx-1">
                    Bugs
                </a>
                <a href="/EmployeesIndex" className="btn-sm btn-secondary shadow mx-1">
                    Employees
                </a>
                <a href="/ProjectManagersIndex" className="btn-sm btn-secondary shadow mx-1">
                    Managers
                </a>
            </div>
        </div>
    )
}