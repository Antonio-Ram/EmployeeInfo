const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');
const inquirer = require('inquirer');
const cTable = require('console.table');

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


function init() {inquirer
    .prompt(
        {
            type: "list",
            name: "Start",
            message: "What would you like to do?",
            choices: ["View all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee"]
        }
    )
    .then(({ Start }) => {
        switch (Start) {
            case "View all departments":
                    const sql = `SELECT * FROM departments`;
                
                    db.query(sql, (err, rows) => {
                        if (err) {
                            res.status(500).json( {error: err.message });
                            return;
                        }
                        console.table(rows);
                    });
                init();
                break;     
            case "view all roles":
                const roles = `SELECT roles.*, departments.name
                AS department_name
                FROM departments
                LEFT JOIN roles
                ON roles.department_id = departments.id`;

                db.query(roles, (err, rows) => {
                    if (err) {
                        res.status(500).json( {error: err.message });
                        return;  
                    }
                    console.table(rows);
                });
                init();
                break;    
            case "view all employees":
                const emp = `SELECT * FROM employees`

                db.query(emp, (err, rows) => {
                    if(err) {
                        res.status(500).json({ error: err.message });
                        return;
                    }
                    console.table(rows);
                });
                init();
                break;
            case "add a department":
                inquirer.prompt(
                    {
                        type: "name",
                        name: "newDepartment",
                        message: "What is the name of the department?"
                    }
                ).then((answer) => { //console.log(answer);
                    const add = `INSERT INTO departments (name)
                            VALUES (?)`;                     

                            db.query(add, [answer.newDepartment], (result) => {
                                console.log(`Successs ${answer.newDepartment} is now added to departments!`)
                            });
                
                });
                init();
                break;
            case "add a role":
                inquirer.prompt([
                    {
                        type: "name",
                        name: "newRole",
                        message: "What is the name of the role?"
                    },
                    {
                        type: "input",
                        name: "roleSalary",
                        message: "What is the salary for this role?"
                    },
                    {
                        type: "input",
                        name: "roleDepartment",
                        message: "What is the department id this role belongs to?"
                    }
                ]).then((answer) => { //console.log(answers);
                    const added = `INSERT INTO roles (title, salary, department_id)
                            VALUES (?,?,?)`; 

                            db.query(added, [answer.newRole, answer.roleSalary, answer.roleDepartment], (error) => {
                                console.log(error);
                                console.log('Your new role has been added!')
                            });
                })
                init();
                break;
            case "add an employee":
                inquirer.prompt([
                    {
                        type: "name",
                        name: "firstName",
                        message: "What is the first name of this employee?"
                    },
                    {
                        type: "name",
                        name: "lastName",
                        message: "What is the last name of this employee?"
                    },
                    {
                        type: "input",
                        name: "roleId",
                        message: "What is the role ID for this employee?"
                    },
                    {
                        type: "input",
                        name: "manager",
                        message: "Who is the manager for this employee (insert manager id)?"
                    }
                ]).then((answer) => { console.log(answer)
                    const adding = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                    VALUES (?,?,?,?)`;

                    db.query(adding, [answer.firstName, answer.lastName, answer.roleId, answer.manager], (error) => {
                        console.log(error);
                    });
                })
        };
    })
};

init();
