const mysql = require('mysql');
const inquirer = require('inquirer');
const { printTable } = require('console-table-printer');
const figlet = require('figlet');

figlet('Employee Tracker', function (err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data);
});

// Create connection to sql database.
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'MyMySQL1029',
  database: 'employee_db',
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

// Prompt user for what they would like to do.
function start() {
  inquirer
    .prompt({
      name: 'selection',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'Add employee',
        'Add department',
        'Add role',
        'View employee',
        'View department',
        'View role',
        'Update employee role',
        'Exit',
      ],
    })
    .then(answer => {
      switch (answer.selection) {
        case 'Add employee':
          addEmployee();
          break;

        case 'Add department':
          addDepartment();
          break;

        case 'Add role':
          addRole();
          break;

        case 'View employees':
          viewEmployee();
          break;

        case 'View department':
          viewDepartment();
          break;

        case 'View role':
          viewRole();
          break;

        case 'Update employee role':
          update();
          break;

        case 'Exit':
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
        name: 'first_name',
        type: 'input',
        message: "Employee's first name?",
      },
      {
        name: 'last_name',
        type: 'input',
        message: "Employee's last name?",
      },
      // {
      //   name: "managerID",
      //   type: "input",
      //   message: "What is the employee's manager ID?"
      // },
      // {
      //   name: "department",
      //   type: "choices",
      //   message: "What is the employee's department?"
      // }
    ])
    .then(function (answer) {
      const query = 'INSERT INTO employee SET ?';
      connection.query(query, answer, (err, res) => {
        if (err) throw err;
        start();
      });
    });

  function addDepartment() {
    inquirer
      .prompt({
        type: 'input',
        message: 'Department name:',
        name: 'name',
      })
      .then(function (answer) {
        const query = 'INSERT INTO department SET ?';
        connection.query(query, answer, (err, res) => {
          if (err) throw err;
          start();
        });
      });
  }
}

function addRole() {
  // connection.query("SELECT * FROM department", (err, department) => {
  //     let departments = department.map(department => department.name);
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter role:',
        name: 'title',
      },
      {
        type: 'input',
        message: 'Enter salary:',
        name: 'salary',
      },
      {
        type: 'list',
        message: 'Choose department:',
        choices: departments,
        name: 'department',
      },
    ])
    .then(function (answer) {
      const departmentObject = department.find(
        department => department.name === answer.department
      );

      const query = 'INSERT INTO role SET ?';
      connection.query(
        query,
        answer,
        // {
        //     title: answer.title,
        //     salary: answer.salary,
        //     department_id: departmentObject.id

        // },

        (err, res) => {
          if (err) throw err;
          start();
        }
      );
    });
}

const viewEmployee = () => {
  const query = 'SELECT * FROM employee';
  connection.query(query, function (err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
};

function viewRole() {
  const query = 'SELECT * FROM role';
  connection.query(query, function (err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
}

function viewDepartment() {
  const query = 'SELECT * FROM department';
  connection.query(query, function (err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
}

const update = () => {
  inquirer
    .prompt([
      {
        name: 'update',
        type: 'input',
        message: 'Enter employee ID you would like to update',
      },
      {
        name: 'newRole',
        type: 'input',
        message: "Enter employee's new role",
      },
    ])
    .then(function (answer) {
      const query = 'UPDATE role SET title = ? WHERE = ?';
      connection.query(
        query,
        [req.body.quote, req.params.id],
        function (err, res) {
          if (err) throw err;
          console.table(res);
        }
      );
      start();
    });
};
