const express = require("express");

const router = express.Router();

const ModleShop = require("../../modles/shop/shop");

const ModleSelect = require("../../modles/select/selectSql")

//获取商品列表接口
router.get("/shoplist",function(req,res,next){
	let keys = parseInt(req.query.keys);
	ModleShop.getShopList(keys,"shoplist",function(err,result){
		if(err){
			res.json({
				code: 404,
				states:'NO',
				message: '获取失败！'
			})
			return;
		}
		res.json({
			code:200,
			states:'OK',
			message:'获取成功',
			list:result
		})
	})
})

//根据id查询商品列表接口
router.get("/listmes",function(req,res,next){
	let shopid = req.query.shopid;
	ModleSelect.getById(shopid,"shoplist",function(err,result){
		if(err){
			res.json({
				code: 404,
				states:'NO',
				message: '获取失败！'
			})
			return;
		}
		for(var i=0;i<result.length;i++){
			let ct = new Date(result[i].createTime);
			let ft = new Date(result[i].finesTime);
			result[i].createTime = ct.toFormat("YYYY-MM-DD HH24:MI:SS")
			result[i].finesTime = ft.toFormat("YYYY-MM-DD HH24:MI:SS")
		}
		res.json({
			code:200,
			states:'OK',
			message:'获取成功',
			list:result
		})
	})
})

//删除商品接口
router.get("/removelist",function(req,res,next){
	let shopid = req.query.shopid;
	ModleSelect.removeById(shopid,"shoplist",function(err){
		if(err){
			res.json({
				code:404,
				states:'NO',
				message:'删除失败！',
				data: err
			})
			return;
		}
		res.json({
			code:200,
			states:'OK',
			message: '删除成功！'
		})
	})
})

//添加商品接口
router.post("/addShopList",function(req,res,next){
	ModleShop.insertShopList("shoplist",req,function(err,result){
		if(err){
			res.json({
				code: 404,
				states:'NO',
				message: '添加商品失败！',
				data: err
			})
			return;
		}
		res.json({
			code:200,
			states:'OK',
			message:'添加商品成功',
			onlist:result
		})
	})
})

module.exports = router;
