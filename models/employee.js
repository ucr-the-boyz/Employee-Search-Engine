var orm = require('../config/orm');


var employee = {
    allEmployees: function(cb){
        orm.selectAllEmployees('employee', function(result){
            cb(result);
        })
    }
}

module.exports = employee;