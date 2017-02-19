const router = require('express').Router();
const OriginModel = require('../database/models').OriginModel;

const getOrigins = () => (req, res, next) => {
    return OriginModel
        .getAllOrigins()
        .then((result) => {
            req.origins = result;
            next();
        })
        .catch(next);

};

const getResult = (origins, rows, method) => {
    let distances = [];
    rows.map((row, index) => {
        row
            .elements
            .map(element => {
                distances.push({
                    address: origins[index],
                    distance: (method === 'distance')
                        ? element.distance.text
                        : element.duration.text
                });
            })
    });
    return distances;
}

router.get('/:method', [getOrigins()], (req, res, next) => {
    const method = req.params.method;
    const googleMaps = req.app.settings.googleMaps;
    const origins = req
        .origins
        .map(item => item.address);
    const destinations = [req.app.settings.destination.address];

    googleMaps.distanceMatrix({
        origins: origins,
        destinations: destinations
    }, (err, response) => {
        if (err) {
            next(err);
        } else {
            const rows = response.json.rows;
            const distances = getResult(origins, rows, method);
            res.send({result: distances});
            next();
        }
    })
});

module.exports = router;