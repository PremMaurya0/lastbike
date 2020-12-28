const express = require('express');
const router = express.Router();
const storage = require('node-persist');
 storage.init();

module.exports=function(){
    console.log("Imnnnn");
    router.post('/v1/testone', function(req, res) {
        console.log("Imn");
        console.log(req.body.msg);
         storage.setItem('name',req.body.msg)

      res.send("Something is wrong3");
    
    });


    router.get('/v1/responses', function(req, res) {
    
       // console.log(req.body.msg);
        console.log(storage.getItem('name'));
         //res.send("Something is wrong");
    
    });

        return router;
    }