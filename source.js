console.log('hello World');

let message = document.querySelector('#message');
// let form = document.querySelector('form');
let addToList = document.querySelector("#addToListBtn");
let inputDate = document.querySelector('#input-date');
let inputDestination = document.querySelector('#input-destination');
let countrySelect = document.querySelector('#country-select');
let viewList = document.querySelector('#viewList');


let addPlace = (event) => {
    event.preventDefault()

    if (inputDestination.value < 1) {
        alert('You must enter a city and country')
        return
    }

    console.log(inputDate.value, inputDestination.value)

    let body = {
        date: inputDate.value,
        dest: inputDestination.value,
        country: +countrySelect.value
    }

    axios.post('http://127.0.0.1:4003/createCity', body).then((res) => {
        console.log(res)
        countrySelect.value = 1
        inputDestination.value = ''

        window.location.href = `trips.html`

        // getCity();
    }).catch(err => console.log('err'));

};

let getCountries = () => {
    axios.get('http://127.0.0.1:4003/countries')
        .then(res => {
            console.log(res)
            res.data.forEach(country => {
                const option = document.createElement('option')
                option.setAttribute('value', country['country_id'])
                option.textContent = country.name
                countrySelect.appendChild(option)
            })
        });
};

function getWeather() {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=denver&appid=886705b4c1182eb1c69f28eb8c520e20&units=imperial`)
        .then(res => {
            console.log(res.data.main.temp)
        })
};

getWeather();


// getCity();
getCountries();
addToList.addEventListener('click', addPlace);
viewList.addEventListener('click', getCity);






















