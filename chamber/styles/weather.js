const apiKey = "YOUR_API_KEY";

const url =
`https://api.openweathermap.org/data/2.5/forecast?lat=9.0765&lon=7.3986&units=imperial&appid=${apiKey}`;

async function apiFetch() {

    try {

        const response = await fetch(url);

        const data = await response.json();

        displayWeather(data);

    } catch (error) {

        console.log("Weather Error:", error);
    }
}

function displayWeather(data) {

    const currentTemp =
        document.querySelector("#current-temp");

    const weatherDesc =
        document.querySelector("#weather-desc");

    currentTemp.textContent =
        `${data.list[0].main.temp.toFixed(1)}°F`;

    weatherDesc.textContent =
        data.list[0].weather[0].description;

    const forecast =
        document.querySelector("#forecast");

    forecast.innerHTML = "";

    for (let i = 0; i < 3; i++) {

        const day = data.list[i * 8];

        const forecastDay =
            document.createElement("p");

        forecastDay.textContent =
            `${day.dt_txt.split(" ")[0]}: ${day.main.temp.toFixed(1)}°F`;

        forecast.appendChild(forecastDay);
    }
}

apiFetch();