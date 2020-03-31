const mysql = require("mysql");
const connection = require("../config/connection.js");

const budget = {
    getTotalBudget: function() {
        return new Promise(function(resolve, reject) {
            const query = `SELECT SUM(salary) AS 'Total Budget' FROM role, employee WHERE employee.role_id=role.id`;
            connection.query(query, function(err, results, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]["Total Budget"]);
                }
            });
        });
    },
    getTotalBudgetByDepartment: function(departmentID) {
        return new Promise(function(resolve, reject) {
            const query =
                `SELECT SUM(salary) AS 'Total Department Budget'
                FROM employee
                LEFT JOIN role ON employee.role_id=role.id
                WHERE role.department_id = ?`;
            connection.query(query, [departmentID], function(err, results, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]["Total Department Budget"]);
                }
            });
        });
    }
};
  
module.exports = budget;