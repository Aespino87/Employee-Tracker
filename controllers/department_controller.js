const inquirer = require("inquirer");
const departmentModel = require("../models/department");

const departmentController = {

    addDepartment: async function() {
        try {
            const department = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Enter the new department you would like to add "
            }
            ]);
  
            await departmentModel.insertDepartment(department.name);
        } catch (err) {
            if (err) throw err;
        }
    },
    getAllDepartmentNames: async function() {
        try {
            const departments = await departmentModel.getAllDepartments();
  
            let departmentNames = [];
            for (const department of departments) {
                departmentNames.push(department.Name);
            }
            return departmentNames;
        } catch (err) {
            if (err) throw err;
        }
    },
    removeDepartment: async function() {
        try {
            const departmentNames = await this.getAllDepartmentNames();
  
            const department = await inquirer.prompt([
                {
                    type: "list",
                    name: "name",
                    message: "Which department would you like to remove? ",
                    choices: departmentNames
                }
            ]);
  
            await departmentModel.deleteDepartment(department.name);
        } catch (err) {
            if (err) throw err;
        }
    },
    displayAllDepartments: async function() {
        try {
            const departments = await departmentModel.getAllDepartments();
            //const footer = log.displayHeadline('All Departments');
            console.log("\n");
            console.table(departments);
            console.log("\n");
            //log.displayFooter(footer);
        } catch (err) {
            if (err) throw err;
        }
    }
};

module.exports = departmentController;