var cities = [];
var lsSearched = [];

function displayCityInfo() {

    var searchedCity = $(this).attr("data-name");
    var domainName = "https://api.openweathermap.org/data/2.5/";
    var APIkey = "bbb815e9d5d661bba4a9ff4878159a9b";
    var weatherURL = domainName + "weather?q=" + searchedCity + "&appid=" + APIkey;
    var fiveDayURL = domainName + "forecast?q=" + searchedCity + "&appid=" + APIkey;

    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (response) {
        var lat = (response["coord"].lat);
        var lon = (response["coord"].lon);

        $(".city").text(response.name + " (" + moment().format("LLLL") + ")");
        var imgCode = response.weather[0].icon;
        var imageURL = "http://openweathermap.org/img/w/" + imgCode + ".png";
        $(".wIcon").attr("src", imageURL);
        var Kelvin = response.main.temp;
        var Farenheit = Math.floor((Kelvin - 273.15) * 1.80 + 32);
        $(".temp").text("Temperature: " + Farenheit + " ˚F");
        $(".weatherDescription").text(response.weather[0].description);
        $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");

        var uviURL = domainName + "uvi?lat=" + lat + "&lon=" + lon + "6&appid=" + APIkey;

        $.ajax({
            url: uviURL,
            method: "GET",
        }).then(function (response) {
            var uviDisp = response.value;
            $(".uvIndex").text("UV Index: " + uviDisp);
        });
    });

    $.ajax({
        url: fiveDayURL,
        method: "GET",
        data: {
            cnt: "5"
        }
    }).then(function (response) {
        var wf = "";
        var d0 = moment().add(1, 'days').format("L");
        var d1 = moment().add(2, 'days').format("L");
        var d2 = moment().add(3, 'days').format("L");
        var d3 = moment().add(4, 'days').format("L");
        var d4 = moment().add(5, 'days').format("L");

        var momentArr = [d0, d1, d2, d3, d4];

        wf += "<h2 id='dynah2' class='card-header'>" + response.city.name + " Five-Day Forecast" + "</h2>";
        $.each(response.list, function (index, val) {
            wf += "<div class='five_day_div' class='card'>"; // Opening paragraph tag
            wf += "<div class='card-body'>";
            wf += "<div class='card-text'>" + momentArr[index] + "</div>";
            wf += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>"; // Icon
            var Kelvin = val.main.temp;
            var Farenheit = Math.floor((Kelvin - 273.15) * 1.80 + 32);
            wf += "<div class='card-text'>" + Farenheit + "&degF" + "</div><br>"; // Temperature
            wf += "<div class='card-text'> " + val.weather[0].description + "</div><br>";
            wf += "<div class='card-text'> Humidity: " + val.main.humidity + "% </div>";
            wf += "</div>";
            wf += "</div>"; // Closing paragraph Tag
            $("#showWeatherForecast").html(wf);
        });
    });
}

$("#addCitybtn").on("click", function () {
    event.preventDefault();
    var searchedCity = $("#cityQuery").val().trim();
    cities.push(searchedCity);
    renderButtons();
});


function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < cities.length; i++) {
        var a = $("<button>");
        a.addClass("newCity");
        a.attr("data-name", cities[i]);
        a.text(cities[i]);
        localStorage.setItem("citiesSearched", cities[i]);
        var lsGet = localStorage.getItem("citiesSearched");
        console.log(lsGet);
        lsSearched.push(lsGet);
        console.log(lsSearched);
        $("#buttons-view").append(a);
    }
}

$(document).on("click", ".newCity", displayCityInfo);

/*
lsSearched.push(lsGet);
console.log(lsSearched);
*/


/*
            var city0 = localStorage.getItem("citiesSearced");
            $("#buttons-view").text(city0);
*/

/*
function storeItems() {
    var citiesSearched;
    if (localStorage.getItem("citiesSearched") === null) {
        citiesSearched = [];
    } else {
        citiesSearched = JSON.pars e(localStorage.getItem("citiesSearched"))

    }
}
*/
