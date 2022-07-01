'use strict';

const weatherBlock = document.querySelector('#weather');

async function loadWeather (e) {
    weatherBlock.innerHTML = `
        <div class="weather__loading">
            <img src="./img/loading.gif" alt="Loading...">
        </div>
    `;

    const server = 'https://api.openweathermap.org/data/3.0/onecall?lat=50°27′00″&lon=30°31′25″&appid=df6b64a207e48187df5ab1a963decd07';
    const response = await fetch(server, {
        method: 'GET',
    });
    const responseResult = await response.json();

    if (response.ok) {
        getWeather(responseResult);
    } else {
        weatherBlock.innerHTML = responseResult.message;
    }
}

function getWeather(data) {
    const location = data.name;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;

    const teamplate = `
        <div class="weather__header">
            <div class="weather__main">
                <div class="weather__city">${location}</div>
                <div class="weather__status">${weatherStatus}</div>
            </div>
        </div>
        <div class="weather__icon">
            <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
        </div>
        <div class="weather__temp">${temp}</div>
        <div class="weather__feels-like">Feels-like: ${feelsLike}</div>
    `;

    weatherBlock.innerHTML = teamplate;
}

if (weatherBlock) {
    loadWeather();
}