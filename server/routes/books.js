const express = require("express");
const router = express.Router();
const bookController = require("../controller/books");

router.get("/list/:keyword", bookController.list);

router.get("/item/:isbn", bookController.item);

router.get("/", bookController.bestseller);

module.exports = router;
