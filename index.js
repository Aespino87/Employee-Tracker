const inquirer = require('inquirer');
const db = require('./database');
/// Multiple Variables need to use the same file.
const { addEmployee, removeEmployee, updateEmployeeManager, updateEmployeeRole, displayAllEmployees, displayAllEmployeesByDepartment, displayAllEmployeesByManager} = require('./controllers/employee');
const { addDepartment, removeDepartment, displayAllDepartments} = require('./controllers/department');
const { addRole, removeRole, displayAllRoles } = require('./controllers/role');
const {displayTotalBudget, displayTotalDepartmentBudget} = require('./controllers/budget');
const { displayBanner } = require('./utils/banner');
/// This runs figlet to display the Banner and the App
async function init() {
  db.dropAndInit();
  await displayBanner();
  await app();
}
/// This Takes in the responses from the users inputs in the CLI
async function app() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select an option?',
      choices: [
        'View All Employees',
        'View All Employees by Department',
        'View All Employees by Manager',
        'View All Roles',
        'View All Departments',
        'Add Employee',
        'Remove Employee',
        'Update Employee Manager',
        'Update Employee Role',
        'Add Department',
        'Remove Department',
        'Add Role',
        'Remove Role',
        'View Total Budget',
        'View Total Department Budget',
        'Exit'
      ]
    }
  ]);
// Setting up conditions for when users select an option from the prompt it runs and waits for a response from selected function - https://www.youtube.com/watch?v=Z6O_XdfCBEo - refrenced this video on how to use switch case statemnets
  switch (answer.action.toLowerCase()) {
    case "View all Employees":
      await displayAllEmployees();
      app();
      break;
    case "View all Employees by Department":
      await displayAllEmployeesByDepartment();
      app();
      break;
    case "View all Employees by Manager":
      await displayAllEmployeesByManager();
      app();
      break;
    case "View all Roles":
      await displayAllRoles();
      app();
      break;
    case "View all Departments":
      await displayAllDepartments();
      app();
      break;
    case "Add Employee":
      await addEmployee();
      app();
      break;
    case "Remove Employee":
      await removeEmployee();
      app();
      break;
    case "Update Employee Manager":
      await updateEmployeeManager();
      app();
      break;
    case "Update Employee Role":
      await updateEmployeeRole();
      app();
      break;
    case "Update employee department":
      await updateEmployeeDepartment();
      app();
      break;
    case "Add Department":
      await addDepartment();
      app();
      break;
    case "Remove Department":
      await removeDepartment();
      app();
      break;
    case "Add Role":
      await addRole();
      app();
      break;
    case "Remove Role":
      await removeRole();
      app();
      break;
    case "View Total Budget":
      await displayTotalBudget();
      app();
      break;
    case "View Total Department Budget":
      await displayTotalDepartmentBudget();
      app();
      break;
    case 'exit':
      console.log('Have a nice day!');
      db.dropAndEnd();
    default:
      break;
  }
}

init();