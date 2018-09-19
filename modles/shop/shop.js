const conn = require("../../config/dbs")

const queryString = require('querystring');

const zhPass = require("../ide/createids");

const SchemaShop = require("../../schema/index")


module.exports = {
	//获取商品列表
	getShopList:function(keys,table_name,callback){
		let URL = `SELECT * FROM ${table_name} limit ${keys},10`
		conn.query(URL,function(err,result){
			for(var i=0;i<result.length;i++){
				let ct = new Date(result[i].createTime);
				let ft = new Date(result[i].finesTime);
				result[i].createTime = ct.toFormat("YYYY-MM-DD HH24:MI:SS")
				result[i].finesTime = ft.toFormat("YYYY-MM-DD HH24:MI:SS")
			}
			callback(err,result);
		})
	},
	//添加商品列表
	insertShopList:function(table_name,req,callback){
		let clos = [];
		let paramVlues = [];
		let keyName = SchemaShop.shopList()
		let formData = '';
		let id = zhPass.createUserId(0,15);
		req.on('data', function(data) {
			formData += data;
			formData = queryString.parse(formData)
			for(let name in formData){
				if(name != "id" && formData[name] != null && name != table_name){
					//需要插入的值，暂时设置为？号
					clos.push('?');
					//提交表单的值
					paramVlues.push(formData[name].toString());
				}
			}
			let dt = new Date()
			dt = dt.toString();
			let URL = `INSERT INTO ${table_name}(id,${keyName.join(',')}) value (${id},${clos.join(',')},'${dt}','${dt}')`;
			conn.query(URL,paramVlues,function(err,result){
				callback(err,result);
			})
		})
	}
}
