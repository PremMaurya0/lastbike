const db = require('../DbConnection');
var momentzone = require('moment-timezone');
  var date = require('date-and-time');
  var now = new Date();
//   date.setLocales('en', {
//       A: ['AM', 'PM']
//   });
  momentzone.tz.setDefault("Asia/Dubai");

  var bykeManagement = {

    updatebykedata:function(obj,callback){
        
        if(obj.deviceKey=="" || obj.deviceKey==undefined){
            callback('Device Key is must!',null);
        }else{
            if(obj.deviceKey=="Prem_Maurya"){
          //  console.log(obj);
               var number=obj.datamobile;
                var sqlquery = "select contact_no from customers WHERE contact_no = ?";
                db.query(sqlquery,[number], function (error,results) {
                    if (error) {
                    callback(error,null);
                    }
                    else{                 
                        if(results.length){
                            var sqlquery = "UPDATE customers set latitude=? , longitude =?, cur_time =?  WHERE contact_no = ?";
                                 db.query(sqlquery,[obj.datalatitute,obj.datalogitute,obj.datatime,number], function (error,result) {
                                    if (error) {
                                     callback(error,null);
                                     }
                                     else{ 
                                      callback('update record!',null);
                                    }
                             });
                        }
                        else{
                            callback('Mobile Number is not registered!',null);
                        }
                    }
                });

            }else{
                callback('Device Key not Matched!',null);
            } 
        }
     
     },
     getStatus:function(gsm_mobile,callback){

        var number=gsm_mobile;
        var sqlquery = "select contact_no from customers WHERE contact_no = ?";
        db.query(sqlquery,[number], function (error,results) {
            if (error) {
            callback(error,null);
            }
            else{
                if(results.length){  

                    var sqlquery = "select contact_no,status_command from customers WHERE contact_no = ?";
                    db.query(sqlquery,[number], function (error,results) {
                        if (error) {
                        callback(error,null);
                        }
                        else{ 
                            callback(results,null);
                        }
                    });
                 }
                else{
                    callback("0",null);
                }
            }
    });
    
     }
     , updateStatus:function(gsmmobile,bikestatus,callback){

        var number=gsmmobile;
        var statusObj=bikestatus;
        var sqlquery = "select contact_no from customers WHERE contact_no = ?";
        db.query(sqlquery,[number], function (error,results) {
            if (error) {
            callback(error,null);
            }
            else{
                if(results.length){  

        var sqlquery = "update customers set status_command=? WHERE contact_no = ?";
        db.query(sqlquery,[statusObj,number], function (error,results) {
            if (error) {
            callback(error,null);
            }
            else{ 
                callback("Update Data",null);
            }
        });
    }
    else{
        callback("0",null);
        }
        }
    });
    }, 
    selectAllData:function(callback){

        var sqlquery = "select * from customers";
        db.query(sqlquery, function (error,results) {
            if (error) {
            callback(error,null);
            }
            else{ 
                callback(results,null);
            }
        });
    },
    getDetails:function(gsm_mobile,callback){

                    var number=gsm_mobile;
       //console.log(gsm_mobile);
                    var sqlquery = "select * from customers WHERE contact_no = ?";
                    db.query(sqlquery,[number], function (error,results) {
                        if (error) {
                        callback(error,null);
                        }
                        else{ 
                            //console.log(results);
                            if(results.length>0){
                                callback(results,null);
                            }else{
                                callback("0",null);
                            }
                            
                        }
                    });
                
         
     }


  }

  module.exports = bykeManagement;