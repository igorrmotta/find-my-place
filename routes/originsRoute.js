const router = require('express').Router();
const OriginModel = require('../database/models').OriginModel;

router.post('/origin', (req, res) => {
    const db = req.params.database;

    const address = req.body.address;

    OriginModel
        .createNewOrigin(address)
        .then(() => {
            console.log('ok');
            res.send({status: 'ok'});
        })
        .catch(err => {
            console.log(err);
            res.send({error: err});
        });
});

router.get('/origins', (req, res) => {
    const db = req.params.database;

    const address = req.body.address;

    OriginModel
        .getAllOrigins()
        .then((origins) => {
            console.log(origins);
            res.send({result: origins});
        })
        .catch(err => {
            console.log(err);
            res.send({error: err});
        });
});

module.exports = router;