var orm = require('../config/orm');

var employer = {

    allEmployers: function(cb){
        orm.selectAllEmployers('employer', function(result){
            cb(result);
        })
    }
    ,
    addEmployer: function(first_name, last_name, business_name, languages, project_details, budget, employer_email, employer_phone, cb){
        orm.insertEmployer(first_name, last_name, business_name, languages, project_details, budget, employer_email, employer_phone, function(result){
            cb(result)
        })
    }
}


module.exports = employer;