$(function(){


    $('.employer-form').on('submit', function(e){
        e.preventDefault();
        var newEmployer ={
            first_name: $('#first_name').val().trim(),
            last_name: $('#last_name').val().trim(),
            business_name: $('#business_name').val().trim(),
            languages: $('#languages').val().trim(),
            project_details: $('#project_details').val().trim(),
            budget: $('#budget').val().trim(),
            employer_email: $('#employer_email').val().trim(),
            employer_phone: $('#employer_phone').val().trim()
        };
        console.log('new employer is', newEmployer)

        $.ajax('api/employers', {
            type: "POST",
            data: newEmployer
        }).then(function(){
            console.log('Employer added info.');
            location.reload();
        })
    })

    $('.employee-form').on('submit', function(e){
        e.preventDefault();
        var newEmployee ={
            first_name: $('#first_name').val().trim(),
            last_name: $('#last_name').val().trim(),
            years_experience: $('#years_experience').val().trim(),
            languages_known: $('#languages_known').val().trim(),
            salary_desired: $('#salary_desired').val().trim(),
            employee_email: $('#employee_email').val().trim(),
            employee_phone: $('#employee_phone').val().trim()
        };
        console.log('new employer is', newEmployee)

        $.ajax('api/employees', {
            type: "POST",
            data: newEmployee
        }).then(function(){
            console.log('Employee added info.');
            location.reload();
        })
    })

})