const express = require("express");
const router = express.Router();
const { authController } = require("../controller");
const checkAuth = require("../middleware/checkAuth");

router.post("/login", authController.login.post);

router.post("/logout", authController.logout.post);

router.get("/checkuseremail/:email", authController.checkuseremail.get);

router.post("/signup", authController.signup.post);

router.delete("/withdraw", checkAuth, authController.withdraw.delete);

module.exports = router;
