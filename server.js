const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const favsList = require('public/routes/favorites.js');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/favorites', favsList);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

app.get('/favorites', function(req, res) {
  res.send(200);
});

app.listen(3000);
