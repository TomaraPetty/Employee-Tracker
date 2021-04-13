-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Jimmy", "Abraham", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Mark", "Smith", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Tommy", "Rood", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Sacha","Volosov", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Jessie", "Remi", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Jamie", "Travis", 6, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Jessica", "Stevens", 7, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)

-- Roles
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineering", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Executive Assistant", 35000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Head of Touring", 75000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Marketing Director", 72000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Head of Radio", 60000, 5);

-- Departments 
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Touring");
INSERT INTO department (name)
VALUE ("Radio");
INSERT INTO department (name)
VALUE ("Assistant");
INSERT INTO department (name)
VALUE ("Marketing");

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;