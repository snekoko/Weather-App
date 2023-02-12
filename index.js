let infoBox = document.getElementById("weather-info-box");
infoBox.style.display = "none";

document.addEventListener("DOMContentLoaded", getCurrentPosition);

//geolocation//

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiKey = "0dc40d3d7cda209ca40e77430c74cf57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
//end geolocation//

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let units = "imperial";
  let apiKey = "0dc40d3d7cda209ca40e77430c74cf57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayWeather);
} 

function displayWeather(response) {
  infoBox.style.display = "block";
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("h1#city-name").innerHTML = response.data.name + `, ` + response.data.sys.country;
  document.querySelector("#temperature").innerHTML = `${temperature}°F`;
  document.querySelector("#wind").innerHTML = `Wind speed: ` + Math.round(response.data.wind.speed) + ` km/h`;
  document.querySelector("#humidity").innerHTML = `Humidity: `+ Math.round(response.data.main.humidity) + `%`;
  document.querySelector("#precipitation").innerHTML = `Precipitation: `+ Math.round(response.data.main.precipitation) + `%`;
  document.querySelector("#condition").innerHTML = `Conditions: `+ response.data.weather[0].main;
  //document.querySelector("#icon").innerHTML = response.data.weather[0].icon;//

}

//Icon Toggle//
function myFunction(x) {
  x.classList.toggle("fa-cloud-sun");
}

//Date Formating//
function formatDate() {
  let currentTime = new Date();

  let date = currentTime.getDate();
  let hours = currentTime.getHours();
  if (hours <10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes <10) {
    minutes = `0${minutes}`;
  }
  let year = currentTime.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[currentTime.getDay()]; // will return value of 0 to 6 which will match with previous array

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
  let month = months[currentTime.getMonth()];

let h2 = document.querySelector("h2");
h2.innerHTML = `It is currently ${hours}:${minutes}, ${day}, ${month} ${date}, ${year}`;

}
console.log(formatDate());

