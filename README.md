# Project Management App
---

## Project Description
A full-stack web application that lets a user manage projects, bugs, project managers, and employees. The app shows a list of `employees and bugs that belong to a selected project`, the `projects a project manager is in charge of`, and the `project an employee is assigned to`. This app utilizes a REST API made with C# and ASP.NET Core Web API that handles the back-end services, and a ReactJS front-end that lets the user: create, read, update, and delete records from a Microsoft SQL Server database hosted on Azure SQL. React-Hook-Forms was used to collect the user inputted data using a form and sent to the REST API using the built-in JavaScript Fetch API, and React-Router was used to handle navigation between the different pages within the application. 


---
## How to run the web application
1. The application is deployed and hosted on Microsoft Azure and can be accessed by visiting [https://projectmanagement.justintruong.studio](https://projectmanagement.justintruong.studio).


## How to use the project
1. Visit the application on any browser

2. To add a new record, click the "+ Add" button near the bottom of the screen
    - Fill in the fields for the new record
    - Click the "Submit" button to add the new record
    
3. To View a record, click on a card to view the details of ther record

4. To Edit/Update a record, click on the "Edit" button of the record to perform a full/partial update
    - Fill in the new fields to update the bug record with
    - Click the "Save" button to update the selected record 
    
5. To Delete a record, click on the card to be deleted 
    - Click the "Delete" button to delete the selected record


---
## Technology used
1. JavaScript and ReactJS
2. HTML/CSS, Bootstrap 5, and JSX
3. React-Hook-Form library
4. React-Router library
5. Azure Static Web Apps for deploymant and hosting
6. A REST API made with C#, ASP.NET Core Web API, and Microsoft SQL Server that can be accessed by visiting [https://github.com/Truong-Justin/ProjectManagementAPI](https://github.com/Truong-Justin/ProjectManagementAPI).




