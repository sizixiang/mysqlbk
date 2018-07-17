const express = require("express");

const router = express.Router();

const indent = require("./indent")

router.use("/",function(req,res,next){
	next();
})

router.use(indent);

module.exports = router;
