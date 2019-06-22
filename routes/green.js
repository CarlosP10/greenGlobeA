var express = require('express');
var router = express.Router();
var green = require('../controllers/green');

router.get('/', green.findAll);

router.post('/', green.create);

router.put('/:greenId', green.update);

router.delete('/:greenId', green.delete);

module.exports = router;