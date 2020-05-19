window.onload = function () {

    $(function () {

        $(document).ready(function () {
            $('.tabs').tabs();
        });



        //search drop down on the employee and employer search handlebars
        $('.dropdown-trigger').dropdown();


        $(document).ready(function () {
            $('select').formSelect();
        });

        $('.employee-search').on('submit', function (e) {
            e.preventDefault();
            var employeeLang = {
                search: $('#employee_lang').val()
            }
            console.log('language being searched', employeeLang)

            $.ajax(`/employees?search=${employeeLang.search}`, {
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(employeeLang)
            }).then((response) => {
                console.log(response, ' is the code language')

                $('#card-container').html('')


                let rowString = ""

                for( let i = 0; i < response.employee.length; i++){
                    
             



                    let newdiv = `
                    
                    <div class="col s12 m6 l4" id="${response.employee[i].id}">
                        <div class="card green darken-4 hoverable small white-text">
                            <div class="card-content white-text">
                            <span class="card-title">${response.employee[i].first_name} ${response.employee[i].last_name}</span>
                            <div class="divider"></div>
                            <p>Years Experience: ${response.employee[i].years_experience}</p>
                            <div class="divider"></div>
                            <p>Languages Known: ${response.employee[i].languages_known}</p>
                            <div class="divider"></div>
                            <p>Desired Salary: ${response.employee[i].salary_desired}</p>
                            <div class="divider"></div>
                            <p>Email: ${response.employee[i].employee_email}</p>
                            <div class="divider"></div>
                            <p>Phone: ${response.employee[i].employee_phone}</p>
                            <div class="divider"></div>
                            <p class='city_name'>Location: ${response.employee[i].city_name}</p>
                        </div>
                    </div>
                </div>`

                rowString = rowString + newdiv

                       // append if divisible by 3 OR we are at the end of the array
                       if(i % 3 == 0 && i != 0 || i == response.employee.length -1 ) {
                        let row = `
                        <div class="row">
                            <div class="col s12" id=${"row-" + i}>
                            </div>
                        </div>`

                        $('#card-container').append(row)
                        
                        console.log("row string is", rowString)



                        rowString = ""

                    }

                }
                //location.reload();
            })
        })

        // /employee/search/?q="asdfsadf"
        // res.render("/")



        $('.employer-form').on('submit', function (e) {
            e.preventDefault();
            var newEmployer = {
                first_name: $('#first_name').val().trim(),
                last_name: $('#last_name').val().trim(),
                business_name: $('#business_name').val().trim(),
                languages_needed: $('#languages_needed').val().join(', '),
                project_details: $('#project_details').val().trim(),
                budget: $('#budget').val().trim(),
                employer_email: $('#employer_email').val().trim(),
                employer_phone: $('#employer_phone').val().trim(),
                city_name: $('#city_name').val().trim()
            };
            console.log('new employer is', newEmployer)

            $.ajax('api/employers', {
                type: "POST",
                data: newEmployer
            }).then(function () {
                console.log('Employer added info.');
                location.reload();
            })
        })



        $('.employee-form').on('submit', function (e) {
            e.preventDefault();
            var newEmployee = {
                first_name: $('#first_name').val().trim(),
                last_name: $('#last_name').val().trim(),
                years_experience: $('#years_experience').val().trim(),
                languages_known: $('#languages_known').val().join(", "),
                salary_desired: $('#salary_desired').val().trim(),
                employee_email: $('#employee_email').val().trim(),
                employee_phone: $('#employee_phone').val().trim(),
                city_name: $('#city_name').val().trim()
            };
            console.log('new employer is', newEmployee)

            $.ajax('api/employees', {
                type: "POST",
                data: newEmployee
            }).then(function () {
                console.log('Employee added info.');
                location.reload();
            })
        })


        $('.city-input').on('submit', function (e) {
            e.preventDefault();
            var city_origin = $('#city-origin').val().trim().toLowerCase();
            // var city_

            console.log('is this being hit', city_origin);

            var queryURL = "http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix=" + city_origin + "&types=CITY";

            $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                .then(function (response) {
                    console.log(response.data[0].id);
                    // var originalCityId = response.data[0].id;
                });

            // var queryURL = "http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix=" + city_input + "&types=CITY";

            // $.ajax({
            //         url: queryURL,
            //         method: "GET"
            //     })
            //     .then(function (response) {
            //         console.log(response.data[0].id);
            //         var originalCityId = response.data[0].id;
            //     });


        });


    })
}