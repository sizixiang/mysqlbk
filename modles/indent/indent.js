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
			console.log(paramVlues);
			let dt = new Date();
			dt = dt.toString();
			let sql = `INSERT INTO ${table_name}(id,${keyName.join(',')}) value (${id},${cols.join(',')},'${dt}')`
			console.log(sql);
			conn.query(sql,paramVlues,function(err,result){
				callback(err,result);
			})
		})
	},
	
	//根据用户ID查询订单
	getUserIDByIndent:function(table_name,userid,state,callback){
		let sql;
		state==0?sql=`SELECT * FROM ${table_name} WHERE userid = '${userid}' ORDER BY createTime desc`:sql=`SELECT * FROM ${table_name} WHERE userid = '${userid}' and state = '${state}' ORDER BY createTime desc`
		conn.query(sql,function(err,result){
			callback(err,result);
		})
	}
	
}
