var cities = []; 

function displayCityInfo() {
    var searchedCity = $(this).attr("data-name");

var APIkey = "bbb815e9d5d661bba4a9ff4878159a9b";
var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + APIkey;
var uviURL = "https://api.openweathermap.org/data/2.5/uvi?lat=39.95&lon=-75.16&appid=" + APIkey;

$.ajax({
    url: weatherURL,
    method: "GET"
}).then(function (response) {
    console.log(weatherURL);
    console.log(response);
    console.log(response.wind.speed);
    console.log(response.weather[0].icon);
    var cityDiv = $("<div class='cityDiv'>")
    var cityCntryDisp = response.name + ", " + response.sys.country;
    var pOne = $("<p>").text(cityCntryDisp);
    cityDiv.append(pOne);
    var tempDisp = response.main.temp;
    var pTwo = $("<p>").text("Temperature: " + tempDisp)
    cityDiv.append(pTwo);
    var humidityDisp = response.main.humidity;
    var pThree = $("<p>").text("Humidity: " + humidityDisp);
    cityDiv.append(pThree);
    var windDisp = response.wind.speed;
    var pFour = $("<p>").text("Wind Speed: " + windDisp);
    cityDiv.append(pFour);
    var imgCode = response.weather[0].icon;
    var imageURL = "http://openweathermap.org/img/w/" + imgCode + ".png";
    var imageDisp = $("<img>").attr("src", imageURL);
    cityDiv.append(imageDisp);
    $("#city-view").prepend(cityDiv);
   
/*
    var Kelvin = response.main.temp;
    var Farenheit = Math.floor((Kelvin - 273.15) * 1.80 + 32);
   // $(".temp").text(Kelvin + " Kelvin | " + " Farenheit = " + Farenheit + " Farenheit");
*/
});

$.ajax({
    url: uviURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
    var cityDiv = $("<div class='cityDiv'>")
    var uviDisp = response.value;
    var pFive = $("<p>").text("UV Index: "
     + uviDisp);
    cityDiv.append(pFive);
    console.log(pFive);
    //$(".uvIndex").html("<b>UV Index:  </b>" + response.value);
});
}
/* Searching for New Cities */

/*
var searchedCity = $("#cityQuery").val().trim();
*/
$("#addCitybtn").on("click", function () {
    event.preventDefault();
    console.log(event.target);
    var searchedCity = $("#cityQuery").val().trim();
    console.log(searchedCity);
    cities.push(searchedCity);
    console.log(cities);
    renderButtons();
});

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < cities.length; i++) {
        var a = $("<button>");
        a.addClass("newCity");
        a.attr("data-name", cities[i]);
        a.text(cities[i]);
        $("#buttons-view").append(a);
    }
}
$(document).on("click", ".newCity", displayCityInfo);