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
selectAllEmployees :function(employee, cb){
    var queryString = 'Select * FROM ??;';
    connection.query(queryString, [employee], function (err, result){
        if(err) throw err;
        cb (result)
    })
}
};

module.exports = orm;