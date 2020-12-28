const db = require('../DbConnection');
var _=require("underscore");
var areaManagement = {

    addareaNewdata:function(obj,callback){
        //console.log(obj);

       var sqlquery = "insert into area (AreaName,AreaNumber,shapetype,lat,lng) VALUES ?";
                     db.query(sqlquery,[obj.map(item => [item.AreaName, item.AreaNumber,item.shapetype, item.lat,item.lng])], function (error,result) {
                        if (error) {
                           callback(error,null);
                          }
                         else{ 
                            //console.log(result);
                            callback(result,null);
                     }
               });
        },
    areaList:function(callback){
        var sqlquery = "select * from area";
                      db.query(sqlquery, function (error,result) {
                         if (error) {
                            callback(error,null);
                           }
                          else{ 
                             //console.log(result);
                             callback(result,null);
                      }
                });
         },
      areasingleData:function(areanumber,callback){

            var sqlquery = "select * from area where AreaNumber=?";
                          db.query(sqlquery,[areanumber], function (error,result) {
                             if (error) {
                                callback(error,null);
                               }
                              else{ 
                                 //console.log(result);
                                 callback(result,null);
                          }
                    });
             }
     
     }

  module.exports =areaManagement;