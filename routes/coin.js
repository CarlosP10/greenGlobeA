var express = require('express');
var router = express.Router();
var coin = require('../controllers/coin');

router.get('/', coin.findAll);

router.post('/', coin.create);

router.put('/:coinId', coin.update);

router.delete('/:coinId', coin.delete);

module.exports = router;