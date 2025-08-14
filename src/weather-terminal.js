const API_KEY = import.meta.env.VITE_API_KEY; // get the api key from the dotenv file

const container = document.querySelector('body');
const output = document.getElementById('weather-output');

// use the api to get weather info
function fetchWeather(lat, lon) {
    const url = `https://api.pirateweather.net/forecast/${API_KEY}/${lat},${lon}?units=si`;

fetch(url)
    .then(res => res.json())
    .then(data => {
        const temp = data.currently.temperature;
        const summary = data.currently.summary;
        const wind = data.currently.windSpeed;
        const time = new Date(data.currently.time * 1000).toLocaleTimeString();

        output.innerHTML = `
            <p>> TIME: ${time}</p>
            <p>> TEMP: ${temp.toFixed(1)}°C</p>
            <p>> STATUS: ${summary.toUpperCase()}</p>
            <p>> WIND SPEED: ${wind} m/s</p>
            <p>> ADVICE: ${generateAdvice(temp, summary)}</p>
        `;
        if (summary.toLowerCase().includes('rain')) {
            startRain();
        } else {
            stopRain();
        }
    }) // show if something went wrong
    .catch(err => {
        output.innerHTML = `<p class="error">ERROR: Failed to connect to orbital weather satellite.</p>`;
        console.error(err);
    });
}

// generate advice on different conditions
function generateAdvice(temp, summary) {
    if (summary.toLowerCase().includes('rain')) return 'Rain detected. Deploy nano-coat.';
    if (temp > 30) return 'Heatwave alert. Initiate hydration protocol.';
    if (temp < 10) return 'Cold front inbound. Equip thermal modules.';
    return 'Conditions stable. Your good Choom.';
}

function initWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            fetchWeather(lat, lon);
        },
        err => { // let the user know if the blocked the request by turning of location
            output.innerHTML = `<p class="error">ERROR: Geolocation blocked. Cannot retrieve coordinates.</p>`;
        }
        );
    } else { // let the user also know if this function doesnt work on their device
        output.innerHTML = `<p class="error">ERROR: Geolocation unsupported on this system.</p>`;
    }
}

window.addEventListener('DOMContentLoaded', initWeather);

// add a rainEffect if its raining IRL or if the button has been selected
function rainEffect() {
    let rainDrops = document.createElement('span');
    rainDrops.classList.add('rain-drops');
    container.appendChild(rainDrops);
    rainDrops.style.left = Math.random() * 100 + '%';

    setTimeout(function rainEffect(){
        rainDrops.remove();
    }, 1500);
}

let rainInterval = null;

// start the rain effect
window.startRain = function() {
    if (rainInterval) return;

    rainInterval = setInterval(rainEffect, 15);
}

// stop the rain effect
window.stopRain = function() {
    clearInterval(rainInterval);
    rainInterval = null;

    document.querySelectorAll('.rain-drops').forEach(drop => {
        drop.style.opacity = '0';
        setTimeout(() => drop.remove(), 500);
    });
}