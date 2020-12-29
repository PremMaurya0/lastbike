
const mysql = require('mysql');
require("dotenv").config();
// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "smartbike"
// });
const con = mysql.createConnection({
  host: "bike.cb4nvqamabkf.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "Bike7777773333",
  database: "bike"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
// con.end(function(err) {
//   if (err) throw err;
//   console.log("Disconnected!");
// });
module.exports = con;