let viewList = document.querySelector('#viewList');
let message = document.querySelector('#message');

let getCity = () => {
    console.log('here')
    message.innerHTML = '';
    let index = 0;

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
                <button onclick="crossedCard(${index})">Visited</button></div>`


                message.appendChild(countryCard);
                index += 1;
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

let crossedCard = (index) => {
    var countryCard = document.getElementsByClassName('countryCard')
    countryCard[index].style.textDecoration = 'line-through'
}

viewList.addEventListener('click', getCity);