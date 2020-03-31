INSERT INTO department (name) 
VALUES 
('Sales'),
('Legal'),
('Finance'),
('IT');

INSERT INTO role (title, salary, department_id)
VALUES 
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lawyer', 190000, 2),
('Legal Team Lead', 250000, 2),
('Accountant', 125000, 3),
('Software Engineer', 120000, 4),
('Lead Software Engineer', 180000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
('Peter', 'Parker', 4, null),
('Clark', 'Kent', 3, 1),
('Tony', 'Stark', 1, null),
('Peter', 'Quill', 2, 3),
('Diana', 'Prince', 5, null);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;