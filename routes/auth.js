// import express
const express = require('express');
const passport = require('passport');
// import express router
const router = express.Router();

//import auth controller
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.delete("/:id", authController.delete);
router.get("/user/:id", authController.get);
router.post("/login", authController.login);
router.get("/onlyTA", authController.onlyTA);

// export the router
module.exports = router;