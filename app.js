const mysql = require('mysql2');
const inquirer = require('inquirer');

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

/*//GET all departments
db.query(`SELECT * FROM departments`, (err, rows) => {
    console.log(rows);
});*/
db.query(`SELECT roles.*, departments.name
AS title
FROM roles
LEFT JOIN departments 
ON roles.department_id = departments.id`, (err, rows) => {
   
});


/*//GET a single department
db.query(`SELECT * FROM departments WHERE id = 1`, (err,row) => {
    if (err) {
        console.log(err);
    }
    console.log(row);
});*/
db.query(`SELECT roles.*, departments.name
AS department_name
FROM roles
LEFT JOIN departments
ON roles.department_id = departments.id
WHERE roles.id = 1`, (err, rows) => {
    if (err) {
        console.log(err);
    }
    console.log(rows);
});

/*//DELETE a department
db.query(`DELETE FROM departments WHERE id = ?`, 1, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});*/

/*//ADD a department
const sql = `INSERT INTO departments (name)
            VALUES (?)`;
const params = ['InfoTech'];

db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});*/
