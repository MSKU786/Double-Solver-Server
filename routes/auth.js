// import express
const express = require('express');

// import express router
const router = express.Router();

//import auth controller
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.delete("/:id", authController.delete);
router.get("/user/:id", authController.get);
router.post("/login", authController.login);
router.get("/only/TA", authController.onlyTA);
router.post("/googleLogin", authController.googleLogin);
// export the router
module.exports = router;