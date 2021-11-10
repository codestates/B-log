const express = require('express');
const router = express.Router();


//루트에서 Hello World 출력
router.get('/', function(req, res, next) {
  res.send('Hello World!');
});

module.exports = router;
