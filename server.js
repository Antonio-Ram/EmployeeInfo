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
        };
        switch (Start) {
            case "view all roles":
                const sql = `SELECT roles.*, departments.name
                AS department_name
                FROM departments
                LEFT JOIN roles
                ON roles.department_id = departments.id`;

                db.query(sql, (err, rows) => {
                    if (err) {
                        res.status(500).json( {error: err.message });
                        return;  
                    }
                    console.table(rows);
                });
                init();
                break;
        };
        switch (Start) {
            case "view all employees":
                const sql = `SELECT * FROM employees`

                db.query(sql, (err, rows) => {
                    if(err) {
                        res.status(500).json({ error: err.message });
                        return;
                    }
                    console.table(rows);
                });
                init();
                break;
        };
        switch (Start) {
            case "add a department":
                inquirer.prompt(
                    {
                        type: "name",
                        name: "newDepartment",
                        message: "What is the name of the department?"
                    }
                ).then((answer) => { //console.log(answer);
                    const sql = `INSERT INTO departments (name)
                            VALUES (?)`;                     

                            db.query(sql, [answer.newDepartment], (result) => {
                                console.log(`Successs ${answer.newDepartment} is now added to departments!`)
                            });
                
                });
                init();
                break;
        };
    })
};

init();
