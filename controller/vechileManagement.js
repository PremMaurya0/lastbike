const db = require('../DbConnection');
var _=require("underscore");
var vechileManagement = {

    vechileData:function(obj,callback){

        db.query('SELECT * FROM vechile where DeviceId='+obj.DeviceId,function(error,data) {
            if (error) throw error;
            else{

                if(data.length==0){
                    var sqlquery = "insert into vechile (`DeviceId`,`modelname`,`vechileNumber`,`chissisnumber`,`areaId`,`lat`,`lng`,`status`) VALUES ('"+obj.DeviceId+"','"+obj.modelname+"','"+obj.vechileNumber+"','"+obj.chissisnumber+"','"+obj.areaId+"','"+obj.lat+"','"+obj.lng+"','"+obj.status+"')";
                    db.query(sqlquery, function (error,result) {
                       if (error) {
                          callback(error,null);
                         }
                        else{ 
                           callback(result,null);
                    }
                 });
                }else{
                    callback("Duplicate Device Id",null);
                }
            }
        });
    },
    vechileList:function(callback){
        var sqlquery = "select * from vechile";
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
         vechileUpdate:function(obj,callback){
             var sqlquery = "UPDATE vechile set areaId=?,lat=?,lng=?,status=1 WHERE id = ?";   
                         db.query(sqlquery,[obj.areaId,obj.lat,obj.lng,obj.id], function (error,result) {
                            if (error) {
                               callback(error,null);
                              }
                             else{ 
                                //console.log(result);
                                callback(result,null);
                         }
                   });
            },
            vechileAreaBase:function(obj,callback){
                //console.log(obj);
                var sqlquery = "select * from vechile where areaId=?";
                              db.query(sqlquery,[obj.data], function (error,result) {
                                 if (error) {
                                    callback(error,null);
                                   }
                                  else{ 
                                     //console.log(result);
                                     callback(result,null);
                              }
                        });
                 },
      
     }
     

  module.exports =vechileManagement;