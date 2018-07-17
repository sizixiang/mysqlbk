const express = require("express")

const app = express();

const session = require("express-session");

const cookieParser = require('cookie-parser');

require("date-utils");

app.use(cookieParser());

app.all('*', function(req, res, next) {
	if(req.headers.origin) {
		res.header("Access-Control-Allow-Origin", req.headers.origin);
	} else {
		res.header("Access-Control-Allow-Origin", "*");
	}
	res.header('Access-Control-Allow-Credentials', true);
	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	if(req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
	else next();
});

app.use(session({
	secret: 'secret', // 对session id 相关的cookie 进行签名
	resave: false,
	saveUninitialized: false, // 是否保存未初始化的会话
	cookie: {
		maxAge: 100000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
		secure: false
	},
}));

app.use(express.static("./public"))

app.use(function(req, res, next) {
	if(req.session.userInfo) {
		next();
	} else {
		//		console.log("url:" + req.originalUrl);
//		if(req.originalUrl == '/user/login' || req.originalUrl == '/user/register' || req.originalUrl.indexOf('/good/list') > -1 || req.originalUrl == '/shop/shoplist') {
			next();
//		} else {
//			res.json({
//				status: '10001',
//				msg: '当前未登录',
//				result: ''
//			});
//		}
	}
});

app.use("/user", require("./router/user"))
app.use("/shop", require("./router/shop"))
app.use("/indent",require("./router/indent"))

app.listen(3333, function() {
	console.log("服务启动成功！");
})