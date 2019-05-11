const mongoose = require('mongoose');

var greenModel = mongoose.Schema({
    title: String,
    image: String,
    resumen: String,
    content: String,
    date: String,
    author: String
});

module.exports = mongoose.model('green', greenModel);