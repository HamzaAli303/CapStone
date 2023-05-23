console.log('hello World');

let message = document.querySelector('#message');
// let form = document.querySelector('form');
let addToList = document.querySelector("#addToListBtn");
let inputDate = document.querySelector('#input-date');
let inputDestination = document.querySelector('#input-destination');
let countrySelect = document.querySelector('#country-select');
let viewList = document.querySelector('#viewList');
let thirdPage = document.querySelector('#third-Page');


let addPlace = (event) => {
    event.preventDefault()

    if (inputDestination.value < 1 && countrySelect.value === '') {
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

        window.location.href = `#third-Page`

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

let getCity = () => {
    console.log('here')
    message.innerHTML = '';

    axios.get('http://127.0.0.1:4003/createCity')
        .then(res => {
            res.data.forEach(elem => {
                let countryCard = document.createElement(`div`)
                countryCard.classList.add('country-card')
                countryCard.innerHTML = `
                <div class="countryCard">
                <h2>${elem.city}, ${elem.country}</h2>
                <h3>Date of travel: ${elem.date}</h3>
                <button id="deleteBtn" onclick="deleteCard(${elem['city_id']})">Delete</button>
                <button onclick="crossedCard(${elem['city_id']})">Visted</button></div>`


                message.appendChild(countryCard);
            });
        });
};

let deleteCard = (id) => {
    axios.delete(`http://127.0.0.1:4003/createCity/${id}`)
        .then(res => {
            if (res.status === 200) {
                getCity();
            }
        })
        .catch(err => console.log(err));
};

let crossedCard = (id) => {
    var countryCard = document.getElementsByClassName('countryCard')
    countryCard[id - 1].style.textDecoration = 'line-through'
}

// let initMap = () => {
//     var location = { lat: -25.363, lng: 131.044 };
//     var map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 4,
//         center: location
//     });
// }
// AIzaSyAN8GTud8wskmxVjPjVD2W_ofu9nn4ZN24



// getCity();
getCountries();
addToList.addEventListener('click', addPlace);
viewList.addEventListener('click', getCity);






















