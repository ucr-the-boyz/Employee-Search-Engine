var express = require('express');
var router = express.Router();


//employee routes




//employer routes

var employer = require('../models/employer')

router.get('/', function(req,res){
    res.render('index')
})

router.get('/employers', function (req, res){
    employer.allEmployers(function(data){
        var employerObj = {
            employer: data
        }
        // console.log(employerObj)
        res.render('employer', employerObj)
    })
})

var employee = require('../models/employee')

router.get('/employees', function (req, res){
    employee.allEmployees(function(data){
        var employeeObj = {
            employee: data
        }
        console.log(employeeObj)
        res.render('employee', employeeObj)
    })
})
module.exports = router;