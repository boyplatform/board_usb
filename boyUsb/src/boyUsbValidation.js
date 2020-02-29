'use strict'
var validator=require('validator');
 
var boyUsbCommon=require('./boyUsbCommon');
var QueueValidator=(function(){
    
    
    return function() {
         
        this.InputValidator=function(body,router){
            
            let validatorResult=[];
            switch(router)
            {
               
              case '/readMe':
                //结构验证
                if(body.type===undefined)
                {
                    validatorResult.push({RequestResponseId:boyUsbCommon.getUUID(),Result:false,Description:'报文结构错误,请检查核对!'})
                }else{
                    validatorResult.push({Result:true});
                }
                break;
              case '/viewNode/h5/Common/AddUser':
                
              if(body.platformUserName===undefined||body.platformUserPwd===undefined)
                {
                    validatorResult.push({RequestResponseId:boyUsbCommon.getUUID(),Result:false,Description:'报文结构错误,请检查核对!'})
                }else{
                    
                    if(body.platformUserName===""||body.platformUserPwd===""||(typeof body.systemRole)!=="number"||body.systemRole===undefined){
                       
                        validatorResult.push({RequestResponseId:boyUsbCommon.getUUID(),Result:false,Description:'报文结构错误,请检查核对!'})

                    }
                    //Anti SQL injection
                    else if(boyUsbCommon.AntiSqlInjectVerify(body.platformUserName)===false
                          ||boyUsbCommon.AntiSqlInjectVerify(body.platformUserPwd)===false
                          ||boyUsbCommon.AntiSqlInjectVerify(body.systemRole)===false){

                            validatorResult.push({RequestResponseId:boyUsbCommon.getUUID(),Result:false,Description:'参数中存在非法字符!'});

                    }else{
                    
                      validatorResult.push({Result:true});
                    }
                }
                break;
              case '/viewNode/h5/Common/updateUser':
                if(body.platformUserGuid===undefined||body.platformUserPwd===undefined)
                {
                    validatorResult.push({RequestResponseId:boyUsbCommon.getUUID(),Result:false,Description:'报文结构错误,请检查核对!'})
                }else{
                    if(body.platformUserGuid===""||(typeof body.systemRole)!=="number"||body.systemRole===undefined||body.systemRole>1||body.systemRole<0||((typeof body.isActive)!=="number"&&(typeof body.isActive)!=="boolean")||body.isActive===undefined||body.isActive>1||body.isActive<0){
                       
                        validatorResult.push({RequestResponseId:boyUsbCommon.getUUID(),Result:false,Description:'报文结构错误,请检查核对!'})

                    } //Anti SQL injection
                    else if(boyUsbCommon.AntiSqlInjectVerify(body.platformUserGuid)===false||
                            boyUsbCommon.AntiSqlInjectVerify(body.platformUserPwd)===false||
                            boyUsbCommon.AntiSqlInjectVerify(body.systemRole)===false||
                            boyUsbCommon.AntiSqlInjectVerify(body.isActive)===false){

                                validatorResult.push({RequestResponseId:boyUsbCommon.getUUID(),Result:false,Description:'参数中存在非法字符!'});
                    }
                    else{
                     validatorResult.push({Result:true});
                    }
                }
                break;
            case '/viewNode/h5/Common/deleteUser':
                if(body.platformUserGuid===undefined)
                {
                    validatorResult.push({RequestResponseId:boyUsbCommon.getUUID(),Result:false,Description:'报文结构错误,请检查核对!'})
                }else{
                    
                    if(body.platformUserGuid===""){
                       
                        validatorResult.push({RequestResponseId:boyUsbCommon.getUUID(),Result:false,Description:'报文结构错误,请检查核对!'})

                    }//Anti SQL injection
                    else if(boyUsbCommon.AntiSqlInjectVerify(body.platformUserGuid)===false){

                        validatorResult.push({RequestResponseId:boyUsbCommon.getUUID(),Result:false,Description:'参数中存在非法字符!'});
                    }
                    else{ 
                     validatorResult.push({Result:true});
                    }
                }
                break;
            case '/viewNode/h5/Common/selectUser':
                if(body.platformUserNameLike===undefined)
                {
                    validatorResult.push({RequestResponseId:boyUsbCommon.getUUID(),Result:false,Description:'报文结构错误,请检查核对!'})
                }else{
                    //Anti SQL injection
                    if(boyUsbCommon.AntiSqlInjectVerify(body.platformUserNameLike)===false){
                        
                        validatorResult.push({RequestResponseId:boyUsbCommon.getUUID(),Result:false,Description:'参数中存在非法字符!'});
                    }else{
                        validatorResult.push({Result:true});
                    }
                }
                break;

            case '/viewNode/h5/Common/userLogin':
                if(body.platformUserName===undefined||body.platformUserPwd===undefined)
                {
                    validatorResult.push({RequestResponseId:boyUsbCommon.getUUID(),Result:false,Description:'报文结构错误,请检查核对!'})
                }else{
                    //Anti SQL injection
                    if(boyUsbCommon.AntiSqlInjectVerify(body.platformUserName)===false||
                       boyUsbCommon.AntiSqlInjectVerify(body.platformUserPwd)===false){
                        
                        validatorResult.push({RequestResponseId:boyUsbCommon.getUUID(),Result:false,Description:'参数中存在非法字符!'});
                    }else{
                        validatorResult.push({Result:true});
                    }
                }
                break;
            }

            return validatorResult[0];
        };
        
    }
})();

module.exports=QueueValidator;