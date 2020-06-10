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

        $('.employer-search').on('submit', function (e) {
            e.preventDefault();
            var employerLang = {
                search: $('#employer_lang').val()
            }
            console.log('language being searched', employerLang)

            $.ajax(`/employers?search=${employerLang.search}`, {
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(employerLang)
            }).then((response) => {
                console.log(response, ' is the code language')

                arrayLanguagePush(response);

                function arrayLanguagePush(response) {
                    let employerSearch = response.employer;
                    //console.log(employeeSearch, 'here is language')
                    let employerLanguageMatch = [];
                    $.ajax({
                        url: '/api/employers',
                        method: 'GET'
                    }).then((res) => {
                        //console.log(res, 'this is res')
                        let employerRes = res.employer
                        //console.log('employeeRes', employeeRes)
                        //console.log('employeeSearch', employeeSearch)
                        for (var i = 0; i < employerRes.length; i++) {
                            let languageMatch = false
                            for (var y = 0; y < employerSearch.length; y++) {
                                if (employerRes[i].id === employerSearch[y].id) {
                                    employerLanguageMatch.push(employerRes[i])
                                    languageMatch = true
                                    $(`#${employerRes[i].id}`).removeClass('hidden')
                                    break
                                }
                            }
                            if (!languageMatch) {
                                $(`#${employerRes[i].id}`).addClass('hidden')
                            }
                            console.log(employerLanguageMatch, 'here is result')


                        }
                    })

}
                
                //location.reload();
            })
        })

        // $('.employer-search').on('submit', function (e) {
        //     e.preventDefault();
        //     var employerLang = {
        //         search: $('#employer_lang').val()
        //     }
        //     console.log('language being searched', employerLang)

        //     $.ajax(`/employers?search=${employerLang.search}`, {
        //         type: 'POST',
        //         contentType: 'application/json',
        //         dataType: 'json',
        //         data: JSON.stringify(employerLang)
        //     }).then((response) => {
        //         console.log(response, ' is the code language')

        //         $('#card-container-employer').html('')


        //         let rowStringEmployer = ""

        //         for (let i = 0; i < response.employer.length; i++) {

        //             let newdivEmployer = `
                    
        //             <div class="col s12 m6 l4" id='${response.employer[i].id}'>
        //                 <div class="card blue darken-4 hoverable large white-text">
        //                     <div class="card-content white-text">
        //                         <span class="card-title">${response.employer[i].first_name} ${response.employer[i].last_name}</span>
        //                         <div class="divider"></div>
        //                         <br>
        //                         <p>Business: ${response.employer[i].business_name}</p>
        //                         <div class="divider"></div>
        //                         <br>
        //                         <p>Project Details: ${response.employer[i].project_details}</p>
        //                     </div>
        //                     <div class="card-tabs">
        //                         <ul class="tabs tabs-fixed-width tabs-transparent">
        //                             <li class="tab"><a href="#money${response.employer[i].id}">budget</a></li>
        //                             <li class="tab"><a href="#language${response.employer[i].id}">Languages</a></li>
        //                             <li class="tab"><a href="#contact${response.employer[i].id}">Contact</a></li>
        //                         </ul>
        //                     </div>
        //                     <div class="card-content blue darken-4">
        //                         <div id="money${response.employer[i].id}">Salary: ${response.employer[i].budget}</div>
        //                         <div id="language${response.employer[i].id}">Languages Desired: ${response.employer[i].languages_needed}</div>
        //                         <div id="contact${response.employer[i].id}">Email: ${response.employer[i].employer_email} Phone: ${response.employer[i].employer_phone} Location:
        //                         ${response.employer[i].city_name}</div>
        //                     </div>
        //                 </div>
        //             </div>
        //             `

        //             rowStringEmployer = rowStringEmployer + newdivEmployer

        //             // append if divisible by 3 OR we are at the end of the array
        //             if (i % 3 == 0 && i != 0 || i == response.employer.length - 1) {
        //                 let rowEmployer = `
        //                 <div class="row">
        //                     <div class="col s12" id=${"row-" + i}>
        //                     </div>
        //                 </div>`

        //                 $('#card-container-employer').append(rowEmployer)
        //                 $('#row-' + i).append(rowStringEmployer)

        //                 console.log("row string is", rowStringEmployer)
        //                 rowStringEmployer = ""
        //             }
        //         }
        //         //location.reload();
        //     })
        // })


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


        $(document).ready(function () {
            // HTML geo location
            $('#distance_from').on('mouseup', (function (e) {
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
                    let milesAway = $("#distance_from").val();
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
                                let employerMatch = [];
                                $.ajax({
                                    url: '/api/employers',
                                    method: 'GET'
                                }).then((res) => {
                                    console.log(res)
                                    let employer = res.employer
                                    for (var i = 0; i < employer.length; i++) {
                                        let employerCityMatch = false
                                        for (var y = 0; y < location.length; y++) {
                                            if (employer[i].city_name === location[y].city) {
                                                employerMatch.push(employer[i])
                                                employerCityMatch = true
                                                $(`#${employer[i].id}`).removeClass('hidden')
                                                break
                                            }
                                        }
                                        if (!employerCityMatch) {
                                            $(`#${employer[i].id}`).addClass('hidden')
                                        }
                                        console.log(employerMatch)


                                    }
                                })

                            }


                            // function that loops the location on the web page and filters out the names listed.


                        });
                    //API Call end


                }
                getLocation();
            }));
        });



    })
}