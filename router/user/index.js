const express = require("express");

const router = express.Router();

const user = require("./user");

router.use("/",function(req,res,next){
	next();
})

router.use(user);

module.exports = router;
