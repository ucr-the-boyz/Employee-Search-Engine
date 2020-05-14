var orm = require('../config/orm');

var employer = {

    all: function(cb){
        orm.selectAllEmployers('employer', function(result){
            cb(result);
        })
    }
}

module.exports = employer;