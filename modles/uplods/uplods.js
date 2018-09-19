const conn = require("../../config/dbs")

const crypto = require("crypto");

const queryString = require('querystring');

const fs = require("fs");

const ModlesIde = require("../ide/createids")

module.exports = {
	//上传用户头像
	uploadUserHead:function(table_name,req,callback){
		let formData = "";
		req.on('data', function(data) {
			formData += data;
		})
		req.on('end',function(){
			//将字符串转换成json
			formData = queryString.parse(formData)
			//过滤图片url
	        let base64 = formData.base_img.replace(/^data:image\/\w+;base64,/, "")
	        //把图片转换成buffer对象
	        let dataBuffer = new Buffer(base64, 'base64')
			//将用户信息加密
			let MD5ID = ModlesIde.encryptPass(req.session.userInfo.userId);
			//存储到服务端的文件路径
	        let path = `public/static/upload/${MD5ID}.png`
	        //存储到数据库的图片路径
	        let sqlPath = `http://${req.headers.host}/static/upload/${MD5ID}.png`
	      	//保存图片
	        fs.writeFile(path,dataBuffer,(err) => {
	        	if(err) {
					res.json({
						code: 404,
						message: '上传图片失败！',
						data: err
					})
					return;
				} else {
					//将图片信息存储在数据库
					let sql = `UPDATE ${table_name} SET userhead = ? WHERE ID = ${req.session.userInfo.userId}`
					conn.query(sql,[sqlPath],function(errs){
						callback(errs,sqlPath);
					})
				}	
	        })
		})
	}
}
