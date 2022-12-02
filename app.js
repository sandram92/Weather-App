const button = document.querySelector("button");
const input = document.querySelector(".searchBar");
const city = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const weather = document.querySelector(".weather");
const picture = document.querySelector(".image");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

window.addEventListener("load", () => {
  let long;
  let lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ac10e226566d5977cf0e46f515400473`;
      axios(api)
        .then((response) => {
          let data = response.data;
          return data;
        })
        .then((data) => {
          city.innerHTML = `<h1 class="city">Weather in: ${data.name}</h1>`;
          temperature.textContent = Math.floor(data.main.temp) + "" + "°C";
          picture.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          );
          description.textContent = data.weather[0].description;
          humidity.innerHTML = `<div class="humidity">Humidity: ${data.main.humidity}%</div>`;
          wind.innerHTML = `<div class="wind">Wind-speed: ${data.wind.speed}km/h</div>`;
        });
    });
  }
});

button.addEventListener("click", function () {
  getWeatherData();
  randomBackground();
});

input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    getWeatherData();
    randomBackground();
  }
});

async function getWeatherData() {
  try {
    let cityName = input.value;
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=ac10e226566d5977cf0e46f515400473`
    );
    city.innerHTML = `<h1 class="city">Weather in: ${data.name}</h1>`;
    temperature.textContent = Math.floor(data.main.temp) + "" + "°C";
    picture.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    );
    description.textContent = data.weather[0].description;
    humidity.innerHTML = `<div class="humidity">Humidity: ${data.main.humidity}%</div>`;
    wind.innerHTML = `<div class="wind">Wind-speed: ${data.wind.speed}km/h</div>`;
  } catch (error) {
    console.log(error);
  }
}

const pictures = [
  "url('https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80')",
  "url('https://images.unsplash.com/photo-1542202229-7d93c33f5d07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')",
  "url('https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')",
  "url('https://images.unsplash.com/photo-1516214104703-d870798883c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')",
  "url('https://images.unsplash.com/photo-1477322524744-0eece9e79640?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80')",
  "url('https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80')",
];

function randomBackground() {
  let randomIndex = Math.floor(Math.random() * pictures.length) + 1;
  document.body.style.backgroundImage = pictures[randomIndex];
}
