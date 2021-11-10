const express = require('express');
const router = express.Router();
const apiController = require('../controller/api')

router.get('/books/:keyword', apiController.books);

router.get('/:id', apiController.get);

router.get('/best10', apiController.best10);

module.exports = router;