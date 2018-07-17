const express = require("express")

const router = express.Router();

const shop = require("./shop")

router.use("/",function(req,res,next){
	next();
})

router.use(shop);

module.exports = router;
