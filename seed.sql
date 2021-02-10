INSERT INTO department (name)
VALUES ("Accounting");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Human Resources");

INSERT INTO department (name)
VALUES ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Controller", 100000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 75000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Associate", 150000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Analyst", 95000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Financial Analyst", 60000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Human Resources Manager", 120000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Hiring Coordinator", 85000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Manager", 150000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Social Media Manager", 105000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Social Media Analyst", 75000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Shelley", "Garnet", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Donovan", "Atwood", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jenny", "Danniell", 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Leanne", "Kay", 4, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Virgie", "Mallory", 5, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brynlee", "Martinson", 6, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Hale", "Waters", 7, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Braden", "Blackbourne", 8, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Newton", "Walsh", 9, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jefferson", "Warner", 10, 8);