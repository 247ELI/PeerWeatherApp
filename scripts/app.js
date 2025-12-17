
const output = document.getElementById("output");

import {API_KEY} from "./environment.js"

const fetchForecastData = async () => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=37.9575&lon=121.2925&units=imperial&appid=${API_KEY}`
    );
    
    const data = await response.json();

    // DAY 1
    console.log(`1st day temp ${Math.floor(data.list[0].main.temp)}`);
    console.log(`1st day max temp ${Math.floor(data.list[0].main.temp_max)}`);
    console.log(`1st day min temp ${Math.floor(data.list[0].main.temp_min)}`);
    console.log(`1st day clouds ${data.list[0].clouds.all}%`);
    console.log(`1st day humidity ${data.list[0].main.humidity}%`);
    console.log(`1st day wind ${Math.floor(data.list[0].wind.speed)} mph`);
    console.log(`1st day rain ${data.list[0].rain?.["3h"] || 0} mm`);

    // DAY 2
    console.log(`2nd day temp ${Math.floor(data.list[9].main.temp)}`);
    console.log(`2nd day max temp ${Math.floor(data.list[9].main.temp_max)}`);
    console.log(`2nd day min temp ${Math.floor(data.list[9].main.temp_min)}`);
    console.log(`2nd day clouds ${data.list[9].clouds.all}%`);
    console.log(`2nd day humidity ${data.list[9].main.humidity}%`);
    console.log(`2nd day wind ${Math.floor(data.list[9].wind.speed)} mph`);

    // DAY 3
    console.log(`3rd day temp ${Math.floor(data.list[17].main.temp)}`);
    console.log(`3rd day max temp ${Math.floor(data.list[17].main.temp_max)}`);
    console.log(`3rd day min temp ${Math.floor(data.list[17].main.temp_min)}`);
    console.log(`3rd day clouds ${data.list[17].clouds.all}%`);
    console.log(`3rd day humidity ${data.list[17].main.humidity}%`);
    console.log(`3rd day wind ${Math.floor(data.list[17].wind.speed)} mph`);
    console.log(`3rd day rain ${data.list[17].rain?.["3h"] || 0} mm`);

    // DAY 4
    console.log(`4th day temp ${Math.floor(data.list[25].main.temp)}`);
    console.log(`4th day max temp ${Math.floor(data.list[25].main.temp_max)}`);
    console.log(`4th day min temp ${Math.floor(data.list[25].main.temp_min)}`);
    console.log(`4th day clouds ${data.list[25].clouds.all}%`);
    console.log(`4th day humidity ${data.list[25].main.humidity}%`);
    console.log(`4th day wind ${Math.floor(data.list[25].wind.speed)} mph`);
    console.log(`4th day rain ${data.list[25].rain?.["3h"] || 0} mm`);

    // DAY 5
    console.log(`5th day temp ${Math.floor(data.list[33].main.temp)}`);
    console.log(`5th day max temp ${Math.floor(data.list[33].main.temp_max)}`);
    console.log(`5th day min temp ${Math.floor(data.list[33].main.temp_min)}`);
    console.log(`5th day clouds ${data.list[33].clouds.all}%`);
    console.log(`5th day humidity ${data.list[33].main.humidity}%`);
    console.log(`5th day wind ${Math.floor(data.list[33].wind.speed)} mph`);
    console.log(`5th day rain ${data.list[33].rain?.["3h"] || 0} mm`);

    return data;
};

fetchForecastData();


window.addEventListener("DOMContentLoaded", () => {
    // Check if the browser supports geolocation
    if (!navigator.geolocation) {
        // output.textContent = "Geolocation is not supported by your browser.";
        return;
    }

    // output.textContent = "Getting your location...";

    navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            // output.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
        },

        // Error callback
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    // output.textContent = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    // output.textContent = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    // output.textContent = "The request to get user location timed out.";
                    break;
                default:
                    // output.textContent = "An unknown error occurred.";
            }
        }
    );

});



