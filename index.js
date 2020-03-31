const connection = require("./config/connection.js");

const inquirer = require("inquirer");
const cTable = require('console.table');

const employeeController = require("./controllers/employee_controller");
const departmentController = require("./controllers/department_controller");
const roleController = require("./controllers/role_controller");
const budgetController = require("./controllers/budget_controller");
const banner = require("./utils/banner");
/// This runs figlet to display the Banner and the App
async function init() {
    await banner.displayBanner();
    await app();
}
/// This Takes in the responses from the users inputs in the CLI
async function app() {

    var exitSelected = false;

    // Do While loop keeps program running until exit is selected
    do {
        const answer = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Select an option?",
            choices: [
                new inquirer.Separator("-- EMPLOYEES --"),
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Manager",
                "Update Employee Role",
                new inquirer.Separator("-- DEPARTMENTS --"),
                "View All Departments",
                "Add Department",
                "Remove Department",
                new inquirer.Separator("-- ROLES --"),
                "View All Roles",
                "Add Role",
                "Remove Role",
                new inquirer.Separator("-- BUDGET --"),
                "View Total Budget",
                "View Total Department Budget",
                new inquirer.Separator(),
                "Exit",
                new inquirer.Separator("##############"),
                new inquirer.Separator(" ")
                ]
            }   
        ]);
        // Setting up conditions for when users select an option from the prompt it runs and waits for a response from selected function - https://www.youtube.com/watch?v=Z6O_XdfCBEo - refrenced this video on how to use switch case statemnets
        switch (answer.action.toLowerCase()) {
            case "view all employees":
                await employeeController.displayAllEmployees();
            break;
            case "view all employees by department":
                await employeeController.displayAllEmployeesByDepartment();
                break;
            case "view all employees by manager":
                await employeeController.displayAllEmployeesByManager();
                break;
            case "view all roles":
                await roleController.displayAllRoles();
                break;
            case "view all departments":
                await departmentController.displayAllDepartments();
                break;
            case "add employee":
                await employeeController.addEmployee();
                break;
            case "remove employee":
                await employeeController.removeEmployee();
                break;
            case "update employee manager":
                await employeeController.updateEmployeeManager();
                break;
            case "update employee role":
                await employeeController.updateEmployeeRole();
                break;
            case "update employee department":
                await employeeController.updateEmployeeDepartment();
                break;
            case "add department":
                await departmentController.addDepartment();
                break;
            case "remove department":
                await departmentController.removeDepartment();
                break;
            case "add role":
                await roleController.addRole();
                break;
            case "remove role":
                await roleController.removeRole();
                break;
            case "view total budget":
                await budgetController.displayTotalBudget();
                break;
            case "view total department budget":
                await budgetController.displayTotalDepartmentBudget();
                break;
            case "exit":
                console.log("Exiting Employee Tracker...");
                exitSelected = true;
                connection.end();
            default:
            break;
        }
    } while (!exitSelected)
}

init();