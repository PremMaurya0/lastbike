var payload = {
    google_payloaddataByPrem :function(deviceKey,req,callback){
        console.log(req.query);
       if(req.query!=undefined){
           if(req.query.bykelat==undefined && req.query.bykelong==undefined && req.query.bykemobile==undefined && req.query.byketime==undefined&& req.query.bykedate==undefined){
            //console.log("1")
            callback("400",null);
               
           }
           else if(req.query.bykelat==undefined ){
          //  console.log("11")
               callback("400",null);

           }
           else if(req.query.bykelong==undefined ){
           // console.log("111")
            callback("400",null);
            }
           else if(req.query.bykemobile==undefined ){
            //console.log("1111")
               callback("400",null);
           }
           else if(req.query.byketime==undefined ){
            //console.log("12")
            callback("400",null);
        }
        else if(req.query.bykedate==undefined ){
           // console.log("13")
            callback("400",null);
        }
           else{      
               if(deviceKey.get('deviceKey')=="Prem_Maurya"){    
               if(req.query.bykemobile=="" || req.query.bykemobile==null ){
                   callback("509",null);
               }
               else if(req.query.bykelat=="" || req.query.bykelat==null){
                   callback("509",null);
               }
               else if(req.query.bykelong=="" || req.query.bykelong==null){
                callback("509",null);
            }
            else if(req.query.byketime=="" || req.query.byketime==null){
                callback("509",null);
            }
            else if(req.query.bykedate=="" || req.query.bykedate==null){
                callback("509",null);
            }
               else if(req.query.bykemobile==null || req.query.bykelat== null|| req.query.bykelong==null || req.query.byketime==null || req.query.bykedate==null){
                callback("509",null);
            }
               else if(req.query.bykemobile=="" && req.query.bykelat=="" && req.query.bykelong=="" && req.query.byketime=="" && req.query.bykedate==""){
                   callback("509",null);
               }   
               else{
                   var obj={
                       datamobile:req.query.bykemobile,
                       datalatitute:req.query.bykelat,
                       datalogitute:req.query.bykelong,
                       datatime:req.query.byketime,
                       datadate:req.query.bykedate,
                       deviceKey:deviceKey.get('deviceKey')
                   }
                   
                   
                   callback(obj,null);
               }
           }else{
               callback("You can't change settings",null); 
           }
       }
   }
     
   }
   }
   module.exports = payload;