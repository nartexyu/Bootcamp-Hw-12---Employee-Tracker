// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

// MySQL Connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "nathanielyu917",
    database: "employeeDB"
});

// List of actions
const actions = [
    {
        type: "list",
        message: "What would you like to do?",
        choices: [
                    'ADD DEPARTMENT', 
                    'ADD ROLE', 
                    'ADD EMPLOYEE', 
                    'VIEW DEPARTMENTS', 
                    'VIEW ROLES', 
                    'VIEW EMPLOYEES', 
                    'UPDATE EMPLOYEE ROLE',
                    'EXIT'
                 ],
        name: "action"
    }
];

// Switch case function forother functions
async function init() {
    const answers = await inquirer.prompt(actions);
    switch (answers.action) {
        case 'ADD DEPARTMENT':
            addDepartment();
            break;
        case 'ADD ROLE':
            addRole();
            break;
        case 'ADD EMPLOYEE':
            addEmployee();
            break;
        case 'VIEW DEPARTMENTS':
            viewDepartments();
            break;
        case 'VIEW ROLES':
            viewRoles();
            break;
        case 'VIEW EMPLOYEES':
            viewEmployees();
            break;
        case 'UPDATE EMPLOYEE ROLE':
            updateEmployeeRole();
            break;
        default:
            connection.end();
            break;
    }
}

// Function to add department to db 
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What department would you like to add?',
            name: 'department'
        }
    ]).then(answers => {
        connection.query("INSERT INTO department SET ?", { name: answers.department }, function(err, data) {
            if (err) throw err;
            console.log("Department added!");
            init();
        });
    });
}

// Function to add role to db
function addRole() {
    connection.query("SELECT * FROM department", function(err, data) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                message: 'What role would you like to add?',
                name: 'role'
            },
            {
                type: 'input',
                message: "What is this role's salary?",
                name: 'salary'
            },
            {
                type: "list",
                message:"Which department does this role work in?",
                choices: function() {
                    const options = [];
                    for(let i = 0; i < data.length; i++) {
                        options.push(data[i].name);
                    }
                    return options;
                },
                name: 'department'
            }
        ]).then(answers => {
            for(let i = 0; i < data.length; i++) {
                if(answers.department === data[i].name) {
                    answers.department_id = data[i].id;
                }
            }
            connection.query("INSERT INTO role SET ?", {
                title: answers.role,
                salary: answers.salary,
                department_id: answers.department_id
            },
            function(err, res) {
                if (err) throw err;
                console.log("Role added!");
                init();
            });
        });
    });
}

// Function to add employee to db
function addEmployee() {
    connection.query("SELECT * FROM role", function(err, role) {
    connection.query("SELECT * FROM employee", function(err, emp) {
        inquirer.prompt([
            {
                type: 'input',
                message: "What is the employee's first name?",
                name: 'first_name'
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'last_name'
            },
            {
                type: 'list',
                message: "What is this employee's role?",
                choices: function() {
                    const options = [];
                    for(let i = 0; i < role.length; i++) {
                        options.push(role[i].title);
                    }
                    return options;
                },
                name: 'role'
            },
            {
                type: 'list',
                message: "Who is this employee's manager?",
                choices: function() {
                    const options = [];
                    for(let i = 0; i < emp.length; i++) {
                        options.push(emp[i].first_name + " " + emp[i].last_name);
                    }
                    options.push("No Manager");
                    return options;
                },
                name: 'manager'
            }
        ]).then(answers => {
            for(let i = 0; i < role.length; i++) {
                if(answers.role === role[i].title) {
                    answers.role_id = role[i].id;
                }
            }
            for(let i = 0; i < emp.length; i++) {
                if((answers.manager) === (emp[i].first_name + " " + emp[i].last_name)) {
                    answers.manager_id = emp[i].id;
                }
            }
            connection.query("INSERT INTO employee SET ?", {
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: answers.role_id,
                manager_id: answers.manager_id
            },
            function(err, res) {
                if (err) throw err;
                console.log("Employee added");
                init();
            });
        });
    });
    });
}

// Function to view departments that are in db
function viewDepartments() {
    connection.query("SELECT * FROM department", function(err, data) {
        if (err) throw err;
        console.table(data);
        init();
    })
}

// Function to view roles that are in db
function viewRoles() {
    connection.query("SELECT * FROM role", function(err, data) {
        if (err) throw err;
        console.table(data);
        init();
    })
}

// Function to view employees that are in db
function viewEmployees() {
    connection.query("SELECT * FROM employee", function(err, data) {
        if (err) throw err;
        console.table(data);
        init();
    })
}

// Function to update employee role
function updateEmployeeRole() {
    connection.query("SELECT * FROM role", function(err, role) {
    connection.query("SELECT * FROM employee", function(err, emp) {
        inquirer.prompt([
            {
                type: 'list',
                message: "Which employee's role are you changing?",
                choices: function() {
                    const options = [];
                    for(let i = 0; i < emp.length; i++) {
                        options.push(emp[i].first_name + " " + emp[i].last_name);
                    }
                    return options;
                },
                name: 'employee'
            },
            {
                type: 'list',
                message: "What is this employee's new role?",
                choices: function() {
                    const options = [];
                    for(let i = 0; i < role.length; i++) {
                        options.push(role[i].title);
                    }
                    return options;
                },
                name: 'role'
            }
        ]).then(answers => {
            for(let i = 0; i < role.length; i++) {
                if(answers.role === role[i].title) {
                    answers.role_id = role[i].id;
                }
            }
            for(let i = 0; i < emp.length; i++) {
                if((answers.employee) === (emp[i].first_name + " " + emp[i].last_name)) {
                    answers.employee_id = emp[i].id;
                }
            }
            connection.query("UPDATE employee SET ? WHERE ?", [
                {
                    role_id: answers.role_id
                },
                {
                    id: answers.employee_id
                }
            ],
            function(err, res) {
                if (err) throw err;
                console.log("Employee role updated");
                init();
            });
        });
    });
    });
}

// Call main function
init();