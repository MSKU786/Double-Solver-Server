// import express
const express = require('express');
const passport = require('passport');
// import express router
const router = express.Router();

//import auth controller
const doubtController = require("../controllers/doubtController");

router.post("/create", doubtController.create);
router.delete("/:id", doubtController.delete);
router.get("/one/:id", doubtController.get);
router.get("/getAll", doubtController.getAll);
router.get("/getRemaining/:id", doubtController.getRemaining);
router.put("/accepted/:id", doubtController.accepted);
router.put("/escalated/:id", doubtController.escalated);
// export the router
module.exports = router;

