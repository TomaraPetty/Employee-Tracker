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
  connection.query("SELECT employee.id", function(err, results) {
    if (err) throw err;
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
        name: "role",
        type: "input",
        message: "What is the employee's role?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the employee's salary?"
      },
      {
        name: "department",
        type: "input",
        message: "What is the employee's department?"
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO auctions SET ?",
        {
          firstName_name: answer.firstName,
          lastName_name: answer.lastName,
          role_name: answer.role,
          salary_name: answer.salary,
          department_name: answer.department
        },
        function(err) {
          if (err) throw err;
          console.log("Your employee was created successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

function view() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM employee", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            const choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].firstName_name);
            }
            return choiceArray;
          },
          message: "What employee would you like to view?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        const chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].firstName_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if bid was high enough
        if (chosenItem.firstName_name) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE auctions SET ? WHERE ?",
            [
              {
                role: answer.role
              },
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Successfully updated employee information!");
              start();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Could not update, try again...");
          start();
        }
      });
  });
}
