'use strict'
const BoyUsbHttpHelper=require('../../../src/boyUsbHttpHelper');
var boyUsbCommon=require('../../../src/boyUsbCommon');
var conf=require('../../../src/config');
var BoyUsbValidation=require('../../../src/boyUsbValidation');
var boyHsbValidationObj=new BoyUsbValidation();
function UserManagement(){

}

UserManagement.prototype.constructor=UserManagement;

UserManagement.prototype.AddUser=async function(req,res){
        //入口参数验证
        let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/h5/Common/AddUser');
        if(validationRs.Result===false){
        
            res.end(JSON.stringify(validationRs));
            return;
        }
        //调用hub接口获取加密指令
        var domainUrl=conf.platformArch.hubInfo.url;
        var partialUrl="/hubEntry";
        var qs=""
        var timeout=conf.platformArch.defaultHttpReqTimeOut;
        var body={
            "type":"encryption",
            "cmd":"getRandomCondition"
        };
        BoyUsbHttpHelper.apiSimpleRequestWithCallBack(conf.platformArch.hubInfo.httpDefaultMode,domainUrl,partialUrl,qs,body,timeout,function(Result){
            
            if(Result)
            {
                    let key=Result.encryptionKey;
                    let times=Result.encryptionTimes;
                    let precmd={
                        "messageAction":"write",
                        "targetDbName":conf.platformArch.bizDomainModuleDbName,
                        "writeSql":"call AddUser ('#platformUserGuid', '#platformUserName', '#platformUserPwd',#systemRole,'#createTime')",
                        "writeSqlParameter":
                        {
                            "#platformUserGuid":boyUsbCommon.getUUID()+boyUsbCommon.GetUUIDTimeSpan(Date.now()),
                            "#platformUserName":req.body.platformUserName,
                            "#platformUserPwd":boyUsbCommon.getMd5(req.body.platformUserPwd),
                            "#systemRole":req.body.systemRole,
                            "#createTime":boyUsbCommon.GetFormatDateFromTimeSpan(Date.now()) 
                        },
                        "blockVerifyOrNot":false,
                        "reqStorageClusterDbType":0 //mysql=0 mssql=1
                    
                    };
                
                    boyUsbCommon.aes256Encryption(key,times,JSON.stringify(precmd),function(value){
                        if(value){
                            
                            let opBody={
                                "type":"op",
                                "targetUnit":"memory",
                                "encryptionKey":key,
                                "cmd": value
                            }
                            BoyUsbHttpHelper.apiSimpleRequestWithCallBack(conf.platformArch.hubInfo.httpDefaultMode,domainUrl,partialUrl,qs,opBody,timeout,function(Result){
                                if(Result){
                                    res.end(JSON.stringify(Result));
                                }else{
                                    res.end(JSON.stringify({
                                          "result":false,
                                          "desc":"cmd execution failed,please try again."
                                  })) 
                                }
                            })
                            
                        }else{
                            res.end(JSON.stringify({
                                    "result":false,
                                    "desc":"security encryption failed,please try again."
                            }))
                        }


                    })
            }
        });
}

UserManagement.prototype.updateUser=async function(req,res){
    //入口参数验证
    let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/h5/Common/updateUser');
    if(validationRs.Result===false){
    
          res.end(JSON.stringify(validationRs));
          return;
    }
    //调用hub接口获取加密指令
    var domainUrl=conf.platformArch.hubInfo.url;
    var partialUrl="/hubEntry";
    var qs=""
    var timeout=conf.platformArch.defaultHttpReqTimeOut;
    var body={
          "type":"encryption",
          "cmd":"getRandomCondition"
    };
    BoyUsbHttpHelper.apiSimpleRequestWithCallBack(conf.platformArch.hubInfo.httpDefaultMode,domainUrl,partialUrl,qs,body,timeout,function(Result){
          
          if(Result)
          {
                let key=Result.encryptionKey;
                let times=Result.encryptionTimes;
                let updatedPassword='';
                if(req.body.platformUserPwd!==""){
                  updatedPassword=boyUsbCommon.getMd5(req.body.platformUserPwd);
                }
                let precmd={
                      "messageAction":"write",
                      "targetDbName":conf.platformArch.bizDomainModuleDbName,
                      "writeSql":"call  updateUser  ('#platformUserGuid','#platformUserPwd',#isActive,#systemRole)",
                      "writeSqlParameter":
                      {
                            "#platformUserPwd":updatedPassword,
                            "#isActive":req.body.isActive,
                            "#systemRole":req.body.systemRole,
                            "#platformUserGuid":req.body.platformUserGuid 
                      },
                      "blockVerifyOrNot":false,
                      "reqStorageClusterDbType":0 //mysql=0 mssql=1
                
                };
          
                boyUsbCommon.aes256Encryption(key,times,JSON.stringify(precmd),function(value){
                if(value){
                      
                      let opBody={
                            "type":"op",
                            "targetUnit":"memory",
                            "encryptionKey":key,
                            "cmd": value
                      }
                      BoyUsbHttpHelper.apiSimpleRequestWithCallBack(conf.platformArch.hubInfo.httpDefaultMode,domainUrl,partialUrl,qs,opBody,timeout,function(Result){

                            if(Result){
                              res.end(JSON.stringify(Result));
                            }else{
                                res.end(JSON.stringify({
                                      "result":false,
                                      "desc":"cmd execution failed,please try again."
                              })) 
                            }
                      })
                      
                }else{
                      res.end(JSON.stringify({
                            "result":false,
                            "desc":"security encryption failed,please try again."
                      }))
                }


                })
          }
    });
}

UserManagement.prototype.deleteUser=async function(req,res){
    //入口参数验证
    let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/h5/Common/deleteUser');
    if(validationRs.Result===false){
    
          res.end(JSON.stringify(validationRs));
          return;
    }

    //调用hub接口获取加密指令
    var domainUrl=conf.platformArch.hubInfo.url;
    var partialUrl="/hubEntry";
    var qs=""
    var timeout=conf.platformArch.defaultHttpReqTimeOut;
    var body={
          "type":"encryption",
          "cmd":"getRandomCondition"
    };
    BoyUsbHttpHelper.apiSimpleRequestWithCallBack(conf.platformArch.hubInfo.httpDefaultMode,domainUrl,partialUrl,qs,body,timeout,function(Result){
          
          if(Result)
          {
                let key=Result.encryptionKey;
                let times=Result.encryptionTimes;
                let precmd={
                      "messageAction":"write",
                      "targetDbName":conf.platformArch.bizDomainModuleDbName,
                      "writeSql":"call deleteUser ('#platformUserGuid')",
                      "writeSqlParameter":
                      {
                            "#platformUserGuid":req.body.platformUserGuid 
                      },
                      "blockVerifyOrNot":false,
                      "reqStorageClusterDbType":0 //mysql=0 mssql=1
                
                };
          
                boyUsbCommon.aes256Encryption(key,times,JSON.stringify(precmd),function(value){
                      
                      if(value){
                            
                            let opBody={
                                  "type":"op",
                                  "targetUnit":"memory",
                                  "encryptionKey":key,
                                  "cmd": value
                            }
                            BoyUsbHttpHelper.apiSimpleRequestWithCallBack(conf.platformArch.hubInfo.httpDefaultMode,domainUrl,partialUrl,qs,opBody,timeout,function(Result){

                                    if(Result){
                                          res.end(JSON.stringify(Result));
                                    }else{
                                          res.end(JSON.stringify({
                                                "result":false,
                                                "desc":"cmd execution failed,please try again."
                                          })) 
                                    }
                            })
                            
                      }else{
                            res.end(JSON.stringify({
                                  "result":false,
                                  "desc":"security encryption failed,please try again."
                            }))
                      }


                })
          }
    });
}

UserManagement.prototype.selectUser=async function(req,res){

     //入口参数验证
     let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/h5/Common/selectUser');
     if(validationRs.Result===false){
     
           res.end(JSON.stringify(validationRs));
           return;
     }

     //调用hub接口获取加密指令
     var domainUrl=conf.platformArch.hubInfo.url;
     var partialUrl="/hubEntry";
     var qs=""
     var timeout=conf.platformArch.defaultHttpReqTimeOut;
     var body={
           "type":"encryption",
           "cmd":"getRandomCondition"
     };
     BoyUsbHttpHelper.apiSimpleRequestWithCallBack(conf.platformArch.hubInfo.httpDefaultMode,domainUrl,partialUrl,qs,body,timeout,function(Result){
           
           if(Result)
           {
                 let key=Result.encryptionKey;
                 let times=Result.encryptionTimes;
                 let precmd={
                       "messageAction":"read",
                       "targetDbName":conf.platformArch.bizDomainModuleDbName,
                       "keyObjName":"platformUser",
                       "keyObjType":"2",
                       "cacheGenMethod":"3",
                       "ttl":"200",
                       "querySql":"call selectUser ('#platformUserNameLike')",
                       "querySqlParameter":{"#platformUserNameLike":req.body.platformUserNameLike},//,
                       //"mocktype":"nodeCacheOperator"   //nodeCacheOperator，memCacheOperator,redisCacheOperator,localFeedDiskOperator
                       "reqStorageClusterDbType":0 //mysql=0 mssql=1
                      };
           
                 boyUsbCommon.aes256Encryption(key,times,JSON.stringify(precmd),function(value){
                       
                       if(value){
                             
                             let opBody={
                                   "type":"op",
                                   "targetUnit":"memory",
                                   "encryptionKey":key,
                                   "cmd": value
                             }
                             BoyUsbHttpHelper.apiSimpleRequestWithCallBack(conf.platformArch.hubInfo.httpDefaultMode,domainUrl,partialUrl,qs,opBody,timeout,function(Result){

                                    if(Result){
                                          res.end(JSON.stringify(Result));
                                    }else{
                                          res.end(JSON.stringify({
                                                "result":false,
                                                "desc":"cmd execution failed,please try again."
                                          })) 
                                    }
                             })
                             
                       }else{
                             res.end(JSON.stringify({
                                   "result":false,
                                   "desc":"security encryption failed,please try again."
                             }))
                       }


                 })
           }
     });
}

UserManagement.prototype.userLogin=async function(req,res){
        //入口参数验证
     let validationRs=await boyHsbValidationObj.InputValidator(req.body,'/viewNode/h5/Common/userLogin');
     if(validationRs.Result===false){
     
           res.end(JSON.stringify(validationRs));
           return;
     }

     //调用hub接口获取加密指令
     var domainUrl=conf.platformArch.hubInfo.url;
     var partialUrl="/hubEntry";
     var qs=""
     var timeout=conf.platformArch.defaultHttpReqTimeOut;
     var body={
           "type":"encryption",
           "cmd":"getRandomCondition"
     };
     BoyUsbHttpHelper.apiSimpleRequestWithCallBack(conf.platformArch.hubInfo.httpDefaultMode,domainUrl,partialUrl,qs,body,timeout,function(Result){
           
           if(Result)
           {
                 let key=Result.encryptionKey;
                 let times=Result.encryptionTimes;
                 let precmd={
                       "messageAction":"read",
                       "targetDbName":conf.platformArch.bizDomainModuleDbName,
                       "keyObjName":"platformUser",
                       "keyObjType":"2",
                       "cacheGenMethod":"3",
                       "ttl":"500",
                       "querySql":"select platformUserGuid from platformUser where platformUserName='#platformUserName' and platformUserPwd='#platformUserPwd'",
                       "querySqlParameter":{
                             "#platformUserName":req.body.platformUserName,
                             "#platformUserPwd":boyUsbCommon.getMd5(req.body.platformUserPwd)
                        },//,
                       //"mocktype":"nodeCacheOperator"   //nodeCacheOperator，memCacheOperator,redisCacheOperator,localFeedDiskOperator
                       "reqStorageClusterDbType":0 //mysql=0 mssql=1
                      };
           
                 boyUsbCommon.aes256Encryption(key,times,JSON.stringify(precmd),function(value){
                       
                       if(value){
                             
                             let opBody={
                                   "type":"op",
                                   "targetUnit":"memory",
                                   "encryptionKey":key,
                                   "cmd": value
                             }
                             BoyUsbHttpHelper.apiSimpleRequestWithCallBack(conf.platformArch.hubInfo.httpDefaultMode,domainUrl,partialUrl,qs,opBody,timeout,function(Result){

                                    if(Result&&JSON.parse(Result.value).length>0){
                                          res.end(JSON.stringify({
                                                "result":true,
                                                "platformUserGuid":JSON.parse(Result.value)[0].platformUserGuid,
                                                "desc":"Platform user login successfully."
                                          })) 
                                    }else{
                                          res.end(JSON.stringify({
                                                "result":false,
                                                "desc":"Platform user login failed."
                                          })) 
                                    }
                             })
                             
                       }else{
                             res.end(JSON.stringify({
                                   "result":false,
                                   "desc":"security encryption failed,please try again."
                             }))
                       }


                 })
           }
     });
}

module.exports=UserManagement;