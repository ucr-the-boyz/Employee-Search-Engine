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

                for (let i = 0; i < response.employee.length; i++) {





                    let newdiv = `
                    
                    <div class="col s12 m6 l4" id="${response.employee[i].id}">
                        <div class="card blue darken-4 hoverable small white-text">
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
                    if (i % 3 == 0 && i != 0 || i == response.employee.length - 1) {
                        let row = `
                        <div class="row">
                            <div class="col s12" id=${"row-" + i}>
                            </div>
                        </div>`

                        $('#card-container').append(row)
                        $('#row-' + i).append(rowString)

                        console.log("row string is", rowString)



                        rowString = ""

                    }

                }
                //location.reload();
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
        //filters out employees based on their location
        //---------------------------------------------------------------

            // HTML geo location
            $('#miles_away').on('mouseup', (function (e) {
                e.preventDefault();

                function getLocation() {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(showPosition);
                    } else {
                        x.innerHTML = "Geolocation is not supported by this browser.";
                    }
                }

                function showPosition(position) {
                    //API Call start by lat & Long
                    let locationLatId = position.coords.latitude;
                    console.log("Latitude: " + position.coords.latitude);
                    let locationLonId = position.coords.longitude;
                    console.log("Longitude: " + position.coords.longitude);
                    // console.log("pushed_city_origin " +pushed_city_origin);
                    let milesAway = $("#miles_away").val();
                    console.log(milesAway);
                    // var queryURL = `http://geodb-free-service.wirefreethought.com/v1/geo/cities/${pushed_city_origin}/nearbyCities?limit=10&offset=0&radius=${milesAway}`;
                    var queryURL = `http://geodb-free-service.wirefreethought.com//v1/geo/locations/${locationLatId}${locationLonId}/nearbyCities?limit=10&offset=0&radius=${milesAway}`;
                    $.ajax({
                            url: queryURL,
                            method: "GET"
                        })
                        .then(function (response) {
                            console.log(response.data)
                            arrayPush(response);

                            function arrayPush(response) {
                                let location = response.data;
                                console.log(location)
                                let employeeMatch = [];
                                $.ajax({
                                    url: '/api/employees',
                                    method: 'GET'
                                }).then((res) => {
                                    console.log(res)
                                    let employee = res.employee
                                    for (var i = 0; i < employee.length; i++) {
                                        let cityMatch = false
                                        for (var y = 0; y < location.length; y++) {
                                            if (employee[i].city_name === location[y].city) {
                                                employeeMatch.push(employee[i])
                                                cityMatch = true
                                                $(`#${employee[i].id}`).removeClass('hidden')
                                                break
                                            }
                                        }
                                        if (!cityMatch) {
                                            $(`#${employee[i].id}`).addClass('hidden')
                                        }
                                        console.log(employeeMatch)


                                    }
                                })

                            }


                            // function that loops the location on the web page and filters out the names listed.


                        });
                    //API Call end


                }
                getLocation();
            }));
        
    })
}