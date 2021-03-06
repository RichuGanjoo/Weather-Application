
//Search City

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#entered-city-name");
  let city = cityElement.value;
  console.log("${city}");

  let apiKey = "4020fea5da84520afc1924049d2a5db2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(displayForecast);
  }

  let city = document.querySelector("#search-city");
  city.addEventListener("click", search);

  //console.log("city");

//handleSubmit

function handleSubmit(event)  {
  event.preventDefault();

  let cityInputElement = document.querySelector("#entered-city-name");
  console.log(cityInputElement.value);
}
//get current city
function getCurrentPosition(event) {
event.preventDefault();
navigator.geolocation.getCurrentPosition(currentCityTemp);
}

function currentCityTemp(position) {

  let lon = position.coords.longitude;
  let lat = position.coords.latitude;

  let apiKey = "a60add9adba8bb0ddb2a2dd3fec3e8e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(displayForecast);
}

let currentCity = document.querySelector("#current-city-temp");
currentCity.addEventListener("click", getCurrentPosition);

//Format Date
function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
  ];
  let day = days[date.getDay()];

  return `Last updated: ${day}, ${formatHours(timestamp)}`;
}

//Format hours
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();

  if(hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if(minutes<10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//Show Temperature and all description about search city

function showTemperature(response) {

  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.name;

  celsiusTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${celsiusTemperature}`;

  let celsiusElement = document.querySelector("#celsius-link");
  celsiusElement.innerHTML = `°C`;

  let fahrenheitElement = document.querySelector("#fahrenheit-link");
  fahrenheitElement.innerHTML = `|°F`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;


  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${wind} Km/hr`;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let location = response.data.name;
  let locationDisplay = document.querySelector("#city-name");
  locationDisplay.innerHTML = location;

  let timeElement = document.querySelector("#current-day-time");
  timeElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", `response.data.weather[0].description`);
}

//Display Forcast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for(let index = 0; index<6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2">
                        <h3>${formatHours(forecast.dt * 1000)}</h3>
                        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
                        <div class="weather-forecast-temperature">
                            <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
                        </div>
                    </div>`;
  }
 
}

//temperature change

function displayFahrenheitTemperature(event) {
  event.preventDefault();
 
  let temperatureElement = document.querySelector("#current-temperature");
  
  //document.getElementById("#celsiusLink").classList.remove("active");
  //document.getElementById("fahrenheitLink").classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9)/5+32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}`;
}


function displayCelsiusTemperature(event) {
  event.preventDefault();

  //celsiusLink.classList.add("active");
  //fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}`;
}
let celsiusTemperature = null;

let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
fahrenheitTemperature.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);