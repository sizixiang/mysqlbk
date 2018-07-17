var mysql = require("mysql")

var db = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'nodejs',
	charset: 'UTF8_GENERAL_CI'
})

db.connect();

module.exports = db;
