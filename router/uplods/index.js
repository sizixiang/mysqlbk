const express = require("express");

const router = express.Router();

const ModlesUplods = require("../../modles/uplods/uplods")

router.use("/", function(req, res, next) {
	next();
})

router.post("/uploads", function(req, res, next) {
	if(req.session.userInfo) {
		ModlesUplods.uploadUserHead("user", req, function(err,sqlPath) {
			if(err){
				res.json({
					code: 404,
					message: '上传失败！',
					data: err
				})
				return;
			}
			req.session.userInfo.userHead = sqlPath;
			res.json({
				code: 200,
				message: '成功！'
			})
		})
	} else {
		res.json({
			code: 404,
			message: '请先登录！'
		});
		return;
	}

})
module.exports = router;