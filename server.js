const mysql = require("mysql");
const inquirer = require("inquirer");
const { printTable } = require("console-table-printer");
const figlet = require('figlet');

figlet('Employee Tracker', function (err, data) {
  if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
  }
  console.log(data)
});

// Create connection to sql database.
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "MyMySQL1029",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

// Prompt user for what they would like to do.
function start() {
  inquirer
    .prompt({
      name: "selection",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add employee",
        "Add department",
        "View role", 
        "View employee",
        "View department",
        "View role", 
        "Update employee role",
        "Exit"
      ]
    })
    .then((answer) => {
      switch (answer.selection) {
        case "Add employee":
          addEmployee();
          break;

        case "Add department":
          addDepartment();
          break;

        case "Add role":
          addRole();
          break;

        case "View employees":
          viewEmployee();
          break;

        case "View department":
          viewDepartment();
          break;

        case "View role":
          viewRole();
          break;

        case "Update employee role":
          update();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

// Add employee
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the employee's ID?"
      },
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "roleID",
        type: "input",
        message: "What is the employee's role ID?"
      },
      {
        name: "managerID",
        type: "input",
        message: "What is the employee's manager ID?"
      },
      {
        name: "department",
        type: "input",
        message: "What is the employee's department?"
      }
    ])
    .then(function(answer) {
      const query = "INSERT INTO employee SET ?";
      connection.query(query, { id: answer.id, first_name: answer.firstName, last_name: answer.lastName, role_id: answer.roleID, manager_id: answer.managerID },
        function(err, res) {
          if (err) throw err;
          console.log("Your employee was created successfully!");
          start();
        }
      );
    });

  function viewEmployees() {
  connection.query("SELECT * FROM employee", function(err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
  }

  function viewRoles() {
    const query = "SELECT * FROM role"
    connection.query(query, function(err, results) {
      if (err) throw err;
      console.table(results);
      start();
    });
    }
   
    function viewDeparment() {
      const query = "SELECT * FROM department"
      connection.query(query, function(err, results) {
        if (err) throw err;
        console.table(results);
        start();
      });
      }
}
