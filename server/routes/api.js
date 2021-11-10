const express = require('express');
const router = express.Router();
const apiController = require('../controller/api')

router.get('/books/:keyword', apiController.books);

router.get('/:id', apiController.pages);

router.get('/', apiController.bestseller);

module.exports = router;