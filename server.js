const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database');
const destinationsRoute = require('./routes/originsRoute');
const calculationRoute = require('./routes/calculationRoute');

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAlYY7uKrGXBJ5T5EVbwKgW092d3j_4O5U'
});

const searchParams = require('./searchParams');

app.use(bodyParser.json());

app.set('database', database);
app.set('googleMaps', googleMapsClient);
app.set('destination', searchParams);

app.use(destinationsRoute);
app.use(calculationRoute);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Server running and listening to %s", port);
});