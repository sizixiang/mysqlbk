const crypto = require("crypto")

module.exports = {
	createUserId: function(start, end) {
		let id = parseInt((Math.random() * 100000000000000000000).toString().substring(start, end))
		return id
	},
	encryptPass: function(pass) {
		//先进行base64可逆加密  
		let encrypts = new Buffer(pass).toString('base64');
		//加密后在后面加上原先的密码
		let addps = encrypts + pass
		//再进行MD5不可逆加密
		let twcrypts = crypto.createHash("md5").update(addps).digest('hex');
		//再进行base64可逆加密
		let tecrypts = new Buffer(twcrypts).toString('base64');
		//返回加密值
		return tecrypts
	},
	createIndentId: function() {
		let outTradeNo = ""; //订单号
		for(let i = 0; i < 6; i++) //6位随机数，用以加在时间戳后面。
		{
			outTradeNo += Math.floor(Math.random() * 10);
		}
		outTradeNo = new Date().getTime() + outTradeNo;
		return outTradeNo;
	}
}