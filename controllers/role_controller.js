const inquirer = require("inquirer");
const departmentController = require("./department_controller");
const departmentModel = require("../models/department");
const roleModel = require("../models/role");

const roleController = {
    addRole: async function() {
        try {
            const departmentNames = await departmentController.getAllDepartmentNames();

            const role = await inquirer.prompt([
                {
                    type: "input",
                    name: "title",
                    message: "Please enter the role that you would like to add: "
                },
                {
                    type: "input",
                    name: "salary",
                    message: "Please enter the salary assigned for this role: "
                },
                {
                    type: "list",
                    name: "department",
                    message: "To which department would you like to add this role? ",
                    choices: departmentNames
                }
            ]);

            role.departmentID = await departmentModel.getDepartmentID(role.department);
            await roleModel.insertRole(role);
        } catch (err) {
            if (err) throw err;
        }
    },
    getAllRoleNames: async function() {
        try {
            const roles = await roleModel.getAllRoles();

            let roleNames = [];
            for (const role of roles) {
                roleNames.push(role.Title);
            }

            return roleNames;
        } catch (err) {
            if (err) throw err;
        }
    },
    removeRole: async function() {
        try {
            const roleNames = await this.getAllRoleNames;

            const role = await inquirer.prompt([
                {
                    type: "list",
                    name: "title",
                    message: "Which role would you like to remove? ",
                    choices: roleNames
                }
            ]);

            await roleModel.deleteRole(role.title);
        } catch (err) {
            if (err) throw err;
        }
    },
    displayAllRoles: async function() {
        try {
            const roles = await roleModel.getAllRoles();

            console.log("\n");
            console.table(roles);
            console.log("\n");

        } catch (err) {
            if (err) throw err;
        }
    }
};

module.exports = roleController;