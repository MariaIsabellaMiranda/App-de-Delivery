const express = require('express');
const cors = require('cors');
const loginRoute = require('../routes/loginRoute');
const { Router } = require('express');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/login', loginRoute);

const test = Router();

test.get('/', (req, res) => {
  res.status(200).json([
      {
        id: 1,
        name: 'Skol Lata 250ml',
        price: 2.2,
        url_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTygKt2QkLoXVOee41GeGQSbnfmYarmtQerR1-AJO3IyA&s',
      },
      {
        id: 2,
        name: 'Heineken 600ml',
        price: 7.5,
        url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
      },
      {
        id: 3,
        name: 'Antarctica Pilsen 300ml',
        price: 2.49,
        url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
      },
      {
        id: 4,
        name: 'Brahma 600ml',
        price: 7.5,
        url_image: 'http://localhost:3001/images/brahma_600ml.jpg',
      },
      {
        id: 5,
        name: 'Skol 269ml',
        price: 2.19,
        url_image: 'http://localhost:3001/images/skol_269ml.jpg',
      },
      {
        id: 6,
        name: 'Skol Beats Senses 313ml',
        price: 4.49,
        url_image: 'http://localhost:3001/images/skol_beats_senses_313ml.jpg',
      },
      {
        id: 7,
        name: 'Becks 330ml',
        price: 4.99,
        url_image: 'http://localhost:3001/images/becks_330ml.jpg',
      },
      {
        id: 8,
        name: 'Brahma Duplo Malte 350ml',
        price: 2.79,
        url_image: 'http://localhost:3001/images/brahma_duplo_malte_350ml.jpg',
      },
      {
        id: 9,
        name: 'Becks 600ml',
        price: 8.89,
        url_image: 'http://localhost:3001/images/becks_600ml.jpg',
      },
      {
        id: 10,
        name: 'Skol Beats Senses 269ml',
        price: 3.57,
        url_image: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg',
      },
      {
        id: 11,
        name: 'Stella Artois 275ml',
        price: 3.49,
        url_image: 'http://localhost:3001/images/stella_artois_275ml.jpg',
      },
    ]);
});

app.use('/costumer/products', test);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
