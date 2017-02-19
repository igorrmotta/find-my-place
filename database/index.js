var mongoose = require('mongoose');
//Loads all the models

const DEV_DB = 'mongodb://localhost/find_my_place_DEV';

mongoose.Promise = require('bluebird');
mongoose.connect(DEV_DB);

const db = mongoose.connection;

db.on('open', () => {
    console.log('db running at: %s', DEV_DB);
    require('./models');
});

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;