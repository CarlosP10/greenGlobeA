const coin = require('../models/coin');

exports.create = (req, res) => {
    
    let coinNueva = new coin({
        name: req.body.name,
        country: req.body.country,
        value: req.body.value,
        value_us: req.body.value_us,
        year: req.body.year,
        review: req.body.review,
        isAvailable: req.body.isAvailable,
        img: req.body.img
    });

    coinNueva.save()
    .then(data => {
        res.send({
            ok:true,
            clase:data
        });
    })
    .catch(err => {
        return res.status(500).send({
            ok:false,
            message: "Internal error creating coin.",
            error: err
        });
    });
    
}

exports.findAll = (req,res) => {
    coin.find()
    .then(coins => {
        res.send({
            ok:true,
            coins: coins
        });
    })
    .catch(err => {
        return res.status(500).send({
            ok:false,
            message:"Internal error finding all coins.",
            error: err
        });
    })
}

exports.update = (req,res) => {
    coin.findByIdAndUpdate(req.params.coinId, {
        name: req.body.name,
        country: req.body.coutry,
        value: req.body.value,
        value_us: req.body.value_us,
        year: req.body.year,
        review: req.body.review,
        isAvailable: req.body.isAvailable,
        img: req.body.img
    }, {new:true})
    .then(updated => {
        res.send({
            ok:true,
            updated:updated
        });
    })
    .catch(err => {
        return res.status(500).send({
            ok:false,
            message:"Internal error updating coin.",
            error:err
        });
    });
}

exports.delete = (req,res) => {
    coin.findByIdAndDelete(req.params.coinId)
    .then(deleted => {
        res.send({
            ok:true,
            deleted:deleted
        });
    })
    .catch(err => {
        return res.status(500).send({
            ok:false,
            message: "Internal error deleting coin",
            error:err
        });
    });
}