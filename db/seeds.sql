INSERT INTO departments (name)
VALUES
('InfoTech'),
('HumRes'),
('Sales'),
('RnD');

INSERT INTO roles (title, salary, department_id)
VALUES
('Help Desk', 35000, 1),
('Networking', 45000, 1),
('HR Compliance', 60000, 2),
('Workplace Safetey', 55000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Antonio', 'Ramirez', 1, null),
('Luis', 'Chapa', 1, null);