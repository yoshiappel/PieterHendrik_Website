const API_KEY = import.meta.env.VITE_API_KEY;

const container = document.querySelector('body');
const output = document.getElementById('weather-output');

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
    })
    .catch(err => {
        output.innerHTML = `<p class="error">ERROR: Failed to connect to orbital weather satellite.</p>`;
        console.error(err);
    });
}

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
        err => {
            output.innerHTML = `<p class="error">ERROR: Geolocation blocked. Cannot retrieve coordinates.</p>`;
        }
        );
    } else {
        output.innerHTML = `<p class="error">ERROR: Geolocation unsupported on this system.</p>`;
    }
}

window.addEventListener('DOMContentLoaded', initWeather);

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

function startRain() {
    if (rainInterval) return;

    rainInterval = setInterval(rainEffect, 15);
}

function stopRain() {
    clearInterval(rainInterval);
    rainInterval = null;

    document.querySelectorAll('.rain-drops').forEach(drop => {
        drop.style.opacity = '0';
        setTimeout(() => drop.remove(), 500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const rainToggle = document.getElementById('rain-toggle');

    if (rainToggle) {
        rainToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                startRain();
            } else {
                stopRain();
            }
        });
    }
});