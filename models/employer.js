var orm = require('../config/orm');

var employer = {

    allEmployers: function(cb){
        orm.selectAllEmployers('employer', function(result){
            cb(result);
        })
    }
    ,
    addEmployer: function(first_name, last_name, business_name, languages_needed, project_details, budget, employer_email, employer_phone, city_name, cb){
        orm.insertEmployer(first_name, last_name, business_name, languages_needed, project_details, budget, employer_email, employer_phone, city_name, function(result){
            cb(result)
        })
    },
    searchCertainEmployer: function(search, cb){
        orm.selectEmployersLanguage(search, function(result){
            cb(result)
        })
    }
}


module.exports = employer;