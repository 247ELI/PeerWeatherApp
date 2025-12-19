const output = document.getElementById("output");

import { API_KEY } from "./environment.js";

const currentTempEl = document.querySelector(".location h2");
const weatherDetailEls = document.querySelectorAll(".weather-detail span:last-child");
const forecastCards = document.querySelectorAll(".forecast-card");
const searchInput = document.querySelector('input[placeholder="Search Location"]');

const fetchForecastData = async () => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=37.9575&lon=121.2925&units=imperial&appid=${API_KEY}`
    );

    const data = await response.json();

    currentTempEl.innerHTML = `
        ${Math.floor(data.list[0].main.temp)}°F
        <span>${data.city.name}, ${data.city.country}</span>
    `;

    weatherDetailEls[0].textContent = `${data.list[0].clouds.all}%`;
    weatherDetailEls[1].textContent = `${data.list[0].main.humidity}%`;
    weatherDetailEls[2].textContent = `${Math.floor(data.list[0].wind.speed)} mph`;
    weatherDetailEls[3].textContent = `${data.list[0].rain?.["3h"] || 0} mm`;

    forecastCards[0].querySelector(".fs-4").textContent =
        `${Math.floor(data.list[0].main.temp_max)}° / ${Math.floor(data.list[0].main.temp_min)}°`;
    forecastCards[1].querySelector(".fs-4").textContent =
        `${Math.floor(data.list[9].main.temp_max)}° / ${Math.floor(data.list[9].main.temp_min)}°`;
    forecastCards[2].querySelector(".fs-4").textContent =
        `${Math.floor(data.list[17].main.temp_max)}° / ${Math.floor(data.list[17].main.temp_min)}°`;
    forecastCards[3].querySelector(".fs-4").textContent =
        `${Math.floor(data.list[25].main.temp_max)}° / ${Math.floor(data.list[25].main.temp_min)}°`;
    forecastCards[4].querySelector(".fs-4").textContent =
        `${Math.floor(data.list[33].main.temp_max)}° / ${Math.floor(data.list[33].main.temp_min)}°`;

    console.log(`1st day temp ${Math.floor(data.list[0].main.temp)}`);
    console.log(`2nd day temp ${Math.floor(data.list[9].main.temp)}`);
    console.log(`3rd day temp ${Math.floor(data.list[17].main.temp)}`);
    console.log(`4th day temp ${Math.floor(data.list[25].main.temp)}`);
    console.log(`5th day temp ${Math.floor(data.list[33].main.temp)}`);

    return data;
};

fetchForecastData();

const fetchCityWeather = async (city) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${API_KEY}`
    );

    const data = await response.json();

    currentTempEl.innerHTML = `
        ${Math.floor(data.list[0].main.temp)}°F
        <span>${data.city.name}, ${data.city.country}</span>
    `;

    weatherDetailEls[0].textContent = `${data.list[0].clouds.all}%`;
    weatherDetailEls[1].textContent = `${data.list[0].main.humidity}%`;
    weatherDetailEls[2].textContent = `${Math.floor(data.list[0].wind.speed)} mph`;
    weatherDetailEls[3].textContent = `${data.list[0].rain?.["3h"] || 0} mm`;

    forecastCards[0].querySelector(".fs-4").textContent =
        `${Math.floor(data.list[0].main.temp_max)}° / ${Math.floor(data.list[0].main.temp_min)}°`;
    forecastCards[1].querySelector(".fs-4").textContent =
        `${Math.floor(data.list[9].main.temp_max)}° / ${Math.floor(data.list[9].main.temp_min)}°`;
    forecastCards[2].querySelector(".fs-4").textContent =
        `${Math.floor(data.list[17].main.temp_max)}° / ${Math.floor(data.list[17].main.temp_min)}°`;
    forecastCards[3].querySelector(".fs-4").textContent =
        `${Math.floor(data.list[25].main.temp_max)}° / ${Math.floor(data.list[25].main.temp_min)}°`;
    forecastCards[4].querySelector(".fs-4").textContent =
        `${Math.floor(data.list[33].main.temp_max)}° / ${Math.floor(data.list[33].main.temp_min)}°`;
};

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && searchInput.value.trim()) {
        fetchCityWeather(searchInput.value.trim());
        searchInput.value = "";
    }
});

window.addEventListener("DOMContentLoaded", () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log(
                `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`
            );
        },
        () => { }
    );
});
