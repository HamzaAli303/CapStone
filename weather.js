// const url = `http://api.openweathermap.org/data/2.5/weather?q=Denver&appid=886705b4c1182eb1c69f28eb8c520e20&units=imperial`
// const apiKey = "886705b4c1182eb1c69f28eb8c520e20"
// const weather = document.getElementById('weather')
const city = document.querySelector('#search-bar');
const weather = document.querySelector('.weather');


function getWeather(city) {
    weather.innerHTML = ''
    console.log(city.value);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=886705b4c1182eb1c69f28eb8c520e20&units=imperial`)
        .then(res => {
            // return res.data.main.temp
            console.log(res.data.weather)
            let weatherCard = ` <h2 class="city">Weather in ${city.value}</h2>
            <h1 class="temp">${res.data.main.temp}°</h1> 
            <div class="discription">${res.data.weather[0].description}</div>
            <div class="humidity">Humidity: ${res.data.main.humidity}</div>
            <div class="wind">Wind speed: ${res.data.wind.speed} km/h</div>`
            weather.innerHTML += weatherCard
        })
};

function nextPage(event) {
    event.preventDefault()
    window.location.href = "index.html#second-page"
}




console.log('Hello')