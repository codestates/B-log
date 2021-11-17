const express = require("express");
const router = express.Router();
const { mypageController } = require("../controller");
const checkAuth = require("../middleware/checkAuth");

router.get("/rack", checkAuth, mypageController.rack.get);

router.post("/rack", checkAuth, mypageController.rack.post);

router.delete("/rack/:bookid", checkAuth, mypageController.rack.delete);

router.get("/shelf", checkAuth, mypageController.shelf.get);

router.post("/shelf", checkAuth, mypageController.shelf.post);

router.delete("/shelf/:bookid", checkAuth, mypageController.shelf.delete);

router.get("/review/:bookid", checkAuth, mypageController.review.get);

router.patch("/review/:bookid", checkAuth, mypageController.review.patch);

router.delete("/review/:bookid", checkAuth, mypageController.review.delete);

module.exports = router;
