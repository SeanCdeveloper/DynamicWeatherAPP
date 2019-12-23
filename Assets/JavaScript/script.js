
var APIkey = "bbb815e9d5d661bba4a9ff4878159a9b";
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid=" + APIkey;
        
        var uviURL = "https://api.openweathermap.org/data/2.5/uvi?lat=39.95&lon=-75.16&appid=" + APIkey;
       
        $.ajax({
            url: weatherURL,
            method: "GET"
        }).then(function (response) {
            console.log(weatherURL);
            console.log(response);
            console.log(response.wind.speed);
            console.log(response.weather[0].icon);
            $(".city").text(response.name + "," + response.sys.country);
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);
            $(".temp").text("Temperature: " + response.main.temp);

            var imgCode = response.weather[0].icon;
            var imageURL = "http://openweathermap.org/img/w/" + imgCode + ".png";
            $("#wIcon").attr("src", imageURL);

            var Kelvin = response.main.temp;
            var Farenheit = Math.floor((Kelvin - 273.15) * 1.80 + 32);
            $(".temp").text(Kelvin + " Kelvin | " + " Farenheit = " + Farenheit + " Farenheit");
        });

        $.ajax({
            url: uviURL,
            method: "GET"
        }).then(function(response) {
            console.log();
            $(".uvIndex").html("<b>UV Index:  </b>" + response.value);
        });
   
        /* Searching for New Cities */

        var cities = [];

        $("#addCitybtn").on("click", function() {
            event.preventDefault();
            console.log(event.target);
            var searchedCity = $("#cityQuery").val().trim();
            console.log(searchedCity);
            cities.push(searchedCity); 
            console.log(cities);    
            renderButtons();       
        });

        function renderButtons() {
            $("#dynamicCityDisplay").empty();
            for (var i=0; i<cities.length; i++) {
                var a = $("<button>");
                a.addClass("newCity");
                a.attr("data-name", cities[i]);
                a.text(cities[i]);
                $("#dynamicCityDisplay").append(a);
            }
        }

        $(document).on("click", ".newCity", displayCityInfo);



        