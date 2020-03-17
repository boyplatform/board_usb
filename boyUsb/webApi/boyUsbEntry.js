//import section
var express= require('express');
var app=express();
var bodyParser = require('body-parser');
 

var BoyUsbValidation=require('../src/boyUsbValidation');
var boyHsbValidationObj=new BoyUsbValidation();
 

var boyUsbCommon=require('../src/boyUsbCommon');
var conf=require('../src/config.js');

var selfIntroduce=require('../crystalBlock/selfExpress/selfIntroduce');
var InodeCahce=require("../coreLibs/iNodeCache");
var memoryNodeCache=new InodeCahce("singleNodeCache");
const BoyUsbHttpHelper=require('../src/boyUsbHttpHelper')

//import viewNode' services component
var ViewNode_H5_Common_userManagement=require('../viewNode/H5/Common/userManagement');
var viewNode_H5_Common_userManagement=new ViewNode_H5_Common_userManagement();

//install midware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//allow cross domain
app.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
      res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
      next();
  });

//Programe Entry
var server=app.listen(8080,'0.0.0.0',function(){
      //internet模式下启动时初始化并缓存本机公网IP
      if(conf.platformArch.crystalCluster.CrystalClusterNetworkMode==="internet"){
            boyUsbCommon.initCurrentServerPubIpAdress();
      }
     console.log('Intelligent boy-usb is running on current crystal node at:'+(new Date()).toLocaleString()," on IP:",boyUsbCommon.getCurrentServerIpAdress().trim());
     memoryNodeCache.setConn({});
      
})


 

//----viewNode/h5----//
//--viewNode/h5/Common API--
app.post('/viewNode/h5/Common/AddUser',async function(req,res){

       
      viewNode_H5_Common_userManagement.AddUser(req,res);
             
})

app.post('/viewNode/h5/Common/updateUser',async function(req,res){
       
      viewNode_H5_Common_userManagement.updateUser(req,res);

})

app.post('/viewNode/h5/Common/deleteUser',async function(req,res){
      
      viewNode_H5_Common_userManagement.deleteUser(req,res);

})

app.post('/viewNode/h5/Common/selectUser',async function(req,res){
      
      viewNode_H5_Common_userManagement.selectUser(req,res);
})

app.post('/viewNode/h5/Common/userLogin',async function(req,res){
      
      viewNode_H5_Common_userManagement.userLogin(req,res);
})

//--viewNode/h5/CP API--
 app.post('/viewNode/h5/CP/bizApiName',async function(req,res){

      //入口参数验证
      let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/h5/CP/bizApiName');
      if(validationRs.Result===false){
         
            res.end(JSON.stringify(validationRs));
            return;
      }



 })

 //--viewNode/h5/OW API--
 app.post('/viewNode/h5/OW/bizApiName',async function(req,res){

   //入口参数验证
   let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/h5/OW/bizApiName');
   if(validationRs.Result===false){
      
         res.end(JSON.stringify(validationRs));
         return;
   }



})


 //--viewNode/h5/EBP API--
 app.post('/viewNode/h5/EBP/bizApiName',async function(req,res){

   //入口参数验证
   let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/h5/EBP/bizApiName');
   if(validationRs.Result===false){
      
         res.end(JSON.stringify(validationRs));
         return;
   }



})

 //--viewNode/h5/TPSPI API--
 app.post('/viewNode/h5/TPSPI/bizApiName',async function(req,res){

   //入口参数验证
   let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/h5/TPSPI/bizApiName');
   if(validationRs.Result===false){
      
         res.end(JSON.stringify(validationRs));
         return;
   }



})

//------------------------------------------------------------------------------------------------------------------------//

//----viewNode/Andriod----//
//--viewNode/Andriod/Common API--
app.post('/viewNode/Andriod/Common/bizApiName',async function(req,res){

   //入口参数验证
   let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/Andriod/Common/bizApiName');
   if(validationRs.Result===false){
      
         res.end(JSON.stringify(validationRs));
         return;
   }
  
       

          
})
//--viewNode/Andriod/CP API--
app.post('/viewNode/Andriod/CP/bizApiName',async function(req,res){

   //入口参数验证
   let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/Andriod/CP/bizApiName');
   if(validationRs.Result===false){
      
         res.end(JSON.stringify(validationRs));
         return;
   }



})

//--viewNode/Andriod/OW API--
app.post('/viewNode/Andriod/OW/bizApiName',async function(req,res){

//入口参数验证
let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/Andriod/OW/bizApiName');
if(validationRs.Result===false){
   
      res.end(JSON.stringify(validationRs));
      return;
}



})


//--viewNode/Andriod/EBP API--
app.post('/viewNode/Andriod/EBP/bizApiName',async function(req,res){

//入口参数验证
let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/Andriod/EBP/bizApiName');
if(validationRs.Result===false){
   
      res.end(JSON.stringify(validationRs));
      return;
}



})

//--viewNode/Andriod/TPSPI API--
app.post('/viewNode/Andriod/TPSPI/bizApiName',async function(req,res){

//入口参数验证
let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/Andriod/TPSPI/bizApiName');
if(validationRs.Result===false){
   
      res.end(JSON.stringify(validationRs));
      return;
}



})

//------------------------------------------------------------------------------------------------------------------------//

//----viewNode/IOS----//
//--viewNode/IOS/Common API--
app.post('/viewNode/IOS/Common/bizApiName',async function(req,res){

   //入口参数验证
   let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/IOS/Common/bizApiName');
   if(validationRs.Result===false){
      
         res.end(JSON.stringify(validationRs));
         return;
   }
  
       

          
})
//--viewNode/IOS/CP API--
app.post('/viewNode/IOS/CP/bizApiName',async function(req,res){

   //入口参数验证
   let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/IOS/CP/bizApiName');
   if(validationRs.Result===false){
      
         res.end(JSON.stringify(validationRs));
         return;
   }



})

//--viewNode/IOS/OW API--
app.post('/viewNode/IOS/OW/bizApiName',async function(req,res){

//入口参数验证
let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/IOS/OW/bizApiName');
if(validationRs.Result===false){
   
      res.end(JSON.stringify(validationRs));
      return;
}



})


//--viewNode/IOS/EBP API--
app.post('/viewNode/IOS/EBP/bizApiName',async function(req,res){

//入口参数验证
let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/IOS/EBP/bizApiName');
if(validationRs.Result===false){
   
      res.end(JSON.stringify(validationRs));
      return;
}



})

//--viewNode/IOS/TPSPI API--
app.post('/viewNode/IOS/TPSPI/bizApiName',async function(req,res){

//入口参数验证
let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/IOS/TPSPI/bizApiName');
if(validationRs.Result===false){
   
      res.end(JSON.stringify(validationRs));
      return;
}



})


//------------------------------------------------------------------------------------------------------------------------//
//----viewNode/Devices----//
//--viewNode/Devices/Common API--
app.post('/viewNode/Devices/Common/bizApiName',async function(req,res){

   //入口参数验证
   let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/Devices/Common/bizApiName');
   if(validationRs.Result===false){
      
         res.end(JSON.stringify(validationRs));
         return;
   }
  
       

          
})
//--viewNode/Devices/CP API--
app.post('/viewNode/Devices/CP/bizApiName',async function(req,res){

   //入口参数验证
   let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/Devices/CP/bizApiName');
   if(validationRs.Result===false){
      
         res.end(JSON.stringify(validationRs));
         return;
   }



})

//--viewNode/Devices/OW API--
app.post('/viewNode/Devices/OW/bizApiName',async function(req,res){

//入口参数验证
let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/Devices/OW/bizApiName');
if(validationRs.Result===false){
   
      res.end(JSON.stringify(validationRs));
      return;
}



})


//--viewNode/Devices/EBP API--
app.post('/viewNode/Devices/EBP/bizApiName',async function(req,res){

//入口参数验证
let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/Devices/EBP/bizApiName');
if(validationRs.Result===false){
   
      res.end(JSON.stringify(validationRs));
      return;
}



})

//--viewNode/Devices/TPSPI API--
app.post('/viewNode/Devices/TPSPI/bizApiName',async function(req,res){

//入口参数验证
let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/Devices/TPSPI/bizApiName');
if(validationRs.Result===false){
   
      res.end(JSON.stringify(validationRs));
      return;
}



})


//readme api
app.post('/readMe',async function(req,res){
    
        //入口参数验证
       let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/readMe');
       if(validationRs.Result===false){
          
            res.end(JSON.stringify(validationRs));
            return;
       } 

       //进入执行入口
        let jsonBody=req.body; 
        switch(jsonBody.type.toString()){
             case 'osInfo':
                res.end(JSON.stringify(selfIntroduce.getNodeOSInfo()));
                break;
             case 'mem':
                res.end(JSON.stringify(selfIntroduce.getCurrentNodeMem()));
                break;
             case 'battery':
                res.end(JSON.stringify(selfIntroduce.getCurrentNodeBattery()));
                break;
             case 'crystalCluster':
             
               if(req.body.httpMode!=undefined){
                  selfIntroduce.getCurrentCrystalCluster(res,req.body.httpMode,req.body.infoType);
               }else{
                  selfIntroduce.getCurrentCrystalCluster(res,conf.platformArch.crystalCluster.httpDefaultMode,req.body.infoType);
               }
                break;
            case 'seekNodeSelectionVoteResult':
                 
                   crystalClusterCommonRules_interact.timelyNodeSelectionVoteResultSeek(function(rows){

                   res.end(JSON.stringify(rows));
                })
                break;
            case 'seekMasterNodeVoteResult':
                 
                   crystalClusterCommonRules_interact.seekMasterNodeVoteResult(function(row){

                   res.end(JSON.stringify(row));
                })
                break;
             default:
                res.end('Wrong Command type!Please double check your command.')
        }
   

})

 