require('dotenv').config()
const { CONNECTION_STRING } = process.env
// const { Module } = require('module');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    addPlace: (req, res) => {
        sequelize.query(`
    drop table if exists cities;
              drop table if exists countries;
   
   
              create table countries (
                  country_id serial primary key,
                  name varchar
              );

              CREATE TABLE cities (
                city_id SERIAL PRIMARY KEY, 
                name VARCHAR, 
                date DATE,
                country_id INTEGER REFERENCES countries(country_id)
            );

    insert into countries (name)
       values ('Afghanistan'),
       ('Albania'),
       ('Algeria'),
       ('Andorra'),
       ('Angola'),
       ('Antigua and Barbuda'),
       ('Argentina'),
       ('Armenia'),
       ('Australia'),
       ('Austria'),
       ('Azerbaijan'),
       ('Bahamas'),
       ('Bahrain'),
       ('Bangladesh'),
       ('Barbados'),
       ('Belarus'),
       ('Belgium'),
       ('Belize'),
       ('Benin'),
       ('Bhutan'),
       ('Bolivia'),
       ('Bosnia and Herzegovina'),
       ('Botswana'),
       ('Brazil'),
       ('Brunei'),
       ('Bulgaria'),
       ('Burkina Faso'),
       ('Burundi'),
       ('Côte d''Ivoire'),
       ('Cabo Verde'),
       ('Cambodia'),
       ('Cameroon'),
       ('Canada'),
       ('Central African Republic'),
       ('Chad'),
       ('Chile'),
       ('China'),
       ('Colombia'),
       ('Comoros'),
       ('Congo'),
       ('Costa Rica'),
       ('Croatia'),
       ('Cuba'),
       ('Cyprus'),
       ('Czech Republic'),
       ('Democratic Republic of the Congo'),
       ('Denmark'),
       ('Djibouti'),
       ('Dominica'),
       ('Dominican Republic'),
       ('Ecuador'),
       ('Egypt'),
       ('El Salvador'),
       ('Equatorial Guinea'),
       ('Eritrea'),
       ('Estonia'),
       ('Eswatini'),
       ('Ethiopia'),
       ('Fiji'),
       ('Finland'),
       ('France'),
       ('Gabon'),
       ('Gambia'),
       ('Georgia'),
       ('Germany'),
       ('Ghana'),
       ('Greece'),
       ('Grenada'),
       ('Guatemala'),
       ('Guinea'),
       ('Guinea-Bissau'),
       ('Guyana'),
       ('Haiti'),
       ('Holy See'),
       ('Honduras'),
       ('Hungary'),
       ('Iceland'),
       ('India'),
       ('Indonesia'),
       ('Iran'),
       ('Iraq'),
       ('Ireland'),
       ('Israel'),
       ('Italy'),
       ('Jamaica'),
       ('Japan'),
       ('Jordan'),
       ('Kazakhstan'),
       ('Kenya'),
       ('Kiribati'),
       ('Kuwait'),
       ('Kyrgyzstan'),
       ('Laos'),
       ('Latvia'),
       ('Lebanon'),
       ('Lesotho'),
       ('Liberia'),
       ('Libya'),
       ('Liechtenstein'),
       ('Lithuania'),
       ('Luxembourg'),
       ('Madagascar'),
       ('Malawi'),
       ('Malaysia'),
       ('Maldives'),
       ('Mali'),
       ('Malta'),
       ('Marshall Islands'),
       ('Mauritania'),
       ('Mauritius'),
       ('Mexico'),
       ('Micronesia'),
       ('Moldova'),
       ('Monaco'),
       ('Mongolia'),
       ('Montenegro'),
       ('Morocco'),
       ('Mozambique'),
       ('Myanmar'),
       ('Namibia'),
       ('Nauru'),
       ('Nepal'),
       ('Netherlands'),
       ('New Zealand'),
       ('Nicaragua'),
       ('Niger'),
       ('Nigeria'),
       ('North Korea'),
       ('North Macedonia'),
       ('Norway'),
       ('Oman'),
       ('Pakistan'),
       ('Palau'),
       ('Palestine State'),
       ('Panama'),
       ('Papua New Guinea'),
       ('Paraguay'),
       ('Peru'),
       ('Philippines'),
       ('Poland'),
       ('Portugal'),
       ('Qatar'),
       ('Romania'),
       ('Russia'),
       ('Rwanda'),
       ('Saint Kitts and Nevis'),
       ('Saint Lucia'),
       ('Saint Vincent and the Grenadines'),
       ('Samoa'),
       ('San Marino'),
       ('Sao Tome and Principe'),
       ('Saudi Arabia'),
       ('Senegal'),
       ('Serbia'),
       ('Seychelles'),
       ('Sierra Leone'),
       ('Singapore'),
       ('Slovakia'),
       ('Slovenia'),
       ('Solomon Islands'),
       ('Somalia'),
       ('South Africa'),
       ('South Korea'),
       ('South Sudan'),
       ('Spain'),
       ('Sri Lanka'),
       ('Sudan'),
       ('Suriname'),
       ('Sweden'),
       ('Switzerland'),
       ('Syria'),
       ('Tajikistan'),
       ('Tanzania'),
       ('Thailand'),
       ('Timor-Leste'),
       ('Togo'),
       ('Tonga'),
       ('Trinidad and Tobago'),
       ('Tunisia'),
       ('Turkey'),
       ('Turkmenistan'),
       ('Tuvalu'),
       ('Uganda'),
       ('Ukraine'),
       ('United Arab Emirates'),
       ('United Kingdom'),
       ('United States of America'),
       ('Uruguay'),
       ('Uzbekistan'),
       ('Vanuatu'),
       ('Venezuela'),
       ('Vietnam'),
       ('Yemen'),
       ('Zambia'),
       ('Zimbabwe');
    `).then(() => {
            console.log('DB addPlace!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },

    getCountries: (req, res) => {
        sequelize.query('SELECT * FROM countries')
            .then((dbRes) => {
                res.status(200).send(dbRes[0])
            })
    },

    createCity: (req, res) => {
        const { date, dest, country } = req.body
        sequelize.query(`INSERT INTO cities (date, name, country_id)
        VAlUES ('${date}', '${dest}', ${country})
        returning *`).then(dbRes => res.status(200).send(dbRes[0])).catch(err => console.log('error CREATING CITY', err))
    },

    getCity: (req, res) => {
        sequelize.query(`SELECT
        cities.city_id,
        cities.name AS city,
        cities.date,
        countries.country_id,
        countries.name AS country
        FROM
        cities
        JOIN countries ON cities.country_id = countries.country_id
        ORDER BY cities.date ASC`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log('error GETTING CITIES', err))
    },

    deleteCity: (req, res) => {
        const { id } = req.params
        sequelize.query(`DELETE FROM
        cities
        WHERE city_id = ${id}`).then(dbRes => res.status(200).send(dbRes[0])).catch(err => console.log('error DELETE DOESN"T WORK', err))
    }

};