INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (1, "Jimmy", "Abraham", 1, 2);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (2, "Mark", "Smith", 2, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (3, "Tommy", "Rood", 3, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (4, "Sacha","Volosov", 4, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (5, "Jessie", "Remi", 5, 9);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (6, "Jamie", "Travis", 6, 8);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (7, "Jessica", "Stevens", 7, 1);


INSERT INTO role (id, title, salary, department_id)
VALUE (8, "Software Engineering", 100000, 1);
INSERT INTO role (id, title, salary, department_id)
VALUE (9, "Executive Assistant", 35000, 2);
INSERT INTO role (id, title, salary, department_id)
VALUE (10, "Head of Touring", 75000, 3);
INSERT INTO role (id, title, salary, department_id)
VALUE (11, "Marketing Director", 72000, 4);
INSERT INTO role (id, title, salary, department_id)
VALUE (12, "Head of Radio", 60000, 5);

 
INSERT INTO department (id, name)
VALUE (1, "Engineering");
INSERT INTO department (id, name)
VALUE (2, "Touring");
INSERT INTO department (id, name)
VALUE (3, "Radio");
INSERT INTO department (id, name)
VALUE (4, "Assistant");
INSERT INTO department (id, name)
VALUE (5, "Marketing");


SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;