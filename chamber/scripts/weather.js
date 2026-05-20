const apiKey = "932b0402745fbded7581b4cabf195d99";

const url =
`https://api.openweathermap.org/data/2.5/forecast?lat=9.0765&lon=7.3986&units=imperial&appid=${apiKey}`;

async function apiFetch() {

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Weather data unavailable");
        }

        const data = await response.json();

        displayWeather(data);

    } catch (error) {

        console.log(error);

        document.querySelector("#weather-desc")
            .textContent =
            "Weather unavailable";
    }
}

function displayWeather(data) {

    document.querySelector("#current-temp")
        .textContent =
        `${data.list[0].main.temp.toFixed(1)}°F`;

    document.querySelector("#weather-desc")
        .textContent =
        data.list[0].weather[0].description;

    const forecast =
        document.querySelector("#forecast");

    forecast.innerHTML = "";

    for (let i = 0; i < 3; i++) {

        const day = data.list[i * 8];

        const p =
            document.createElement("p");

        p.textContent =
            `${day.dt_txt.split(" ")[0]}: ${day.main.temp.toFixed(1)}°F`;

        forecast.appendChild(p);
    }
}

apiFetch();