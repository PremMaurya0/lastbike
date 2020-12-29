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


    // io.on('connection', function(socket) {
    //     console.log('A user connected');        
    //     //console.log(socket.handshake.query['foo']);
    //     socket.on('disconnect', function () {
    //        console.log('A user disconnected');
    //     });
        
    //      cron.schedule('* * * * * *', () => {
    //         //console.log(socket.handshake.query['foo']);
    //         vechileManagementCtrl.vechileAreaBase({data:socket.handshake.query['foo']},result=>{
    //             // io.sockets.emit('bikeList', result);
    //            // console.log(result);
    //             socket.emit('bikeList', result)
    //            });
            
    //     });
    
      
    //   });

    
    return router;
}