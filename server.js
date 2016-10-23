const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const favsRouter = require('./routes/favorites.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.use('/favorites', favsRouter);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
  console.log('Listening on port', server.address().port);
});
