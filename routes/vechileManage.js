const express = require('express');
const router = express.Router();
const vechileManagementCtrl = require('../controller/vechileManagement');
var _=require("underscore");
var cron = require('node-cron');
const payload=require('./payload');

module.exports=function(deviceKey,io){

    router.post('/v1/addVechile', function(req, res) {

        if(req.body.objectData.DeviceId==""){
            res.json({message:"Please Enter Device Id"});
        }
       else if(req.body.objectData.modelname==""){
        res.json({message:"Please Enter Model Name"});
            
        }
        else if(req.body.objectData.vechileNumber==""){
            res.json({message:"Please Enter Vechile Number"});
        }
       else if(req.body.objectData.chissisnumber==""){
        res.json({message:"Please Enter Chassis Number"});
        }else{

          vechileManagementCtrl.vechileData(req.body.objectData,result=>{
            res.json(result);
          });
        

        }
    });
    router.get('/v1/vechileList', function(req, res) {
      
        vechileManagementCtrl.vechileList(result=>{
            res.json(result);
          });

    });
    
    router.post('/v1/updateVechile', function(req, res) {

        if(req.body.objectData.areaId==""){
            res.json({message:"Area Id is missing"});
        }
       else if(req.body.objectData.id==""){
        res.json({message:"id is missing"});
            
        }
        else if(req.body.objectData.lat==""){
            res.json({message:"lat is missing"});
        }
       else if(req.body.objectData.lng==""){
        res.json({message:"lng is missing"});
        }else{

          vechileManagementCtrl.vechileUpdate(req.body.objectData,result=>{
            res.json(result);
          });
        

        }
    });
    router.post('/v1/vechileareaList', function(req, res) {
     // console.log(req.body.area);
        vechileManagementCtrl.vechileAreaBase({data:req.body.area},result=>{
            res.json(result);
          });

    });
    router.post('/v1/vechilesinglearea', function(req, res) {
      
         vechileManagementCtrl.vechileSingleAreaBase({data:req.body.area,DeviceId:req.body.deviceId},result=>{
             res.json(result);
           });
 
     });

    io.on('connection', function(socket) {

      console.log('A user connected');    

      socket.on('disconnect', function () {
         console.log('A user disconnected');
      });
      
        setInterval(() => {  
      
          vechileManagementCtrl.vechileAreaBase({data:socket.handshake.query['foo']},result=>{
              socket.emit('bikeList', result)
             });

        },3000);

    });
  
     
    router.post('/v1/newupdateStatus', function(req, res) {

      if(req.body.gsmmobile==undefined || req.body.gsmmobile==""){
        res.json({error:true,message:"gsm_mobile is undefined!!"});
      }
      else if(req.body.bikestatus==undefined || req.body.bikestatus==""){
          res.json({error:true,message:"gsm_mobile is undefined!!"});
        }
      else{
        vechileManagementCtrl.updateStatus(req.body.gsmmobile,req.body.bikestatus, result=>{
          if(result=="0"){
              res.json({message:"number is not found!"});
          }else{
              res.send(result);
          }
        });
      
      }
 
    });
    router.get('/v1/readData', function(req, res) {

      if(req.query.gsm_mobile==undefined){
        res.json({error:true,message:"gsm_mobile is undefined!!"});
      }else{
        vechileManagementCtrl.getStatus(req.query.gsm_mobile, result=>{
            
            if(result=="0"){
                res.json({message:"number is not found!"});
            }else{
                res.json({g:result[0].DeviceId,m:result[0].status_command});
            }
           

        });
      ;
      }
 
    });


    router.post('/v1/requests', function(req, res) {
      
      payload.google_payloaddataByPrem(deviceKey,req,(requestDevice)=>{
     //   console.log(requestDevice);
          
          if(requestDevice=="400"){
             
              res.send("Something is wrong");
          }
          else if(requestDevice=="509"){
            
              res.send("Something is missing value");
          }else{
            vechileManagementCtrl.updatebykedata(requestDevice,result => { 
                  res.send(result);
                 
              });
          }
      });
      });

    return router;
}
