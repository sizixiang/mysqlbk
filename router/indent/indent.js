const express = require("express")

const router = express.Router();

const ModlesIndent = require("../../modles/indent/indent")

router.post("/addIndent",function(req,res,next){
	ModlesIndent.addMyIndentPost("indent",req,function(err,result){
		if(err){
			res.json({
				code:404,
				message:'订单填加失败！',
				data: err
			})
			return;
		}
		res.json({
			code:200,
			message:'订单添加成功！',
			data:result
		})
	})
})

//订单查询接口
router.get("/indentlist",function(req,res,next){
	let userid = req.query.ide;
	let state = req.query.keys;
	ModlesIndent.getUserIDByIndent("indent",userid,state,function(err,result){
		if(err){
			res.json({
				code:404,
				message:'获取失败！',
				data: err
			})
			return;
		}
		let ctTime = [];
		for(var i=0;i<result.length;i++){
			let ct = new Date(result[i].createTime);
			result[i].createTime = ct.toFormat("YYYY-MM-DD HH24:MI:SS")
			ctTime.push(ct.toFormat("YYYY-MM-DD"))
		}
		res.json({
			code:200,
			message:'获取成功！',
			data:result,
			createTime:ctTime
		})
	})
})

module.exports = router;
