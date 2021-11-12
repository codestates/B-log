const express = require("express");
const router = express.Router();
const { authController } = require("../controller");

router.post("/login", authController.login.post);

router.post("/logout", authController.logout.post);

router.get("/checkuseremail/:email", authController.checkuseremail.get);

router.post("/signup", authController.signup.post);

router.delete("/withdraw", authController.withdraw.delete);

module.exports = router;
