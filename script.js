//Checks:
// 1.Prevent the form from refreshing
// 2.
//const url = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=4e7bc7801d2ca437ab43d53e1c5418d7'
// const city = `${userCityName}`;

const weatherForm = document.getElementById('weather-form');
const displaySection = document.getElementById('display-info');
const apiKey = '4e7bc7801d2ca437ab43d53e1c5418d7'       // OpenWeatherMap API KEY

weatherForm.addEventListener('submit', function(e){
    e.preventDefault(); //prevent form from refreshing the page 

    const userCityName = document.getElementById('cityname').value.trim();
    
        if(userCityName === ''){
            displaySection.innerHTML = `
            <h2 id="search-heading">Search Info</h2>
            <p>Please enter a city name.</p>`;
        return;
    }

// Get the city name from user input


const url = `https://api.openweathermap.org/data/2.5/weather?q=${userCityName}&appid=${apiKey}&units=metric`;
// const fetchInfoBtn = document.getElementById('fetch-info');

// fetchInfoBtn.addEventListener('click',function(){
    
//     console.log(userCityName);
//     console.log(url)

fetch(url)
    .then((response) => {
        if(!response.ok){
            throw new Error('City not found.')
        }
        return response.json();
    })
    .then((data) => {
        console.log(data)
        displaySection.innerHTML = `
            <h2>🌆Weather in ${data.name} </h2>
            <p>🌡️Temperature: ${data.main.temp}°C</p>
            <p>🌤️Conditions: ${data.weather[0].description}
            `;
    
    })
    .catch(error => {
        displaySection.innerHTML = `
            <h2 id="search-heading">Search Info</h2>
            <p>Error: ${error.message}</p>
            `;
    
    });
});

//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//   fetch(url)
//     .then(response => {
//       if (!response.ok) throw new Error("City not found");
//       return response.json();
//     })
//     .then(data => {
//       const { name } = data;
//       const temp = data.main.temp;
//       const description = data.weather[0].description;

//       displaySection.innerHTML = `
//         <h2 id="search-heading">Search Info</h2>
//         <p><strong>City:</strong> ${name}</p>
//         <p><strong>Temperature:</strong> ${temp} °C</p>
//         <p><strong>Weather:</strong> ${description}</p>
//       `;
//     })
//     .catch(error => {
//       displaySection.innerHTML = `
//         <h2 id="search-heading">Search Info</h2>
//         <p style="color: red;">❌ ${error.message}</p>
//       `;
//     });
// });
