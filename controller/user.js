const db = require('../DbConnection');
var _=require("underscore");
var user = {

   
     loginUser:function(obj,callback){

            var sqlquery = "select * from Users where Useremail=?";
                          db.query(sqlquery,[obj.email], function (error,result) {
                             if (error) {
                               
                                callback(error,null);
                               }
                              else{ 
                                
                                 if(result.length>0){
                                     if(result[0].Userstatus==1){
                                      
                                    if(result[0].password!=obj.password){

                                        callback(1,null);

                                    }else{

                                        var sqlquery1 = "UPDATE Users set loginstatus=?  WHERE Useremail = ?";
                                        db.query(sqlquery1,[1,obj.email], function (error1,resultdata) {
                                            if(error){
                                                callback(error1,null);
                                            }else{
                                                callback(result[0],null);
                                            }
                                        })

                                    }
                                }
                                else{
                                    callback(2,null);
                                }
                                   
                                 }else{
                                    callback(3,null);
                                 }
                                 
                          }
                    });
             }
     
     }

  module.exports =user;