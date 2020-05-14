var express = require('express');
var router = express.Router();


//employee routes




//employer routes

var employer = require('../models/employer')

router.get('/', function(req,res){
    res.render('index')
})

router.get('/employer-form', function(req, res){
    res.render('employerform')
})

// gets all employers and displays info in cards on employer.handlebars
router.get('/employers', function (req, res){
    employer.allEmployers(function(data){
        var employerObj = {
            employer: data
        }
        // console.log(employerObj)
        res.render('employer', employerObj)
    })
})

// posts one new employer with information from form on employer.handlebars

router.post('/api/employers', function(req, res){
    console.log('rout was hit', req.body)
    employer.addEmployer(req.body.first_name, req.body.last_name, req.body.business_name, req.body.languages, req.body.project_details, req.body.budget, req.body.employer_email, req.body.employer_phone, function (result){
        console.log('new employer added')
        res.json({id:result.insertId})
    })
})

var employee = require('../models/employee')

router.get('/employee-form', function(req, res){
    res.render('employeeform')
})

router.get('/employees', function (req, res){
    employee.allEmployees(function(data){
        var employeeObj = {
            employee: data
        }
        console.log(employeeObj)
        res.render('employee', employeeObj)
    })
})

router.post('/api/employees', function(req, res){
    console.log('rout was hit', req.body)
    employee.addEmployee(req.body.first_name, req.body.last_name, req.body.years_experience, req.body.languages_known, req.body.salary_desired, req.body.employee_email, req.body.employee_phone, function (result){
        console.log('new employee added')
        res.json({id:result.insertId})
    })
})

module.exports = router;