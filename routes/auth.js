// import express
const express = require('express');
const passport = require('passport');
// import express router
const router = express.Router();

//import auth controller
const authController = require("../controllers/authController");

router.post("/", authController.register);
router.delete("/:id", authController.delete);
router.get("/:id", authController.get);
router.post("/login", authController.login);
// export the router
module.exports = router;