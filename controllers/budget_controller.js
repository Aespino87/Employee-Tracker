const inquirer = require("inquirer");
const budgetModel = require("../models/budget");
const departmentModel = require("../models/department");
const departmentController = require("./department_controller");

const budgetController = {

    displayTotalBudget: async function() {
        try {
            let totalBudget = await budgetModel.getTotalBudget();
            totalBudget = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(totalBudget);
            console.log("\n");
            console.log(`Total Budget: ${totalBudget}`);
            console.log("\n");
        } catch (err) {
            if (err) throw err;
        }
    },
    displayTotalDepartmentBudget: async function() {
        try {
            const departmentNames = await departmentController.getAllDepartmentNames();
            const department = await inquirer.prompt([
                {
                    type: "list",
                    name: "name",
                    message: "Which department's budget would you like to see? ",
                    choices: departmentNames
                }
            ]);

            const departmentID = await departmentModel.getDepartmentID(department.name);

            let totalDepartmentBudget = await budgetModel.getTotalBudgetByDepartment(departmentID);

            if (totalDepartmentBudget) {
                totalDepartmentBudget = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                }).format(totalDepartmentBudget);
            } else {
                totalDepartmentBudget = `$0.00`;
            }
            console.log("\n");
            console.log(`${department.name} Total Budget: ${totalDepartmentBudget}`);
            console.log("\n");
        } catch (err) {
            if (err) throw err;
        }
    }
};

module.exports = budgetController;