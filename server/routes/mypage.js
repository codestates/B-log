const express = require('express');
const router = express.Router();
const {mypageController} = require('../controller');

router.get('/', function(req, res) {
  res.send();
})

module.exports = router;