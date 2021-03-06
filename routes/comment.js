// import express
const express = require('express');

// import express router
const router = express.Router();

//import auth controller
const commentController = require("../controllers/commentController");

router.post("/create/:id",  commentController.create);
router.delete("/:id",  commentController.delete);
router.get("/get/:id",  commentController.get);


// export the router
module.exports = router;