import { API_KEY } from "./environment.js";

const currentTempEl = document.querySelector(".location h2");
const locationDateEl = document.querySelector(".location p");
const timeEl = document.querySelector(".time");

const weatherDetailEls = document.querySelectorAll(".weather-detail span:last-child");
const forecastCards = document.querySelectorAll(".forecast-card");
const searchInput = document.querySelector('input[placeholder="Search Location"]');
const favoritesList = document.querySelector(".favorites");

const updateTime = () => {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
};

const updateDate = () => {
    const now = new Date();
    locationDateEl.textContent = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
    });
};

setInterval(updateTime, 1000);
updateTime();
updateDate();

const updateForecastDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const todayIndex = new Date().getDay();

    forecastCards.forEach((card, index) => {
        const dayIndex = (todayIndex + index + 1) % 7;
        card.querySelector(".fs-3").textContent = days[dayIndex];
    });
};

const getWeatherIcon = (condition) => {
    if (condition.includes("Cloud")) return "bi-cloud";
    if (condition.includes("Rain")) return "bi-cloud-rain";
    if (condition.includes("Thunder")) return "bi-cloud-lightning";
    if (condition.includes("Clear")) return "bi-sun";
    if (condition.includes("Snow")) return "bi-snow";
    return "bi-cloud";
};

const updateForecastIcons = (data) => {
    const indexes = [0, 9, 17, 25, 33];

    forecastCards.forEach((card, i) => {
        const icon = card.querySelector("i");
        const condition = data.list[indexes[i]].weather[0].main;
        icon.className = `bi ${getWeatherIcon(condition)}`;
    });
};

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const saveFavorites = () => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
};

const renderFavorites = () => {
    favoritesList.innerHTML = "";

    favorites.forEach(city => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="./assets/fc1b1478abfcae9e1f878a292e9542cf45b2b707.png">
            ${city}
        `;

        li.addEventListener("click", () => {
            fetchCityWeather(city);
        });

        favoritesList.appendChild(li);
    });
};

const toggleFavorite = (city) => {
    if (favorites.includes(city)) {
        favorites = favorites.filter(c => c !== city);
    } else {
        favorites.push(city);
    }

    saveFavorites();
    renderFavorites();
};

const fetchForecastData = async () => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=37.9575&lon=121.2925&units=imperial&appid=${API_KEY}`
    );

    const data = await response.json();
    updateUI(data);
};

const fetchCityWeather = async (city) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${API_KEY}`
    );

    const data = await response.json();
    updateUI(data);
};

const updateUI = (data) => {
    const cityName = `${data.city.name}, ${data.city.country}`;

    currentTempEl.innerHTML = `
        ${Math.floor(data.list[0].main.temp)}°F
        <span>${cityName}</span>
    `;

    const star = document.createElement("span");
    star.textContent = " ⭐";
    star.style.cursor = "pointer";
    star.style.opacity = favorites.includes(cityName) ? "1" : "0.4";

    star.addEventListener("click", () => {
        toggleFavorite(cityName);
        star.style.opacity = favorites.includes(cityName) ? "1" : "0.4";
    });

    currentTempEl.appendChild(star);

    weatherDetailEls[0].textContent = `${data.list[0].clouds.all}%`;
    weatherDetailEls[1].textContent = `${data.list[0].main.humidity}%`;
    weatherDetailEls[2].textContent = `${Math.floor(data.list[0].wind.speed)} mph`;
    weatherDetailEls[3].textContent = `${data.list[0].rain?.["3h"] || 0} mm`;

    const indexes = [0, 9, 17, 25, 33];

    forecastCards.forEach((card, i) => {
        card.querySelector(".fs-4").textContent =
            `${Math.floor(data.list[indexes[i]].main.temp_max)}° / ${Math.floor(data.list[indexes[i]].main.temp_min)}°`;
    });

    updateForecastIcons(data);
    updateForecastDays();
};

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && searchInput.value.trim()) {
        fetchCityWeather(searchInput.value.trim());
        searchInput.value = "";
    }
});

renderFavorites();
fetchForecastData();
