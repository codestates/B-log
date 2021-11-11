const express = require('express');
const router = express.Router();
const {mypageController} = require('../controller');

router.get('/rack', mypageController.rack.get)

router.post('/rack', mypageController.rack.post)

//router.delete('/rack', mypageController.rack.delete)

//router.get('shelf', mypageController.shelf.get)

//router.post('/shelf', mypageController.shelf.post)

//router.delete('/shelf', mypageController.shelf.delete)

//router.get('review', mypageController.review.get)

//router.patch('/review', mypageController.review.patch)

module.exports = router;