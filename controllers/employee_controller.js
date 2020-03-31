const inquirer = require("inquirer");

const employeeModel = require("../models/employee");
const roleModel = require("../models/role");
const departmentModel = require("../models/department");
const departmentController = require("./department_controller");

const employeeController = {
    addEmployee: async function() {
        // Get all titles from the role table
        const titles = await roleModel.getAllTitles();

        // Get the list of employees from employee table
        const employees = await employeeModel.getAllEmployees();
        employees.unshift("None");

        try {
            const employee = await inquirer.prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "What is the employee's first name? "
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "What is the employee's last name? "
                },
                {
                    type: "list",
                    name: "title",
                    message: "What is employee's role? ",
                    choices: titles
                },
                {
                    type: "list",
                    name: "manager",
                    message: "Who is employee's manager?",
                    choices: employees
                }
            ]);

            employee.roleID = await roleModel.getRoleID(employee.title);
            employee.managerID = await employeeModel.getEmployeeID(employee.manager);

            await employeeModel.insertEmployee(employee);
        } catch (err) {
            if (err) throw err;
        }
    },
    removeEmployee: async function() {
        try {
            // Get the list of employees from employee table
            const employees = await employeeModel.getAllEmployees();

            const employee = await inquirer.prompt([
                {
                    type: "list",
                    name: "name",
                    message: "Which employee would you like to remove ?",
                    choices: employees
                }
            ]);

            const managers = await employeeModel.getAllManagers();

            if (managers.includes(employee.name)) {
                const managerID = await employeeModel.getEmployeeID(employee.name);
                const employeesManaged = await employeeModel.getAllEmployeesByManager(managerID);

                for (let employeeManaged of employeesManaged) {
                    employeeManaged =
                        employeeManaged["First Name"] + " " + employeeManaged["Last Name"];
                    employeeModel.setEmployeeManager(employeeManaged);
                }

                employeeModel.deleteEmployee(employee.name);
            } else {
                employeeModel.deleteEmployee(employee.name);
            }
        } catch (err) {
            if (err) throw err;
        }
    },
    updateEmployeeManager: async function() {
        try {
            // Get the list of employees
            let employees = await employeeModel.getAllEmployees();

            let employee = await inquirer.prompt([
                {
                    type: "list",
                    name: "name",
                    message: "Please select an employee: ",
                    choices: employees
                }
            ]);

            employee = employee.name;
            employees = employees.filter(el => el !== employee);

            const manager = await inquirer.prompt([
                {
                    type: "list",
                    name: "name",
                    message: "Please select an employee to assign as the manager: ",
                    choices: employees
                }
            ]);

            manager.id = await employeeModel.getEmployeeID(manager.name);

            await employeeModel.setEmployeeManager(employee, manager.id);
        } catch (err) {
            if (err) throw err;
        }
    },
    updateEmployeeRole: async function() {
        try {
            // Get the list of employees
            let employees = await employeeModel.getAllEmployees();

            let employee = await inquirer.prompt([
                {
                    type: "list",
                    name: "name",
                    message: "Please select an employee: ",
                    choices: employees
                }
            ]);

            const titles = await roleModel.getAllTitles();

            const role = await inquirer.prompt([
                {
                    type: "list",
                    name: "title",
                    message: "Please select a role as the employee's new role: ",
                    choices: titles
                }
            ]);

            role.id = await roleModel.getRoleID(role.title);

            await employeeModel.setEmployeeRole(employee.name, role);
        } catch (err) {
            if (err) throw err;
        }
    },
    displayAllEmployees: async function() {
        try {
            const employees = await employeeModel.getAllEmployeesDetails();

            for (const employee of employees) {
                if (employee["manager_id"] !== null) {
                    employee.Manager = await employeeModel.getManagerByID(employee["manager_id"]);
                    delete employee["manager_id"];
                } else {
                    employee.Manager = "None";
                    delete employee["manager_id"];
                }
            }
            //const footer = displayHeadline('All Employees');
            console.log("\n");
            console.table(employees);
            console.log("\n");
        
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    },
    displayAllEmployeesByDepartment: async function() {
        try {
            const departmentNames = await departmentController.getAllDepartmentNames();

            const department = await inquirer.prompt([
                {
                    type: "list",
                    name: "name",
                    message: "Please select a department ?",
                    choices: departmentNames
                }
            ]);

            const departmentID = await departmentModel.getDepartmentID(department.name);

            const employees = await employeeModel.getAllEmployeesByDepartment(departmentID);

            //const footer = displayHeadline(`All Employees in ${department.name}`);
            console.log("\n");
            console.table(employees);
            console.log("\n");

        } catch (err) {
            if (err) throw err;
        }
    },
    displayAllEmployeesByManager: async function() {
        try {
            const managers = await employeeModel.getAllManagers();
            const manager = await inquirer.prompt([
                {
                    type: "list",
                    name: "name",
                    message: "Please select a department ?",
                    choices: managers
                }
            ]);

            const managerID = await employeeModel.getEmployeeID(manager.name);

            const employeesManaged = await employeeModel.getAllEmployeesByManager(managerID);

            //const footer = displayHeadline(`All Employees under ${manager.name}`);
            console.log("\n");
            console.table(employeesManaged);
            console.log("\n");

        } catch (err) {
            if (err) throw err;
        }
    }
};

module.exports = employeeController;