//Search City

function search(event) {
event.preventDefault();
let cityElement = document.querySelector("#entered-city-name");
//let cityName = document.querySelector("#city-name");
//cityName.innerHTML = `${cityElement.value} `;
let city = cityElement.value;

let apiKey = "4020fea5da84520afc1924049d2a5db2";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(`${apiUrl}`).then(showTemperature);
}

let city = document.querySelector("#search-city");
city.addEventListener("click", search);

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
}

let currentCity = document.querySelector("#current-city-temp");
currentCity.addEventListener("click", getCurrentPosition);


function formatDate(timestamp){
let now = new Date(timestamp);

let days = [
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"
];

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"]
let month = months[now.getMonth()];
let year = now.getFullYear();
let day = days[now.getDay()];
let date = now.getDate();
let time = now.getHours();
let minutes = now.getMinutes();

return ` `;

//let dateTime = document.querySelector("#current-date-time");
//dateTime.innerHTML = ` ${month} ${date}, ${year}. ${day}, ${time}:${minutes}`;

}

//Show Temperature and all description about search city

function showTemperature(response) {

let cityElement = document.querySelector("#city-name");
cityElement.innerHTML = response.data.name;

let temperature = Math.round(response.data.main.temp);
let temperatureElement = document.querySelector("#current-temperature");
temperatureElement.innerHTML = `${temperature}`;

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

let time = (response.data.dt * 1000);
let timeDisplay = document.querySelector("#current-date-time");
timeDisplay.innerHTML = formatData(time);
}

//temperature change

function fahrenheit() {
let temperature = document.querySelector("#current-temperature");

temperature.innerHTML = `69.62`;
}

let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
fahrenheitTemperature.addEventListener("click", fahrenheit);

function celsius() {
let temperature = document.querySelector("#current-temperature");
temperature.innerHTML = `20.9`;
}

let celsiusTemperature = document.querySelector("#celsius-link");
celsiusTemperature.addEventListener("click", celsius);
