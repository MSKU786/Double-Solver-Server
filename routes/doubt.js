// import express
const express = require('express');
const passport = require('passport');
// import express router
const router = express.Router();

//import auth controller
const doubtController = require("../controllers/doubtController");

router.post("/", doubtController.create);
router.delete("/:id", doubtController.delete);
router.get("/:id", doubtController.get);


// export the router
module.exports = router;

