const conn = require("../../config/dbs");

const queryString = require('querystring');

const zhPass = require("../ide/createids");

const SchemaUser = require("../../schema/index")

module.exports = {

	//查询用户列表
	findUserList: function(table_name, callback) {
		let sql = `SELECT * FROM ${table_name}`
		conn.query(sql, function(err, result) {
			let cols = [];
			for(let i = 0; i < result.length; i++) {
				cols.push({
					id: result[i].id,
					user: result[i].user,
					createTime : result[i].createDate
				})
			}
			callback(err, cols);
		})
	},

	//根据UserID查询
	getByUserId: function(id_vue, table_name, callback) {
		let sql = `SELECT * FROM ${table_name} WHERE ID = ${id_vue}`
		conn.query(sql, function(err, result) {
			let cols = [{
				id: result[0].id,
				user: result[0].user,
				createTime : result[0].createDate
			}];
			callback(err, cols);
		})
	},
	
	//根据sessionID查询用户等级
	getByUserIdFromGrean : function(session_userid,table_name,callback){
		let sql = `SELECT * FROM ${table_name} WHERE USERID = ${session_userid}`
		conn.query(sql,function(err,result){
			callback(err,result);
		})
	},
	
	//插入用户等级状态
	insertUserGrean : function(session_userid,table_name,callback){
		let sql = `INSERT INTO ${table_name}(userid,rank) value (${session_userid},${0})`
		conn.query(sql,function(err,result){
			callback(err);
		})
	},

	//注册用户请求
	findPostUser: function(table_name, req, callback) {
		let formData = "";
		req.on('data', function(data) {

			//将buffer数据转换成JSON对象
			formData += data;
			formData = queryString.parse(formData)

			let sql = `SELECT * FROM ${table_name} WHERE USER = '${formData.user}'`
			conn.query(sql, function(err, result) {
				callback(err, result, formData);
			})
		})
	},

	//用户登陆请求
	findPostLogin: function(table_name, req, callback) {
		let formData = "";
		//console.log(req.session.userID)
		req.on('data', function(data) {
			formData += data;
			formData = queryString.parse(formData);
			//对密码进行加密
			let pass = zhPass.encryptPass(formData.password)

			let sql = `select id,user from ${table_name} where user = '${formData.user}' and password = '${pass}'`
			conn.query(sql, function(err, result) {
				callback(err, result)
			})
		})
	},

	//修改用户信息
	updateUserInfo: function(table_name, req, callback) {
		let post = "";
		let clos = [];
		let paramVlues = [];
		req.on('data', function(data) {

			//将buffer数据转换成JSON对象
			post += data;
			post = queryString.parse(post)

			//遍历将需要修改的值塞选出来
			for(var name in post) {
				if(name != 'table_name' && name != 'id' && name != "user" && post[name] != null) {
					clos.push(name + "=?");
					if(name == "password") {
						let pass = zhPass.encryptPass(post[name]);
						paramVlues.push(pass);
					} else {
						paramVlues.push(post[name]);
					}
				}
			}

			//let findSql = `SELECT COUNT(id) as count FROM ${table_name} WHERE ID = ${post.id}`
			let sql = `UPDATE ${table_name} SET ${clos.join(',')} WHERE ID = ${req.session.userInfo.userId}`
			conn.query(sql, paramVlues, function(err, result) {
				callback(err, result)
			})
		})
	},
	
	//查询用户ID与密码是有一致
	selectUserPass: function(table_name,req,callback){
		let post = "";
		req.on('data',function(data){
			post += data;
			post = queryString.parse(post);
			let pass = zhPass.encryptPass(post.oldpass);
			let sql = `SELECT COUNT(*) AS count FROM ${table_name} WHERE ID = ${post.id} AND PASSWORD = '${pass}'`
			conn.query(sql,function(err,result){
				callback(err,result[0].count,post);
			})
		})
	},
	
	//修改密码
	updateUserPass: function(table_name,data,callback){
		let pass = zhPass.encryptPass(data.password);
		let sql = `UPDATE ${table_name} SET password = ? WHERE ID = ${data.id}`
		conn.query(sql,[pass],function(err,result){
			callback(err,result);
		})
	}
}