//Checks:
// 1.Prevent the form from refreshing
// 2.
//const url = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=4e7bc7801d2ca437ab43d53e1c5418d7'
// const city = `${userCityName}`;

const weatherForm = document.getElementById('weather-form');
const displaySection = document.getElementById('display-info');
const apiKey = '4e7bc7801d2ca437ab43d53e1c5418d7'       // OpenWeatherMap API KEY
let isFahrenheit = false;           //toggle between Celsius and Fah.


weatherForm.addEventListener('submit', function(e){
    e.preventDefault(); //prevent form from refreshing the page 

const userCityName = document.getElementById('cityname').value.trim();
const validCityRegex = /^[a-zA-z\s]+$/.test(userCityName);    

    if(userCityName === ''){
        displaySection.innerHTML = `
        <h2 id="search-heading">Search Info</h2>
        <p>❗ Please enter a city name.</p>`;
        return;
    }


    if(!validCityRegex) {
        alert("Please enter a valid city name (letters only).");
        return;
    }


// Get the city name from user input


const unitType = isFahrenheit ? 'imperial' : 'metric';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${userCityName}&appid=${apiKey}&units=${unitType}`;
// const fetchInfoBtn = document.getElementById('fetch-info');

// fetchInfoBtn.addEventListener('click',function(){
    
//     console.log(userCityName);
//     console.log(url)


displaySection.innerHTML = `
    <div class="card">
        <p>⏳ Fetching weather data for <strong>${userCityName}</strong>...</p>
        <div class="spinner"></div>
    </div>`;

function formatTime(timestamp){
    const time = new Date(timestamp * 1000);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12 : true})
}

function getWeatherVideo(condition){
    const c = condition.toLowerCase();
    if(c.includes("clear")) return "assets/clear_sky.mp4";
    if(c.includes("few")) return "assets/few_clouds.mp4";
    if(c.includes("scattered")) return "assets/scattered_clouds.mp4";
    if(c.includes("broken")) return "assets/broken_clouds.mp4";
    if(c.includes("overcast")) return "assets/broken_clouds.mp4";
    if(c.includes("light")) return "assets/shower_rain.mp4";
    if(c.includes("rain")) return "assets/light_rain.mp4";
    if(c.includes("thunder")) return "assets/thunderstorm.mp4";
    if(c.includes("snow")) return "assets/snow.mp4";
    if(c.includes("mist")) return "assets/mist.mp4";
}
setTimeout(() => {
fetch(url)
    .then((response) => {
        if(!response.ok){
            throw new Error('Please check your input or try another city')
        }
        return response.json();
    })
    .then((data) => {
        console.log(data)
        const videoUrl = getWeatherVideo(data.weather[0].description);
        document.getElementById('weather-bg').src = videoUrl
        const sunrise = formatTime(data.sys.sunrise)
        const sunset = formatTime(data.sys.sunset)
        const windspeed = (data.wind.speed * 3.6).toFixed(1);
        const pressure = data.main.pressure;
        
        displaySection.innerHTML = `
        <div class="card">
            <h2>🌆 Weather in ${data.name} </h2>
            <p>
                <strong>🌡️ Temperature: </strong>
                <span id="temp-value">${data.main.temp}</span>°
                <span id="temp-unit">${isFahrenheit ? 'F' : 'C'}</span>
            </p>
            
            <div class="unit-toggle-container">
                <label class="switch-slider">
                    <input type ="checkbox" id="tempToggle" ${isFahrenheit ? 'checked': ''}>
                    <span class="slider"></span>
            </label>
                <span class="unit-label">${isFahrenheit ? 'Fahrenheit' : 'Celsius'}</span>
            </div>

            <p><strong>🌤️ Conditions: </strong>${data.weather[0].description}</p>
            <hr>
            <p><strong>🌅 Sunrise: </strong>${sunrise}</p>
            <p><strong>🌇 Sunset:</strong> ${sunset}</p>
            <p><strong>💨 Wind Speed:</strong> ${windspeed} km</p>
            <p><strong>🌬️ Pressure:</strong> ${pressure} hPa</p>
        </div>
            `;
        document.getElementById('tempToggle').addEventListener('change',(e)=>{
            isFahrenheit = e.target.checked;
            weatherForm.dispatchEvent(new Event('submit'));
        });
    
    })
    .catch(error => {
        displaySection.innerHTML = `
        <div class="card">
            <h2 id="search-heading">Search Info</h2>
            <p>🚫 Unable to get weather for ${userCityName} . ${error.message}</p>
            `;
    
        });
    }, 1000);
});

