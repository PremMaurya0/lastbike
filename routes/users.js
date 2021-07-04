const express = require('express');
const router = express.Router();
const user = require('../controller/user');
var _=require("underscore");

module.exports=function(){

    router.post('/v1/login', function(req, res) {

      if(req.body.email!="" && req.body.password!=""){
          var data={
              email:req.body.email,
              password:req.body.password
          }
        user.loginUser(data,result=>{
            if(result==3){
                res.status(200).json({error:true,message:"Invalid Users"});
            }else if(result==1){
                res.status(200).json({error:true,message:"Password is wrong!"});
            }else if(result==2){
                res.status(403).json({error:true,message:"Account is disabled"});
            }else{
                res.status(200).json({error:false,message:result});
            }
            
            });
        }else{
            res.status(422).json({error:true,message:"Required all fields!!"});
        }
    
    });
 

    return router;
}
