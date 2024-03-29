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
  console.log(apiUrl);
axios.get(apiUrl).then(displayWeather);
} 

function displayWeather(response) {
  infoBox.style.display = "block";
  console.log(response.data);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("h1#city-name").innerHTML = response.data.name + `, ` + response.data.sys.country;
  document.querySelector("#temperature").innerHTML = `${temperature}°F`;
  document.querySelector("#wind").innerHTML = `Wind speed: ` + Math.round(response.data.wind.speed) + ` km/h`;
  document.querySelector("#humidity").innerHTML = `Humidity: `+ Math.round(response.data.main.humidity) + `%`;
  document.querySelector("#condition").innerHTML = `Conditions: `+ response.data.weather[0].main;

  getForecast(response.data.name);
}

//day of week formatting
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
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

// shifting color background based on time
const body = document.querySelector('body');
const date = new Date();
const hour = date.getHours();

if (hour >= 3 && hour < 6) {
  body.style.backgroundColor = '#d5a88a';
} else if (hour >= 6 && hour < 9) {
  body.style.backgroundColor = '#ffc98e';
} else if (hour >= 9 && hour < 12) {
  body.style.backgroundColor = '#ffd899';
} else if (hour >= 12 && hour < 15) {
  body.style.backgroundColor = '#d0f3f2';
} else if (hour >= 15 && hour < 18) {
  body.style.backgroundColor = '#ffc8ab';
} else if (hour >= 18 && hour < 21) {
  body.style.backgroundColor = '#cda3be';
} else if (hour >= 21 && hour < 24) {
  body.style.backgroundColor = '#cda3be';
} else {
  body.style.backgroundColor = '#475575';
}

function getForecast(city) {
  let units = "imperial";
  let apiKey = "c83c0f0o78d57f28ecb513a495bb0et1"
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`
  axios.get(apiURL).then(displayForecast);
}


//forecast
function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
    forecastHtml =
      forecastHtml +
      `
      <div class="col" "weather-forecast-day">
        <div class="row-12 weather-forecast-date">${formatDay(day.time)}</div>
        <div class="row-12 weather-forecast-icon">
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" /></div>
        <div class="row weather-forecast-temperatures">
          <div class="weather-forecast-temperature-max">${Math.round(day.temperature.maximum)}°F</div>
          <div class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°F</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
displayForecast();