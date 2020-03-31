const mysql = require("mysql");
const connection = require("../config/connection.js");

const employee = {
    getEmployeeID: function(employeeName) {
        if (employeeName === "None") {
          return null;
        }
        return new Promise(function(resolve, reject) {
            const firstName = employeeName.split(' ')[0];
            const lastName = employeeName.split(' ')[1];
            query = "SELECT id FROM employee WHERE first_name= ? AND last_name= ?";
            connection.query(query, [firstName, lastName], function(err, results, fields) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(results[0].id);
                }
            });
        });
    },
    insertEmployee: function(employee) {
        return new Promise(function(resolve, reject) {
            if (employee.managerID) {
                const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`;
                connection.query(
                    query,
                    [
                        employee.firstName,
                        employee.lastName,
                        employee.roleID,
                        employee.managerID
                    ],
                    function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            console.log("Success");
                            resolve();
                        }
                    }
                );
            } else {
                const query = `INSERT INTO employee (first_name, last_name, role_id) VALUES(?, ?, ?)`;
                connection.query(
                    query,
                    [employee.firstName, employee.lastName, employee.roleID],
                    function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            console.log("Success");
                            resolve();
                        }
                    }
                );
            }
        });
    },      
    deleteEmployee: function(employeeName) {
        return new Promise(function(resolve, reject) {
            const firstName = employeeName.split(" ")[0];
            const lastName = employeeName.split(" ")[1];
            query = "DELETE FROM employee WHERE first_name = ? AND last_name = ?";
            connection.query(query, [firstName, lastName], function(err) {
                if (err) {
                    reject(err);
                } else {
                    console.log('Success');
                    resolve();
                }
            });
        });
    },
    setEmployeeRole: function(employeeName, role) {
        return new Promise(function(resolve, reject) {
            const firstName = employeeName.split(" ")[0];
            const lastName = employeeName.split(" ")[1];
            const query =
                "UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?";
            connection.query(query, [role.id, firstName, lastName], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve("Success");
                }
            });
        });
    },
    setEmployeeManager: function(employee, managerID = null) {
        return new Promise(function(resolve, reject) {
            const firstName = employee.split(" ")[0];
            const lastName = employee.split(" ")[1];
            let query = '';
            if (managerID) {
                query =
                    'UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?';
                connection.query(
                    query,
                    [managerID, firstName, lastName],
                    function(err, results, fields) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            resolve('Success');
                        }
                    }
                );
            } else {
                query =
                    'UPDATE employee SET manager_id = null WHERE first_name = ? AND last_name = ?';
                connection.query(query, [firstName, lastName], function(err, results, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Success');
                    }
                });
            }
        });
    },
    setEmployeeDepartment: function(employeeName, department) {
        return new Promise(function(resolve, reject) {
            const firstName = employeeName.split(" ")[0];
            const lastName = employeeName.split(" ")[1];
            const query = `UPDATE employee SET id = ? WHERE first_name = ? AND last_name = ?`;
            connection.query(query, [department.id, firstName, lastName], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve("Success");
                }
            });
        });
    },  
    getAllEmployees: function() {
        return new Promise(function(resolve, reject) {
            const query = "SELECT * FROM employee";
            connection.query(query, function(err, results, fields) {
                if (err) {
                    reject(err);
                } else {
                    const employees = [];
                    for (const employee of results) {
                        const firstName = employee["first_name"];
                        const lastName = employee["last_name"];
                        employees.push(`${firstName} ${lastName}`);
                    }
                    resolve(employees);
                }
            });
        });
    },
    getManagerByID: function(managerID) {
        return new Promise(function(resolve, reject) {
            const query = 'SELECT * FROM employee WHERE id = ?';
            connection.query(query, [managerID], function(err, results, fields) {
                if (err) {
                    reject(err);
                } else {
                    const manager = `${results[0]["first_name"]} ${results[0]["last_name"]}`;
                    resolve(manager);
                }
            });
        });
    },
    getAllManagers: function() {
        return new Promise(function(resolve, reject) {
            const query =
            "SELECT * FROM employee, employee manager WHERE employee.manager_id = manager.id";
            connection.query(query, function(err, results, fields) {
                if (err) {
                    reject(err);
                } else {
                    const managers = [];
                    for (const manager of results) {
                        const firstName = manager["first_name"];
                        const lastName = manager["last_name"];
                        managers.push(`${firstName} ${lastName}`);
                    }
                    resolve(managers);
                }
            });
        });
    },
    getAllEmployeesDetails: function() {
        return new Promise(function(resolve, reject) {
            const query = `SELECT employee.id AS 'ID', 
                first_name AS 'First Name', 
                last_name AS 'Last Name', 
                role.title AS 'Title', 
                department.name AS 'Department', 
                role.salary AS 'Salary', 
                manager_id
                FROM employee, role, department
                WHERE employee.role_id = role.id
                AND role.department_id = department.id
                ORDER BY employee.id ASC`;
    
            connection.query(query, function(err, results, fields) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    getAllEmployeesByDepartment: function(departmentID) {
        return new Promise(function(resolve, reject) {
            const query = `SELECT employee.id AS 'ID', 
                first_name AS 'First Name', 
                last_name AS 'Last Name'
                FROM employee
                WHERE employee.role_id = ANY (SELECT role.id FROM role WHERE role.department_id = ?)
                ORDER BY employee.id ASC`;
            connection.query(query, [departmentID], function(err, results, fields) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    getAllEmployeesByManager: function(managerID) {
        return new Promise(function(resolve, reject) {
            const query = `SELECT id AS 'ID', 
                first_name AS 'First Name', 
                last_name AS 'Last Name'
                FROM employee WHERE employee.manager_id = ? 
                ORDER BY employee.first_name ASC`;
            connection.query(query, [managerID], function(err, results, fields) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
};

module.exports = employee;