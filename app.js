const mysql = require('mysql2');
const inquirer = require('inquirer');

inquirer
    .prompt([
        {
            type: "list",
            name: "Start",
            message: "What would you like to do?",
            choices: ["View all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee"]
        }
    ]);
    
//Connect to database
const db = mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password: 'Theprotigy15!',
        database: 'tracker'
    },
    console.log('Connected to the tracker database.')
);

//GET all departments
db.query(`SELECT * FROM departments`, (err, rows) => {
    //console.log(rows);
});

//ADD a department
const sql = `INSERT INTO departments (name)
            VALUES (?)`;
const params = ['InfoTech'];

db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
    }
    //console.log(result);
});

/*//DELETE a department
db.query(`DELETE FROM departments WHERE id = ?`, 1, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});*/

//Get all roles
db.query(`SELECT roles.*, departments.name
AS name
FROM roles
JOIN departments 
ON roles.department_id = departments.id`, (err, rows) => {
    if (err) {
        console.log(err);
    }
   console.log(rows);
});

//Add a role

//Get all employees
db.query(`SELECT employees.*, roles.title
AS first_name
FROM employees
LEFT JOIN roles
ON employees.role_id = roles.id`, (err, rows) =>{
    //console.log(rows);
});

//Add an employee

//Update an employee

/*//DELETE a department
db.query(`DELETE FROM departments WHERE id = ?`, 1, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});*/


