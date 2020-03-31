const mysql = require("mysql");
const connection = require("../config/connection.js");

const role = {

    getRoleID: function(roleTitle) {
        return new Promise(function(resolve, reject) {
            const query = "SELECT id FROM role WHERE title = ?"
            connection.query(query, [roleTitle], function(err, results, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0].id);
                }
            });
        });
    },
    insertRole: function(role) {
        return new Promise(function(resolve, reject) {
            const query =
                `INSERT INTO role (title, salary, department_id)
                VALUES (?, ?, ?)`;
                connection.query(query, [role.title, role.salary, role.departmentID], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve('Success');
                }
            });
        });
    },
    deleteRole: function(roleTitle) {
        return new Promise(function(resolve, reject) {
            const query = "DELETE FROM role WHERE title = ?";
            connection.query(query, [roleTitle], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve('Success');
                }
            });
        });
    },
    getAllRoles: function() {
        return new Promise(function(resolve, reject) {
            const query = "SELECT id AS 'ID', title AS 'Title', salary AS 'Salary' FROM role";
            connection.query(query, function(err, results, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    getAllTitles: function() {
        return new Promise(function(resolve, reject) {
            const query = "SELECT id AS 'ID', title AS 'Title', salary AS 'Salary' FROM role";
            // Get the list of all titles
            const titles = [];
            connection.query(query, function(err, results, fields) {
                if (err) reject(err);

                for (const role of results) {
                    titles.push(role.Title);
                }
                resolve(titles);
            });
        });
    }
};

module.exports = role;