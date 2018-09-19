const express = require("express")

const router = express.Router();

const ModlesIndent = require("../../modles/indent/indent")

router.post("/addIndent", function(req, res, next) {
	ModlesIndent.addMyIndentPost("indent", req, function(err, result,id) {
		if(err) {
			res.json({
				code: 404,
				message: '订单填加失败！',
				data: err
			})
			return;
		}
		res.json({
			code: 200,
			message: '订单添加成功！',
			data: result,
			shopide: id
		})
	})
})

//订单查询接口
router.get("/indentlist", function(req, res, next) {
	let userid = req.query.ide;
	let state = req.query.keys;
	if(userid.toString() == req.session.userInfo.userId.toString()) {
		ModlesIndent.getUserIDByIndent("indent", userid, state, function(err, result) {
			if(err) {
				res.json({
					code: 404,
					message: '获取失败！',
					data: err
				})
				return;
			}
			let ctTime = [];
			for(var i = 0; i < result.length; i++) {
				let ct = new Date(result[i].createTime);
				result[i].createTime = ct.toFormat("YYYY-MM-DD HH24:MI:SS")
				ctTime.push(ct.toFormat("YYYY-MM-DD"))
			}
			res.json({
				code: 200,
				message: '获取成功！',
				data: result,
				createTime: ctTime
			})
		})
	} 
})

//修改订单支付状态
router.get("/updateIndentPay",function(req,res,next){
	let payid = req.query.p;
	if(req.session.userInfo) {
		let data = {
			userid : req.session.userInfo.userId,
			payid : payid
		}
		ModlesIndent.updateIndentPay('indent',data,2,function(err,result){
			if(err) {
				res.json({
					code: 404,
					message: '支付失败！'
				})
				return;
			}
			res.json({
				code: 200,
				message: '支付成功！'
			})
		})
	}
})

//查询订单状态
router.get("/getIndentState",function(req,res,next){
//	console.log(socket)
	let payid = req.query.p;
	if(req.session.userInfo){
		ModlesIndent.getIndentState('indent',payid,req,function(err,result){
			if(err) {
				res.json({
					code: 404,
					message: '出错了~！'
				})
				return;
			}
			res.json({
				code: 200,
				message: '查询成功！',
				data: result
			})
		})
	}
})


//查询订单信息
router.get("/getIndentMessage",function(req,res,next){
	let payid = req.query.p;
	if(req.session.userInfo){
		ModlesIndent.getIndentMessage('indent',payid,req,function(err,result){
			if(err) {
				res.json({
					code: 404,
					message: '出错了~！'
				})
				return;
			}
			res.json({
				code: 200,
				message: '查询成功！',
				data: result
			})
		})
	}
})


//核销订单
//router.get("/yiiIndentPay",function(req,res,next){
//	let payid = req.query.p;
//	console.log(req.session.userInfo)
//	if(req.session.userInfo) {
//		let data = {
//			userid : req.session.userInfo.userId,
//			payid : payid
//		}
//		ModlesIndent.updateIndentPay('indent',data,3,function(err,result){
//			if(err) {
//				res.json({
//					code: 404,
//					message: '核销失败！'
//				})
//				return;
//			}
//			res.json({
//				code: 200,
//				message: '核销成功！'
//			})
//		})
//	}
//})


module.exports = router;