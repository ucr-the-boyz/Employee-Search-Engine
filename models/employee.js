var orm = require('../config/orm');


var employee = {
    allEmployees: function(cb){
        orm.selectAllEmployees('employee', function(result){
            cb(result);
        })
    },
    addEmployee: function(first_name, last_name, years_experience, languages_known, salary_desired, employee_email, employee_phone, cb){
        orm.insertEmployee(first_name, last_name, years_experience, languages_known, salary_desired, employee_email, employee_phone, function(result){
            cb(result)
        })
    }
}

module.exports = employee;