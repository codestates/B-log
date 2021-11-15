const express = require("express");
const router = express.Router();
const { mypageController } = require("../controller");

router.get("/rack", mypageController.rack.get);

router.post("/rack", mypageController.rack.post);

router.delete("/rack/:bookid", mypageController.rack.delete);

router.get("/shelf", mypageController.shelf.get);

router.post("/shelf", mypageController.shelf.post);

router.delete("/shelf/:bookid", mypageController.shelf.delete);

router.get("/review/:bookid", mypageController.review.get);

router.patch("/review/:bookid", mypageController.review.patch);

router.delete("/review/:bookid", mypageController.review.delete);

module.exports = router;
