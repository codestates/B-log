const express = require("express");
const router = express.Router();
const { usersController } = require("../controller");
const checkAuth = require("../middleware/checkAuth");

router.get("/", checkAuth, usersController.readuser.get);

router.patch("/password", checkAuth, usersController.password.patch);

router.patch("/username", checkAuth, usersController.username.patch);

module.exports = router;
