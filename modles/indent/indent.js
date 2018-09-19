const conn = require("../../config/dbs")

const queryString = require('querystring');

const SchemaIndent = require("../../schema/index")

const ModlesIde = require("../ide/createids")

module.exports = {
	
	//添加订单
	addMyIndentPost:function(table_name,req,callback){
		let paramVlues = [];
		let cols = []
		let id = ModlesIde.createIndentId();
		let state = 1;
		let formData = "";
		let keyName = SchemaIndent.indentList();
		req.on('data',function(data){
			formData += data;
			formData = queryString.parse(formData)
			for(let name in formData){
				if(name != "id" && formData[name] != null && name != table_name){
					cols.push('?');
					paramVlues.push(formData[name]);
				}
			}
			let dt = new Date();
			dt = dt.toString();
			let sql = `INSERT INTO ${table_name}(id,state,${keyName.join(',')}) value (${id},${state},${cols.join(',')},'${dt}')`
			conn.query(sql,paramVlues,function(err,result){
				callback(err,result,id);
			})
		})
	},
	
	//根据用户ID查询订单
	getUserIDByIndent:function(table_name,userid,state,callback){
		let sql;
		state==0?sql=`SELECT * FROM ${table_name} WHERE userid = '${userid}' ORDER BY id desc`:sql=`SELECT * FROM ${table_name} WHERE userid = '${userid}' and state = '${state}' ORDER BY id desc`
		conn.query(sql,function(err,result){
			callback(err,result);
		})
	},
	
	
	//修改用户订单支付状态
	updateIndentPay:function(table_name,data,state,callback){
		let sql 
		sql = state == 2 ? `UPDATE ${table_name} SET state = ? WHERE USERID = ${data.userid} AND ID = ${data.payid}` : state == 3 ? `UPDATE ${table_name} SET state = ? WHERE ID = ${data.payid}` : ''
		conn.query(sql,[state],function(err,result){
			callback(err,result);
		})
	},
	
	
	//查询订单状态
	getIndentState: function(table_name,payid,req,callback){
		let sql = `SELECT state FROM ${table_name} WHERE USERID = '${req.session.userInfo.userId}' AND ID = ${payid}`
		conn.query(sql,function(err,result){
			callback(err,result);
		})
	},
	
	
	//查询订单信息
	getIndentMessage: function(table_name,payid,req,callback){
		let sql = `SELECT id,shopid,shopname,prick,amount,state FROM ${table_name} WHERE USERID = '${req.session.userInfo.userId}' AND ID = ${payid}`
		conn.query(sql,function(err,result){
			callback(err,result)
		})
	}
	
	
	
}
