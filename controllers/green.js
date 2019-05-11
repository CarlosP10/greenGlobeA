const green = require('../models/green');

exports.create = (req, res) => {

    let greenNueva = new green({
        title: req.body.title,
        image: req.body.image,
        resumen: req.body.resumen,
        content: req.body.content,
        date: req.body.date,
        author: req.body.author
    });

    greenNueva.save()
        .then(data => {
            res.send({
                ok: true,
                clase: data
            });
        })
        .catch(err => {
            return res.status(500).send({
                ok: false,
                message: "Internal error creating green.",
                error: err
            });
        });

}

exports.findAll = (req, res) => {
    green.find()
        .then(greens => {
            res.send({
                ok: true,
                greens: greens
            });
        })
        .catch(err => {
            return res.status(500).send({
                ok: false,
                message: "Internal error finding all greens.",
                error: err
            });
        })
}

exports.update = (req, res) => {
    green.findByIdAndUpdate(req.params.greenId, {
            title: req.body.title,
            image: req.body.image,
            resumen: req.body.resumen,
            content: req.body.content,
            date: req.body.date,
            author: req.body.author,
        }, { new: true })
        .then(updated => {
            res.send({
                ok: true,
                updated: updated
            });
        })
        .catch(err => {
            return res.status(500).send({
                ok: false,
                message: "Internal error updating green.",
                error: err
            });
        });
}