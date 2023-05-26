require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express();
const { SERVER_PORT } = process.env
const { addPlace, getCountries, createCity, getCity, deleteCity } = require('./controller')

//middleware
app.use(cors());
app.use(express.json());

//logic
// const db = require('./db.json');

app.post('/addToList', addPlace);

app.get('/countries', getCountries);

app.post('/createCity', createCity);
app.get('/createCity', getCity);

app.delete('/createCity/:id', deleteCity);


// app.get('/weather', getWeather);


app.listen(SERVER_PORT, () => console.log('Listening on port 4003...')); 