var express = require('express');
var router = express.Router();


//employee routes




//employer routes

var employer = require('../models/employer')

router.get('/', function(req,res){
    res.redirect('index.html')
})

router.get('/employer-form', function(req, res){
    res.redirect('employerform.html')
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

router.get('/api/employers', function (req, res){
    employer.allEmployers(function(data){
        var employerObj = {
            employer: data
        }
        // console.log(employerObj)
        res.json(employerObj)
    })
})

router.get('/api/employees', function (req, res){
    employee.allEmployees(function(data){
        var employeeObj = {
            employee: data
        }
        // console.log(employerObj)
        res.json(employeeObj)
    })
})



// posts one new employer with information from form on employer.handlebars

router.post('/api/employers', function(req, res){
    console.log('rout was hit', req.body)
    employer.addEmployer(req.body.first_name, req.body.last_name, req.body.business_name, req.body.languages_needed, req.body.project_details, req.body.budget, req.body.employer_email, req.body.employer_phone, req.body.city_name, function (result){
        console.log('new employer added')
        res.json({id:result.insertId})
    })
})

var employee = require('../models/employee')

router.get('/employee-form', function(req, res){
    res.redirect('employeeform.html')
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

router.post('/employees', function(req, res){

    console.log(req.body)
    

    employee.searchEmployeeLanguage(req.body.search, function(data){
        console.log(data, "what is data")
        var employeeObj = {
            employee: data
        }
        console.log(employeeObj,'nothing is here')
        res.json( employeeObj)
    })
})

router.post('/api/employees', function(req, res){
    console.log('rout was hit', req.body)
    employee.addEmployee(req.body.first_name, req.body.last_name, req.body.years_experience, req.body.languages_known, req.body.salary_desired, req.body.employee_email, req.body.employee_phone, req.body.city_name, function (result){
        console.log('new employee added')
        res.json({id:result.insertId})
    })
})


router.post('/employers', function(req, res){

    console.log(req.body)
    

    employer.searchCertainEmployer(req.body.search, function(data){
        console.log(data, "what is data")
        var employerObj = {
            employer: data
        }
        console.log(employerObj,'nothing is here')
        res.json( employerObj)
    })
})

module.exports = router;