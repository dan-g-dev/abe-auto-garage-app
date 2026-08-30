-- Creates the first Admin login for Abe Garage
-- Email: admin@admin.com
-- Password: 123456
-- Run this in phpMyAdmin's SQL tab, on the abegaragemain database,
-- AFTER you've run /install once to create the tables.

INSERT INTO employee (employee_email, active_employee, added_date)
VALUES ('admin@admin.com', 1, CURRENT_TIMESTAMP);

INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone)
VALUES (LAST_INSERT_ID(), 'Admin', 'Admin', '555-555-5555');

INSERT INTO employee_pass (employee_id, employee_password_hashed)
VALUES (
  (SELECT employee_id FROM employee WHERE employee_email = 'admin@admin.com'),
  '$2b$10$nSIdQzo3wMCFr2qm4wQLJejSUeQN4NK0nm0cn4f5Sc9TpJVZsppAW'
);

INSERT INTO employee_role (employee_id, company_role_id)
VALUES (
  (SELECT employee_id FROM employee WHERE employee_email = 'admin@admin.com'),
  (SELECT company_role_id FROM company_roles WHERE company_role_name = 'Admin')
);
