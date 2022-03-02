const express = require('express');
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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


inquirer.prompt(
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
                        

                        db.query(sql, [answer.name], `SELECT * FROM departments`, (res) => {
                            //console.log(`Successs ${result} is now added to departments!`)
                            console.table(res);
                        
                        });
            
            });
    };
});



// View all departments
/*app.get('/api/departments', (req, res) => {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json( {error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Add  a department
app.post('/api/departments', ({ body }, res) => {
    const errors= inputCheck(body, 'name');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO departments (name)
        VALUES (?)`;
        const params = [body.name];

    db.query(sql, params, (err, result) => {
            if(err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: body
            });
        
    });

});

//View all roles
app.get('/api/roles', (req, res) => {
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
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//view all employees
app.get('/api/employees', (req, res) => {
    const sql = `SELECT * FROM employees`

    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/