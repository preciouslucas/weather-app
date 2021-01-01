let now = new Date();
let h2 = document.querySelector("h2");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let month = months[now.getMonth()];
h2.innerHTML = `Last updated: ${day}, ${date} ${month} ${year}, ${hours}:${minutes}`;


//Weather
function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML =Math.round(response.data.main.temp);

  let feelslikeElement = document.querySelector("#feels-like");
  feelslikeElement.innerHTML = Math.round(response.data.main.feels_like);

  let maxtempElement = document.querySelector("#max-temp");
  maxtempElement.innerHTML = Math.round(response.data.main.temp_max);

  let mintempElement = document.querySelector("#min-temp");
  mintempElement.innerHTML = Math.round(response.data.main.temp_min);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)

  celsciusTemperature = response.data.main.temp;
  }

function searchCity(city) {
  let apiKey = "a6d670173067336041caf358a0d04186";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#type-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  searchCity(searchInput.value);
}

let form = document.querySelector("#city-input");
form.addEventListener("submit", handleSubmit);

//Current location
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "a6d670173067336041caf358a0d04186";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsciusTemperature = null

//Unit Conversion
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let farenheitTemperature = (celsciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsciusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);