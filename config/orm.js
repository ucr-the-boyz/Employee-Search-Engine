var connection = require('./connection');

var orm = {

selectAllEmployers : function(employer, cb){
    var queryString = 'Select * FROM ??;';
    connection.query(queryString, [employer], function (err, result){
        if(err) throw err;
        cb (result)
    })
}
,

insertEmployer : function(first_name, last_name, business_name, languages_needed, project_details, budget, employer_email, employer_phone, city_name, cb){
    var queryString = `INSERT INTO employer (first_name, last_name, business_name, languages_needed, project_details, budget, employer_email, employer_phone, city_name) VALUES ("${first_name}", "${last_name}", "${business_name}", "${languages_needed}", "${project_details}", "${budget}", "${employer_email}", "${employer_phone}", "${city_name}");`
    connection.query(queryString, function(err, result){
        if (err) throw err;
        console.log(result);
        cb(result)
    })
}

,
selectAllEmployees :function(employee, cb){
    var queryString = 'Select * FROM ??;';
    connection.query(queryString, [employee], function (err, result){
        if(err) throw err;
        cb (result)
    })
},

insertEmployee : function(first_name, last_name, years_experience, languages_known, salary_desired, employee_email, employee_phone, city_name, cb){
    var queryString = `INSERT INTO employee (first_name, last_name, years_experience, languages_known, salary_desired, employee_email, employee_phone, city_name) VALUES ("${first_name}", "${last_name}", "${years_experience}", "${languages_known}", "${salary_desired}", "${employee_email}", "${employee_phone}", "${city_name}");`
    connection.query(queryString, function(err, result){
        if (err) throw err;
        console.log(result);
        cb(result)
    })
},

selectCertainEmployees : function (search, cb){
    var queryString = `SELECT * FROM employee WHERE languages_known like '%${search}%';`
    connection.query(queryString, [search], function (err, result){
        if(err) throw err;
        cb (result)
    })
},

selectEmployersLanguage : function (search, cb){
    var queryString = `SELECT * FROM employer WHERE languages_needed like '%${search}%';`
    connection.query(queryString, [search], function (err, result){
        if(err) throw err;
        cb (result)
    })
}

};

module.exports = orm;