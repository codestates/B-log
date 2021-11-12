const express = require("express");
const router = express.Router();
const { usersController } = require("../controller");

router.get("/readuser", usersController.readuser.get);

router.patch("/password", usersController.password.patch);

router.patch("/username", usersController.username.patch);

module.exports = router;
