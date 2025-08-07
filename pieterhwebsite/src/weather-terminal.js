const API_KEY = import.meta.env.VITE_API_KEY;

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