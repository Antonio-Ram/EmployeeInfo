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

db.query(`SELECT * FROM departments`, (err, rows) => {
    console.log(rows);
});