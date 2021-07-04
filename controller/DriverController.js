const db = require('../DbConnection');
var _=require("underscore");
var momentzone = require('moment-timezone');
var driverManagement = {

    driverNewdata:function(item,callback){
        //console.log(obj);

       var sqlquery = "insert into drivers (name,email,photo,mobile,totalexperinse,dl_license,dl_expdate,driver_address,driver_currentstatus,status,vehicle_id,joindate) VALUES ('"+item.drivername+"', '"+item.driveremail+"','"+item.photo+"', '"+item.driverphone+"','"+item.driverexpr+"','"+item.driverlice+"','"+item.driverexpdate+"','"+item.driveraddress+"','0','0','0','NOW()')";
                     db.query(sqlquery, function (error,result) {
                        if (error) {
                           callback(error,null);
                          }
                         else{ 
                            //console.log(result);
                            callback("Added New record!",null);
                     }
               });
        }
     
     }

  module.exports =driverManagement;