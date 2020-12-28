const express = require('express');
const router = express.Router();
const vechileManagementCtrl = require('../controller/vechileManagement');
var _=require("underscore");
var cron = require('node-cron');
const storage = require('node-persist');
(async function(){
 await storage.init();
});

module.exports=function(io){

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

    io.on('connection', function(socket) {
     // console.log('A user connected');        
      //console.log(socket.handshake.query['foo']);
      socket.on('disconnect', function () {
        // console.log('A user disconnected');
      });
      
       cron.schedule('* * * * * *', () => {
          //console.log(socket.handshake.query['foo']);
          vechileManagementCtrl.vechileAreaBase({data:socket.handshake.query['foo']},result=>{
              // io.sockets.emit('bikeList', result);
           //   console.log(result);
              socket.emit('bikeList', result)
             });
          
      });
    });
  
     

    return router;
}
