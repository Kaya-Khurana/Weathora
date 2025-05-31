document.addEventListener("DOMContentLoaded", () => {
  const cityinput = document.getElementById("city-input");
  const weatherbtn = document.getElementById("get-weather-btn");
  const weathinfo = document.getElementById("weather-info");
  const ctyname = document.getElementById("city-name");
  const tempo = document.getElementById("temperature");
  const descrip = document.getElementById("description");
  const humidity = document.getElementById("humidity"); // Add this element in your HTML
  const wind = document.getElementById("wind"); // Add this element in your HTML
  const icon = document.getElementById("weather-icon"); // Add this element in your HTML
  const errmsg = document.getElementById("error-message");
  const API_KEY = "9f44c1b271c1ad2d72e110b314f3243f";

  weatherbtn.addEventListener("click", getWeather);
  cityinput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") getWeather();
  });

  async function getWeather() {
    const city = cityinput.value.trim();
    if (!city) return;
    errmsg.classList.add("hidden"); // Clear error on new search
    try {
      const responseweather = await fetchWheatherData(city);
      DisplayWheatherData(responseweather);
    } catch (error) {
      DisplayErrmsg();
    }
  }

  async function fetchWheatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  function DisplayWheatherData(data) {
    const { name, main, weather, wind: windData } = data;
    ctyname.textContent = name;
    weathinfo.classList.remove("hidden");
    errmsg.classList.add("hidden");
    tempo.textContent = `Temperature: ${main.temp}°C`;
    descrip.textContent = `Weather: ${weather[0].description}`;
    if (humidity) humidity.textContent = `Humidity: ${main.humidity}%`;
    if (wind) wind.textContent = `Wind: ${windData.speed} m/s`;
    if (icon) {
      icon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
      icon.alt = weather[0].description;
      icon.classList.remove("hidden");
    }
  }

  function DisplayErrmsg() {
    weathinfo.classList.add("hidden");
    errmsg.classList.remove("hidden");
  }
});
