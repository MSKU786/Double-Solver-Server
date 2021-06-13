// import express
const express = require('express');
const passport = require('passport');
// import express router
const router = express.Router();

//import auth controller
const commentController = require("../controllers/commentController");

router.post("/:id", commentController.create);
router.delete("/:id", commentController.delete);
router.get("/:id", commentController.get);


// export the router
module.exports = router;