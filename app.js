const inquirer = require('inquirer');

//Default repsonse for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end;
});

