const express = require("express");

const router = express.Router();

const ModlesSelect = require("../../modles/select/selectSql")
const ModlesUser = require("../../modles/user/user")

//查询用户列表信息
router.get("/", function(req, res, next) {

	ModlesUser.findUserList("user", function(err, result) {
		if(err) {
			res.json(err);
			return;
		}
		res.json({
			code: 200,
			message: '获取成功',
			data: result
		});
	})
})

//ID查询用户信息
router.get("/useride", function(req, res, next) {

	let id = req.query.id;
	ModlesUser.getByUserId(id, "user", function(err, result) {
		if(err) {
			res.json(err);
			return;
		}
		console.log(req.session)
		res.json({
			code: 200,
			message: '获取成功',
			data: result
		});
	})
})

//注册用户
router.post("/register", function(req, res, next) {
	ModlesUser.findPostUser("user", req, function(err, ct, formData) {
		if(err) {
			res.json(err);
			return;
		}
		if(ct.length < 1) {
			ModlesSelect.insert("user", formData, function(err, result) {
				if(err) {
					res.json(err);
					return;
				}
				res.json({
					code: 200,
					message: '注册成功'
				});
			})
		} else {
			res.json({
				code: 10021,
				message: '注册失败,该账号已经注册'
			});
		}
	})
})

//修改用户信息
router.post("/update", function(req, res, next) {
	ModlesUser.updateUserInfo("user", req, function(err, result) {
		if(err) {
			res.json(err);
			return;
		}
		res.json({
			code: 200,
			message: '修改成功',
			data: result
		});
	})

})

//修改用户密码
router.post("/uppass", function(req, res, next) {
	ModlesUser.selectUserPass("user", req, function(err, result, data) {
		if(err) {
			res.json(err);
			return;
		}
		if(result == 1) {
			ModlesUser.updateUserPass("user", data, function(err, result) {
				if(err) {
					res.json({
						code: 200,
						message: '修改失败！'
					});
				}
				res.json({
					code: 200,
					message: '修改成功！',
					data: result
				});
			})
		} else {
			res.json({
				code: 10022,
				message: '修改失败,初始密码错误！'
			});
		}
	})
})

//登陆操作
router.post("/login", function(req, res, next) {
		console.log('我在请求登陆');
	if(!req.session.userInfo) {
		ModlesUser.findPostLogin("user", req, function(err, result) {
			if(err) {
				res.json(err);
				return;
			} else if(result.length == 1) {
				console.log(req.session.cookie);
				req.session.userInfo = {
					userId: result[0].id,
					userName: result[0].user,
					userHead: result[0].userhead,
				};
				res.json({
					code: 200,
					message: '登陆成功',
					data: req.session.userInfo,
				});
			} else {
				res.json({
					code: 404,
					message: '登陆失败,请检查用户名密码是否正确',
					data: result
				});
			}
		})

	} else {
		res.json({
			code: 200,
			message: '您已登录,请先注销账户~'
		});
	}

})

//检测当前用户是否登陆
router.get("/islogin", function(req, res, next) {
	//	let userid = req.query.ide;
	if(!req.session.userInfo) {
		res.json({
			code: 10001,
			states: 'NO',
			message: '当前状态未登录'
		})
		return;
	} else {
		res.json({
			code: 200,
			states: 'OK',
			message: '当前状态已登录',
			msg: req.session.userInfo,
		})
	}
})

//检测自动登录
router.get("/automaticlogin", function(req, res, next) {
	let userid = req.query.ide;
	let state = req.query.keys;
})

//注销操作
router.get("/logout", function(req, res, next) {
	req.session.destroy(function(err) {
		console.log(req.session)
		if(err) {
			res.json({
				code: 404,
				message: '注销失败！'
			})
			return
		}
	})
	res.json({
		code: 200,
		message: '注销成功'
	})
})

module.exports = router;