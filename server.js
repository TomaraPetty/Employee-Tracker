const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "selection",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add", "View", "Update"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.selection === "Add") {
        add();
      }
      if (answer.selection === "View") {
        view();
      }
      else if(answer.postOrBid === "Update") {
        update();
      } else{
        connection.end();
      }
    });
}

// function to handle posting new items up for auction
function add() {
  // prompt for info about the item being put up for auction
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
