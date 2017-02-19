const db = require('../index');
var Schema = require('mongoose').Schema;

const OriginSchema = new Schema({address: String});

var Origin = db.model('Origin', OriginSchema);

const createNewOrigin = (address) => {
    const newOrigin = new Origin({address: address});
    return new Promise((resolve, reject) => {
        newOrigin.save((err) => reject(err));
        resolve();
    });
}

const getAllOrigins = () => {
    return new Promise((resolve, reject) => {
        Origin.find({}, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result)
        });
    });
}

exports.createNewOrigin = createNewOrigin;
exports.getAllOrigins = getAllOrigins;