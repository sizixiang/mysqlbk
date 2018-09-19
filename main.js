const express = require("express")

const http = require("http");

const sio = require("socket.io")

const app = express();

const server = http.createServer(app)

const session = require("express-session");

app.set("view engine", "ejs"); //ejs、jade、swig
app.set('views', __dirname + '/views');

const cookieParser = require('cookie-parser');

const redisStore = require('connect-redis')(session);

const ModlesIndent = require("./modles/indent/indent")

require("date-utils");

app.use(cookieParser());

app.use(session({
	store: new redisStore({
		host: '127.0.0.1',
		port: 6379
	}),
	secret: 'secret', // 对session id 相关的cookie 进行签名
	resave: false,
	key: 'secrets',
	saveUninitialized: true, // 是否保存未初始化的会话
	cookie: {
		maxAge: 2 * 24 * 60 * 60 * 1000, // 设置 session 的有效时间，单位毫秒
		secure: false,
		httpOnly: true
	},
}));

app.all('*', function(req, res, next) {
	if(req.headers.origin) {
		res.header('Access-Control-Allow-Credentials', true);
		res.header("Access-Control-Allow-Origin", req.headers.origin);
	} else {
		res.header('Access-Control-Allow-Credentials', false);
		res.header("Access-Control-Allow-Origin", "*");
	}
	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	if(req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
	else next();
});

app.use(express.static("./public"))

app.use("/user", require("./router/user"))
app.use("/shop", require("./router/shop"))
app.use("/indent", require("./router/indent"))
app.use("/uplods", require("./router/uplods"))

server.listen(3333, '192.168.3.101', () => {
	console.log('服务器启动成功~')
})

const socket = sio.listen(server);

socket.on("connection", function(socket) {
//	socket.on("otherEvent", function(data) {
//		console.log("服务器端接受到数据:%j", data);
//	})
});

//核销订单
app.get("/",function(req,res,next){
	res.render('model/header.ejs')
	next()
})
app.get("/yiiIndentPay",function(req,res,next){
	let payid = req.query.p;
//	if(req.session.userInfo) {
		let data = {
			userid : 93879,
			payid : payid
		}
		ModlesIndent.updateIndentPay('indent',data,3,function(err,result){
			if(err) {
				res.json({
					code: 404,
					message: '核销失败！'
				})
				socket.emit("stateCode", {
					state: 404
				});
				return;
			}
			res.render('model/header.ejs')
			socket.emit("stateCode", {
				state: 200
			});
		})
//	}
}) 