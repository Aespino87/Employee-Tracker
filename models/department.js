const mysql = require("mysql");
const connection = require("../config/connection.js");

const department = {

    getDepartmentID: function(departmentName) {
        return new Promise(function(resolve, reject) {
            const query = "SELECT id FROM department WHERE name = ?";
            connection.query(query, [departmentName], function(err, results, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0].id);
                }
            });
        });
    },
    insertDepartment: function(departmentName) {
        return new Promise(function(resolve, reject) {
            const query = "INSERT INTO department (name) VALUES (?)";
            connection.query(query, [departmentName], function(err) {
                if (err) {
                    reject(err);
                } else {
                    console.log('Success');
                    resolve();
                }
            });
        });
    },
    deleteDepartment: function(departmentName) {
        return new Promise(function(resolve, reject) {
            const query = "DELETE FROM department WHERE name = ?";
            connection.query(query, [departmentName], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve('Success');
                }
            });
        });
    },
    getAllDepartments: function() {
        return new Promise(function(resolve, reject) {
            const query = "SELECT id AS 'ID', name AS 'Name' FROM department";
            connection.query(query, function(err, results, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
};

module.exports = department;