const conn = require("../../config/dbs")

const queryString = require('querystring');

const ide = require("../ide/createids")

const util = require('util');

const ModlesPass = require("../ide/createids")

const ModlesUser = require("../user/user")

module.exports = {


	//查询列表
	findList: function(table_name, callback) {
		let sql = `SELECT * FROM ${table_name}`
		conn.query(sql, function(err, result) {
			callback(err, result);
		})
	},
	
	//根据id删除一条数据
	removeById:function(id,table_name,callback){
		let sql = `DELETE FROM ${table_name} WHERE ID = ${id}`
		conn.query(sql,function(err){
			callback(err);
		})
	},

	//根据ID查询
	getById: function(id_vue, table_name, callback) {
		let sql = `SELECT * FROM ${table_name} WHERE ID = ${id_vue}`
		conn.query(sql, function(err, result) {
			callback(err, result);
		})
	},

	//插入一条数据
	insert: function(table_name, formData, callback) {
		let clos = []
		let post = formData
		let paramVlues = [];
		let keyName = [];
		let id = ide.createUserId(0, 5);

		for(let name in post) {
			if(name != 'table_name' && name != 'id' && post[name] != null) {	
				clos.push("?");
				keyName.push(name);
				if(name == "password") {
					let pass = ModlesPass.encryptPass(post[name]);
					paramVlues.push(pass);
				} else {
					paramVlues.push(post[name]);
				}
			}
		}
		let dt = new Date();
		dt = dt.toString();
		let sql = `INSERT INTO ${table_name}(ID,${keyName.join(',')},createDate) value (${id},${clos.join(',')},'${dt}')`
		conn.query(sql, paramVlues, function(err, result) {
			if(table_name == "user") {
				ModlesUser.insertUserGrean(id, "grade", function(err) {
					if(err) {
						console.log(err);
						return;
					}
					console.log("成功")
				})
			}
			callback(err, result);
		})
	},

	//根据id修改一条数据
	update: function(table_name, req, callback) {
		let post = "";
		let clos = [];
		let paramVlues = [];
		req.on('data', function(data) {

			//将buffer数据转换成JSON对象
			post += data;
			post = queryString.parse(post)

			//遍历将需要修改的值塞选出来
			for(var name in post) {
				if(name != 'table_name' && name != 'id' && post[name] != null) {
					clos.push(name + "=?");
					paramVlues.push(post[name]);
				}
			}

			//let findSql = `SELECT COUNT(id) as count FROM ${table_name} WHERE ID = ${post.id}`
			let sql = `UPDATE ${table_name} SET ${clos.join(',')} WHERE ID = ${post.id}`
			conn.query(sql, paramVlues, function(err, result) {
				callback(err, result)
			})
		})
	}
}