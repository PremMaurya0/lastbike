const express = require('express');
const router = express.Router();
const DriverController = require('../controller/DriverController');

module.exports=function(deviceKey,io){

    router.post('/v1/addDriver', function(req, res) {
              
        console.log(req.body.driverobj);

        console.log(req.body);

                  DriverController.driverNewdata(req.body.driverobj,result=>{
                    console.log(result)
                    // if(result==2){
                    //   res.json({error:true,message:"Duplicate Device Id"});
                    // }else{
                    //   res.json({error:false,message:"Added new record"});
                    // }
                  
                  });
                
        
    });
  




return router;
}