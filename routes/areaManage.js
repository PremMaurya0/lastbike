const express = require('express');
const router = express.Router();
const areaManagementCtrl = require('../controller/areaManagement');
var _=require("underscore");

module.exports=function(){

    router.post('/v1/addArea', function(req, res) {

      if(req.body.myArray.length>0){
        areaManagementCtrl.addareaNewdata(req.body.myArray,result=>{
            res.json(result);
            });
        }else{
            res.json({msg:"invalid Data"});
        }
    
    });
    router.get('/v1/areaList', function(req, res) {

          areaManagementCtrl.areaList(result=>{
                const results = {
                areaList: Object.values(
                        result.reduce( (acc, {AreaName,AreaNumber, shapetype, lat, lng, status}) => {
                            (acc[AreaNumber] = acc[AreaNumber] || {AreaName,AreaNumber,shapetype,status, List: []})
                                .List.push({lat, lng});
                            return acc;
                        },{})
                )
               };
                 res.json(results);
            });

      });



      router.post('/v1/areaSingle', function(req, res) {
         //   console.log(req.body.areaname);
        areaManagementCtrl.areasingleData(req.body.areanumber,result=>{
              const results = {
              areaList: Object.values(
                      result.reduce( (acc, {AreaName,AreaNumber, shapetype, lat, lng, status}) => {
                          (acc[AreaNumber] = acc[AreaNumber] || {AreaName,AreaNumber, shapetype,status, List: []})
                              .List.push({lat, lng});
                          return acc;
                      },{})
              )
             };
               res.json(results.areaList[0]);
          });

    });

    return router;
}
