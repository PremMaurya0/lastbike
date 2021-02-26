const db = require('../DbConnection');
var _=require("underscore");
var vechileManagement = {

    vechileData:function(obj,callback){

        db.query('SELECT * FROM vechile where DeviceId='+obj.DeviceId,function(error,data) {
            if (error) throw error;
            else{

                if(data.length==0){
                    var sqlquery = "insert into vechile (`DeviceId`,`modelname`,`vechileNumber`,`chissisnumber`,`areaId`,`lat`,`lng`,`status`,`status_command`,`bikespeed`) VALUES ('"+obj.DeviceId+"','"+obj.modelname+"','"+obj.vechileNumber+"','"+obj.chissisnumber+"','"+obj.areaId+"','"+obj.lat+"','"+obj.lng+"','"+obj.status+"','0','0')";
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
             var sqlquery = "UPDATE vechile set areaId=?,lat=?,lng=?,Prevlat=?,Prevlng=?,status=1 WHERE id = ?";   
                         db.query(sqlquery,[obj.areaId,obj.lat,obj.lng,obj.lat,obj.lng,obj.id], function (error,result) {
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

             updateStatus:function(gsmmobile,bikestatus,callback){

                  var number=gsmmobile;
                  var statusObj=bikestatus;
                  var sqlquery = "select DeviceId from vechile WHERE DeviceId = ?";
                  db.query(sqlquery,[number], function (error,results) {
                      if (error) {
                      callback(error,null);
                      }
                      else{
                          if(results.length){  
          
                  var sqlquery = "update vechile set status_command=? WHERE DeviceId = ?";
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
              vechileSingleAreaBase:function(obj,callback){

                 var sqlquery = "select * from vechile where areaId=? and DeviceId=?";
                 db.query(sqlquery,[obj.data,obj.DeviceId], function (error,result) {
                    if (error) {
                       callback(error,null);
                      }
                     else{ 
                        //console.log(result);
                        callback(result,null);
                   }
                 });

              
            
             },
             updatebykedata:function(obj,callback){
        
               if(obj.deviceKey=="" || obj.deviceKey==undefined){
                   callback('Device Key is must!',null);
               }else{
                   if(obj.deviceKey=="Prem_Maurya"){
                 //  console.log(obj);
                      var number=obj.datamobile;
                       var sqlquery = "select DeviceId,lat,lng from vechile WHERE DeviceId = ?";
                       db.query(sqlquery,[number], function (error,results) {
                           if (error) {
                           callback(error,null);
                           }
                           else{  
                                             
                               if(results.length){

                                   var sqlquery = "UPDATE vechile set lat=? , lng =?,Prevlat=? , Prevlng =? bikespeed=? WHERE DeviceId = ?";
                                        db.query(sqlquery,[obj.datalatitute,obj.datalogitute,results[0].lat,results[0].lng,obj.bikespeed,number], function (error,result) {
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
               var sqlquery = "select DeviceId from vechile WHERE DeviceId = ?";
               db.query(sqlquery,[number], function (error,results) {
                   if (error) {
                   callback(error,null);
                   }
                   else{
                       if(results.length){  
       
                           var sqlquery = "select DeviceId,status_command from vechile WHERE DeviceId = ?";
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
      
     }
     

  module.exports =vechileManagement;