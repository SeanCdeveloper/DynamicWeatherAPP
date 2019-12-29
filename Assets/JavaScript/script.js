 // Initial Array of Cities
 var cities = []; 

 function displayCityInfo() {

 var searchedCity = $(this).attr("data-name");
 var APIkey = "bbb815e9d5d661bba4a9ff4878159a9b";
 var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + APIkey;
 var uviURL = "https://api.openweathermap.org/data/2.5/uvi?lat=39.95&lon=-75.16&appid=" + APIkey;
 var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity + "&appid=" + APIkey;

 $.ajax({
     url: weatherURL,
     method: "GET"
 }).then(function (response) {
     $(".city").text(response.name + " (" + moment().format("L") + ")");
     var imgCode = response.weather[0].icon;
     var imageURL = "http://openweathermap.org/img/w/" + imgCode + ".png";
     $(".wIcon").attr("src", imageURL);
     var Kelvin = response.main.temp;
     var Farenheit = Math.floor((Kelvin - 273.15) * 1.80 + 32);
     $(".temp").text("Temperature: " + Farenheit + " ˚F");
     $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
     $(".humidity").text("Humidity: " + response.main.humidity + "%");
 });

 $.ajax({
     url: uviURL,
     method: "GET"
 }).then(function(response) {
     console.log(response);
     var cityDiv = $("<div class='cityDiv'>")
     var uviDisp = response.value;
     $(".uvIndex").text("UV Index: " + response.value);
 });

 $.ajax({
 url: fiveDayURL,
 method: "GET",
 data: {
     cnt: "5"
 }
}).then(function(response){
 var wf = "";  
 var d0 = moment().add(1, 'days').format("L");
 var d1 = moment().add(2,'days').format("L");
 var d2 = moment().add(3,'days').format("L");
 var d3 = moment().add(4,'days').format("L");
 var d4 = moment().add(5,'days').format("L");

 var momentArr = [d0, d1, d2, d3, d4];

 for (var i=0; i<momentArr.length; i++) {
     console.log(momentArr[i]);
 }
 wf += "<h2>" + response.city.name + "</h2>";
 $.each(response.list, function(index, val) {
     wf += "<div class='five_day_div'"; // Opening paragraph tag
     wf += "<span>" + momentArr[index] + "</span>";
     wf += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>"; // Icon
     var Kelvin = val.main.temp;
     var Farenheit = Math.floor((Kelvin - 273.15) * 1.80 + 32);
     wf += "Temp: " + Farenheit + "&degF"; // Temperature
     wf += "<span> | " + val.weather[0].description + "</span>"; 
     wf += "<span> | Humidity: " + val.main.humidity + "% </span>";           
     wf += "</div>"; // Closing paragraph Tag
     // Fix to showFiveDay
     $("#showWeatherForecast").html(wf);
 });
});
 }

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