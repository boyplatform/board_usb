'use strict'
var BoyUsbDBHelper= require('./boyUsbDBHelper');
var conf=require("../src/config");
var boyUsbCommon=require('../src/boyUsbCommon');
 
function UsbNodeInfoRecord(){
    this.BoyUsbDb=new BoyUsbDBHelper();
};

//RequestLog insert,update,select,delete
UsbNodeInfoRecord.prototype.RequestLogInsert=function(RequestLog){

     
    this.BoyUsbDb.dbType = 'mysql';
    this.BoyUsbDb.mysqlParameter.common.dbConf=conf.mysqlConfig; 
    this.BoyUsbDb.mysqlParameter.common.sql = "insert into RequestLog (appId,appName,appGuid,userId,url,createTime,reqStorageClusterType,reqGuid,isActive,userGuid,writeSqlSha,writeSql,isConfirmedByMaster,targetDbName) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    this.BoyUsbDb.mysqlParameter.common.params = [RequestLog.appId,RequestLog.appName,RequestLog.appGuid,RequestLog.userId,RequestLog.url,RequestLog.createTime,RequestLog.reqStorageClusterType,RequestLog.reqGuid,RequestLog.isActive,RequestLog.userGuid,RequestLog.writeSqlSha,RequestLog.writeSql,RequestLog.isConfirmedByMaster,RequestLog.targetDbName];
    this.BoyUsbDb.mysqlParameter.common.callBack = function (err, success, insertId) {
      
        if(err)
        {
              console.dir(err); 
              console.log(success,"--RequestLog is inserted failed!"); 
              return false;
        }else
        {
          if(insertId!=undefined){
             
              console.log(success,"--RequestLog is inserted successfully!");
              return true;
          }

        }
      
    }
    this.BoyUsbDb.add();
};

UsbNodeInfoRecord.prototype.RequestLogUpdate=function(RequestLog){   
   
    this.BoyUsbDb.dbType = 'mysql'; 
    this.BoyUsbDb.mysqlParameter.common.dbConf=conf.mysqlConfig;   
    this.BoyUsbDb.mysqlParameter.common.sql ="update RequestLog set appId=?,appName=?,appGuid=?,userId=?,url=?,createTime=?,reqStorageClusterType=?,isActive=?,userGuid=?,writeSqlSha=?,writeSql=? where reqGuid=?";
    this.BoyUsbDb.mysqlParameter.common.params=[RequestLog.appId,RequestLog.appName,RequestLog.appGuid,RequestLog.userId,RequestLog.url,RequestLog.createTime,RequestLog.reqStorageClusterType,RequestLog.isActive,RequestLog.userGuid,RequestLog.writeSqlSha,RequestLog.writeSql,RequestLog.reqGuid];
    this.BoyUsbDb.mysqlParameter.common.callBack = function (err, success, affectedRows)
    {
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--RequestLog is updated successfully!");
                return true;
            }else{
                console.log(success,"--RequestLog is updated failed!");
                return false;
            }
        }
    }
    this.BoyUsbDb.update();
  };

  UsbNodeInfoRecord.prototype.RequestLogIsActiveUpdate=function(RequestLog){   
   
    this.BoyUsbDb.dbType = 'mysql';
    this.BoyUsbDb.mysqlParameter.common.dbConf=conf.mysqlConfig;      
    this.BoyUsbDb.mysqlParameter.common.sql ="update RequestLog set isActive=? where reqGuid=?";
    this.BoyUsbDb.mysqlParameter.common.params=[RequestLog.isActive,RequestLog.reqGuid];
    this.BoyUsbDb.mysqlParameter.common.callBack = function (err, success, affectedRows)
    {
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--RequestLog isActive is updated successfully!");
                return true;
            }else{
                console.log(success,"--RequestLog isActive is updated failed!");
                return false;
            }
        }
    }
    this.BoyUsbDb.update();
  };

  UsbNodeInfoRecord.prototype.RequestLogIsConfirmedUpdate=function(RequestLog){   
   
    console.log("start update RequestLogIsConfirmedUpdate for reqGuid:",RequestLog.reqGuid);
    this.BoyUsbDb.dbType = 'mysql';
    this.BoyUsbDb.mysqlParameter.common.dbConf=conf.mysqlConfig;      
    this.BoyUsbDb.mysqlParameter.common.sql ="update RequestLog set isConfirmedByMaster=?,confirmedByMasterIp=? where reqGuid=?";
    this.BoyUsbDb.mysqlParameter.common.params=[RequestLog.isConfirmedByMaster,RequestLog.comeFromCrystalNodeIp,RequestLog.reqGuid];
    this.BoyUsbDb.mysqlParameter.common.callBack = function (err, success, affectedRows)
    {
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--RequestLog isConfirmedByMaster is updated successfully!");
                return true;
            }else{
                console.log(success,"--RequestLog isConfirmedByMaster is updated failed!");
                return false;
            }
        }
    }
    this.BoyUsbDb.update();
  };

  UsbNodeInfoRecord.prototype.RequestLogIsConfirmedUpdateByWriteSha=function(isConfirmedByMaster,writeSqlSha,writeSql){   
   
     
    this.BoyUsbDb.dbType = 'mysql';
    this.BoyUsbDb.mysqlParameter.common.dbConf=conf.mysqlConfig;      
    this.BoyUsbDb.mysqlParameter.common.sql ="update RequestLog set isConfirmedByMaster=? where writeSqlSha=? and writeSql=?";
    this.BoyUsbDb.mysqlParameter.common.params=[isConfirmedByMaster,writeSqlSha,writeSql];
    this.BoyUsbDb.mysqlParameter.common.callBack = function (err, success, affectedRows)
    {
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--RequestLog isConfirmedByMaster is updated successfully!");
                return true;
            }else{
                console.log(success,"--RequestLog isConfirmedByMaster is updated failed!");
                return false;
            }
        }
    }
    this.BoyUsbDb.update();
  };

  UsbNodeInfoRecord.prototype.RequestLogIsSentToMasterUpdate=function(isSentToMaster,reqGuid){   
   
    this.BoyUsbDb.dbType = 'mysql';    
    this.BoyUsbDb.mysqlParameter.common.dbConf=conf.mysqlConfig;  
    this.BoyUsbDb.mysqlParameter.common.sql ="update RequestLog set isSentToMaster=?,sendToMasterTime=? where reqGuid=?";
    this.BoyUsbDb.mysqlParameter.common.params=[isSentToMaster,boyUsbCommon.GetFormatDateFromTimeSpan(Date.now()),reqGuid];
    this.BoyUsbDb.mysqlParameter.common.callBack = function (err, success, affectedRows)
    {
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--RequestLog isSentToMaster is updated successfully!");
                return true;
            }else{
                console.log(success,"--RequestLog isSentToMaster is updated failed!");
                return false;
            }
        }
    }
    this.BoyUsbDb.update();
  };


  UsbNodeInfoRecord.prototype.RequestLogSelect=function(topNumber,whereSql,params,orderBySql,callBack){
    
    this.BoyUsbDb.dbType = 'mysql';   
    this.BoyUsbDb.mysqlParameter.select.tableName='RequestLog';
    this.BoyUsbDb.mysqlParameter.select.topNumber=topNumber;
    this.BoyUsbDb.mysqlParameter.select.whereSql=whereSql;
    this.BoyUsbDb.mysqlParameter.select.params=params;
    this.BoyUsbDb.mysqlParameter.select.orderSql=orderBySql;
    this.BoyUsbDb.mysqlParameter.select.callBack=function(err, rows)
    {
         console.log('Begin to RequestLogSelect from current node db')
         if(err)
         {
            console.log(err);
            console.log('Failed to RequestLogSelect from current node db');  
            callBack(undefined); 
         }
         else
         {
            callBack(rows); 
           
         }
    };
    this.BoyUsbDb.select();
}

UsbNodeInfoRecord.prototype.RequestLogDelete=function(reqId){
    
    this.BoyUsbDb.dbType = 'mysql'; 
    this.BoyUsbDb.mysqlParameter.del.tableName="RequestLog";
    this.BoyUsbDb.mysqlParameter.del.whereSql="where reqId=?";
    this.BoyUsbDb.mysqlParameter.del.params=[reqId];
    this.BoyUsbDb.mysqlParameter.del.callBack=function(err,success,affectRowsCount){
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--RequestLog is deleted successfully!");
                return true;
            }else{
                console.log(success,"--RequestLog is deleted failed!");
                return false;
            }
        }
    };
    this.BoyUsbDb.del();   
}

//operationLog insert,update,select,delete
UsbNodeInfoRecord.prototype.operationLogInsert=function(operationLog){

     
    this.BoyUsbDb.dbType = 'mysql';
    this.BoyUsbDb.mysqlParameter.common.dbConf=conf.mysqlConfig;
    this.BoyUsbDb.mysqlParameter.common.sql = "insert into operationLog (operationStorageClusterType,operationLogGuid,userId,userName,operationType,operationLogTime,appId,docId,exfModuleId,viewId,platformControllerId,platformActionId,usingObjectId,bizUserRoleId,deviceId,devLangId,operationStatusId,userGuid,appGuid,workFlowStatusId,writeSqlSha,writeSql) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    this.BoyUsbDb.mysqlParameter.common.params = [operationLog.operationStorageClusterType,operationLog.operationLogGuid,operationLog.userId,operationLog.userName,operationLog.operationType,operationLog.operationLogTime,operationLog.appId,operationLog.docId,operationLog.exfModuleId,operationLog.viewId,operationLog.platformControllerId,operationLog.platformActionId,operationLog.usingObjectId,operationLog.bizUserRoleId,operationLog.deviceId,operationLog.devLangId,operationLog.operationStatusId,operationLog.userGuid,operationLog.appGuid,operationLog.workFlowStatusId,operationLog.writeSqlSha,operationLog.writeSql]; 
    this.BoyUsbDb.mysqlParameter.common.callBack = function (err, success, insertId) {
      
        if(err)
        {
              console.dir(err); 
              console.log(success,"--operationLog is inserted failed!"); 
              return false;
        }else
        {
          if(insertId!=undefined){
             
              console.log(success,"--operationLog is inserted successfully!");
              return true;
          }

        }
      
    }
    this.BoyUsbDb.add();
};

UsbNodeInfoRecord.prototype.operationLogUpdate=function(operationLog){

     
    this.BoyUsbDb.dbType = 'mysql';
    this.BoyUsbDb.mysqlParameter.common.dbConf=conf.mysqlConfig;
    this.BoyUsbDb.mysqlParameter.common.sql = "update operationLog set  operationStorageClusterType=?,userId=?,userName=?,operationType=?,operationLogTime=?,appId=?,docId=?,exfModuleId=?,viewId=?,platformControllerId=?,platformActionId=?,usingObjectId=?,bizUserRoleId=?,deviceId=?,devLangId=?,operationStatusId=?,userGuid=?,appGuid=?,workFlowStatusId=?,writeSqlSha=?,writeSql=? where  operationLogGuid=? ";
    this.BoyUsbDb.mysqlParameter.common.params = [operationLog.operationStorageClusterType,operationLog.userId,operationLog.userName,operationLog.operationType,operationLog.operationLogTime,operationLog.appId,operationLog.docId,operationLog.exfModuleId,operationLog.viewId,operationLog.platformControllerId,operationLog.platformActionId,operationLog.usingObjectId,operationLog.bizUserRoleId,operationLog.deviceId,operationLog.devLangId,operationLog.operationStatusId,operationLog.userGuid,operationLog.appGuid,operationLog.workFlowStatusId,operationLog.writeSqlSha,operationLog.writeSql,operationLog.operationLogGuid]; 
    this.BoyUsbDb.mysqlParameter.common.callBack = function (err, success, insertId) {
      
        if(err)
        {
              console.dir(err); 
              console.log(success,"--operationLog is updated failed!"); 
              return false;
        }else
        {
          if(insertId!=undefined){
             
              console.log(success,"--operationLog is updated successfully!");
              return true;
          }

        }
      
    }
    this.BoyUsbDb.update();
};

UsbNodeInfoRecord.prototype.operationLogSelect=function(topNumber,whereSql,params,orderBySql,callBack){
    
    this.BoyUsbDb.dbType = 'mysql';    
    this.BoyUsbDb.mysqlParameter.select.tableName='operationLog';
    this.BoyUsbDb.mysqlParameter.select.topNumber=topNumber;
    this.BoyUsbDb.mysqlParameter.select.whereSql=whereSql;
    this.BoyUsbDb.mysqlParameter.select.params=params;
    this.BoyUsbDb.mysqlParameter.select.orderSql=orderBySql;
    this.BoyUsbDb.mysqlParameter.select.callBack=function(err, rows)
    {
         console.log('Begin to operationLogSelect from current node db')
         if(err)
         {
            console.log('Failed to operationLogSelect from current node db');  
            callBack(undefined); 
         }
         else
         {
            callBack(rows); 
           
         }
    };
    this.BoyUsbDb.select();
}

UsbNodeInfoRecord.prototype.operationLogDelete=function(operationLogId){
    
    this.BoyUsbDb.dbType = 'mysql'; 
    this.BoyUsbDb.mysqlParameter.del.tableName="operationLog";
    this.BoyUsbDb.mysqlParameter.del.whereSql="where operationLogId=?";
    this.BoyUsbDb.mysqlParameter.del.params=[operationLogId];
    this.BoyUsbDb.mysqlParameter.del.callBack=function(err,success,affectRowsCount){
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--operationLog is deleted successfully!");
                return true;
            }else{
                console.log(success,"--operationLog is deleted failed!");
                return false;
            }
        }
    };
    this.BoyUsbDb.del();   
}

UsbNodeInfoRecord.prototype.operationLogDeleteAll=function(callBack){
    
    this.BoyUsbDb.dbType = 'mysql'; 
    this.BoyUsbDb.mysqlParameter.del.tableName="operationLog";
    this.BoyUsbDb.mysqlParameter.del.whereSql="where operationLogId>?";
    this.BoyUsbDb.mysqlParameter.del.params=[0];
    this.BoyUsbDb.mysqlParameter.del.callBack=function(err,success,affectRowsCount){
        if (err) {
            console.dir(err);  
            callBack(undefined);
        }else
        {
            if(success){
                console.log(success,"--operationLog is deleted all successfully!");
                callBack(true);
            }else{
                console.log(success,"--operationLog is deleted all failed!");
                callBack(false);
            }
        }
    };
    this.BoyUsbDb.del();   
}

//operationLogSummarySha insert,update,select,delete
UsbNodeInfoRecord.prototype.operationLogSummaryShaInsert=function(OperationLogSummarySha){
       
        this.BoyUsbDb.dbType = 'mysql';
        this.BoyUsbDb.mysqlParameter.common.dbConf=conf.mysqlConfig;
        this.BoyUsbDb.mysqlParameter.common.sql = "insert into operationLogSummarySha (latestCheckOperationSha,createTime,shaCheckGuid) values (?,?,?)";
        this.BoyUsbDb.mysqlParameter.common.params = [OperationLogSummarySha.latestCheckOperationSha,OperationLogSummarySha.createTime,OperationLogSummarySha.shaCheckGuid]; 
        this.BoyUsbDb.mysqlParameter.common.callBack = function (err, success, insertId) {
        
            if(err)
            {
                console.dir(err); 
                console.log(success,"--operationLogSummarySha is inserted failed!"); 
                return false;
            }else
            {
            if(insertId!=undefined){
                
                console.log(success,"--operationLogSummarySha is inserted successfully!");
                return true;
            }

            }
        
        }
        this.BoyUsbDb.add();
}
UsbNodeInfoRecord.prototype.operationLogSummaryShaUpdateIsConfirmedByMaster=function(shaCheckGuid,isConfirmedByMaster,confirmedByMasterIp){
    
    this.BoyUsbDb.dbType = 'mysql';
    this.BoyUsbDb.mysqlParameter.common.dbConf=conf.mysqlConfig;
    this.BoyUsbDb.mysqlParameter.common.sql = "update operationLogSummarySha set  isConfirmedByMaster=?,isActive=?,confirmedByMasterIp=?  where  shaCheckGuid=? ";
    if(isConfirmedByMaster){
       this.BoyUsbDb.mysqlParameter.common.params = [isConfirmedByMaster,false,confirmedByMasterIp,shaCheckGuid]; 
    }else{
       this.BoyUsbDb.mysqlParameter.common.params = [isConfirmedByMaster,true,confirmedByMasterIp,shaCheckGuid]; 
    }
    this.BoyUsbDb.mysqlParameter.common.callBack = function (err, success, insertId) {
      
        if(err)
        {
              console.dir(err); 
              console.log(success,"--operationLogSummarySha isConfirmedByMaster is updated failed!"); 
              return false;
        }else
        {
          if(insertId!=undefined){
             
              console.log(success,"--operationLogSummarySha isConfirmedByMaster is updated successfully!");
              return true;
          }

        }
      
    }
    this.BoyUsbDb.update();

}

UsbNodeInfoRecord.prototype.operationLogSummaryShaUpdateNotMatchedCount=function(shaCheckGuid,callBack){
       
        this.BoyUsbDb.dbType = 'mysql';
        this.BoyUsbDb.mysqlParameter.common.dbConf=conf.mysqlConfig;
        this.BoyUsbDb.mysqlParameter.common.sql = "update operationLogSummarySha set  notMatchedCount=notMatchedCount+1  where  shaCheckGuid=? ";
        this.BoyUsbDb.mysqlParameter.common.params = [shaCheckGuid]; 
        this.BoyUsbDb.mysqlParameter.common.callBack = function (err, success, insertId) {
        
            if(err)
            {
                console.dir(err); 
                console.log(success,"--operationLogSummarySha notMatchedCount is updated failed!"); 
                callBack(false);
            }else
            {
            if(insertId!=undefined){
                
                console.log(success,"--operationLogSummarySha notMatchedCount is updated successfully!");
                callBack(true);
            }

            }
        
        }
        this.BoyUsbDb.update();
}

UsbNodeInfoRecord.prototype.operationLogSummaryShaUpdateIsSendToMaster=function(isSendToMaster,shaCheckGuid){
       
    this.BoyUsbDb.dbType = 'mysql';
    this.BoyUsbDb.mysqlParameter.common.dbConf=conf.mysqlConfig;
    this.BoyUsbDb.mysqlParameter.common.sql = "update operationLogSummarySha set  isSendToMaster=?,sendToMasterTime=?  where  shaCheckGuid=? ";
    this.BoyUsbDb.mysqlParameter.common.params = [isSendToMaster,boyUsbCommon.GetFormatDateFromTimeSpan(Date.now()),shaCheckGuid]; 
    this.BoyUsbDb.mysqlParameter.common.callBack = function (err, success, insertId) {
    
        if(err)
        {
            console.dir(err); 
            console.log(success,"--operationLogSummarySha isSendToMaster is updated failed!"); 
            return false;
        }else
        {
        if(insertId!=undefined){
            
            console.log(success,"--operationLogSummarySha isSendToMaster is updated successfully!");
            return true;
        }

        }
    
    }
    this.BoyUsbDb.update();
}

UsbNodeInfoRecord.prototype.operationLogSummaryShaUpdateIsNeedRestore=function(shaCheckGuid,definedOperationLogCheckFailedTimes){
       
    this.BoyUsbDb.dbType = 'mysql';
    this.BoyUsbDb.mysqlParameter.common.dbConf=conf.mysqlConfig;
    this.BoyUsbDb.mysqlParameter.common.sql = "update operationLogSummarySha set  isNeedRestore=1 and notMatchedCount>=?  where  shaCheckGuid=? ";
    this.BoyUsbDb.mysqlParameter.common.params = [definedOperationLogCheckFailedTimes,shaCheckGuid]; 
    this.BoyUsbDb.mysqlParameter.common.callBack = function (err, success, insertId) {
    
        if(err)
        {
            console.dir(err); 
            console.log(success,"--operationLogSummarySha isNeedRestore is updated failed!"); 
            return false;
        }else
        {
        if(insertId!=undefined){
            
            console.log(success,"--operationLogSummarySha isNeedRestore is updated successfully!");
            return true;
        }

        }
    
    }
    this.BoyUsbDb.update();
}

UsbNodeInfoRecord.prototype.operationLogSummaryShaSelect=function(topNumber,whereSql,params,orderBySql,callBack){
    
    this.BoyUsbDb.dbType = 'mysql';    
    this.BoyUsbDb.mysqlParameter.select.tableName='operationLogSummarySha';
    this.BoyUsbDb.mysqlParameter.select.topNumber=topNumber;
    this.BoyUsbDb.mysqlParameter.select.whereSql=whereSql;
    this.BoyUsbDb.mysqlParameter.select.params=params;
    this.BoyUsbDb.mysqlParameter.select.orderSql=orderBySql;
    this.BoyUsbDb.mysqlParameter.select.callBack=function(err, rows)
    {
         console.log('Begin to operationLogSummaryShaSelect from current node db')
         if(err)
         {
            console.log('Failed to operationLogSummaryShaSelect from current node db');  
            callBack(undefined); 
         }
         else
         {
            callBack(rows); 
           
         }
    };
    this.BoyUsbDb.select();
}

UsbNodeInfoRecord.prototype.operationLogSummaryShaDelete=function(shaCheckId){
        this.BoyUsbDb.dbType = 'mysql'; 
        this.BoyUsbDb.mysqlParameter.del.tableName="operationLogSummarySha";
        this.BoyUsbDb.mysqlParameter.del.whereSql="where shaCheckId=?";
        this.BoyUsbDb.mysqlParameter.del.params=[shaCheckId];
        this.BoyUsbDb.mysqlParameter.del.callBack=function(err,success,affectRowsCount){
            if (err) {
                console.dir(err);  
                return false;
            }else
            {
                if(success){
                    console.log(success,"--operationLogSummarySha is deleted successfully!");
                    return true;
                }else{
                    console.log(success,"--operationLogSummarySha is deleted failed!");
                    return false;
                }
            }
        };
        this.BoyUsbDb.del(); 
}

UsbNodeInfoRecord.prototype.checkedOperationLogSummaryShaDelete=function(){
    this.BoyUsbDb.dbType = 'mysql'; 
    this.BoyUsbDb.mysqlParameter.del.tableName="operationLogSummarySha";
    this.BoyUsbDb.mysqlParameter.del.whereSql="where isConfirmedByMaster=1 and isActive=0";
    this.BoyUsbDb.mysqlParameter.del.params=[""];
    this.BoyUsbDb.mysqlParameter.del.callBack=function(err,success,affectRowsCount){
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--checked OperationLogSummarySha is deleted successfully!");
                return true;
            }else{
                console.log(success,"--checked OperationLogSummarySha is deleted failed!");
                return false;
            }
        }
    };
    this.BoyUsbDb.del(); 
}

//operationLogShadow delete
UsbNodeInfoRecord.prototype.operationLogShadowDelete=function(callBack){
    this.BoyUsbDb.dbType = 'mysql'; 
    this.BoyUsbDb.mysqlParameter.del.tableName="operationLogShadow";
    this.BoyUsbDb.mysqlParameter.del.whereSql="where shaCheckId>?";
    this.BoyUsbDb.mysqlParameter.del.params=[0];
    this.BoyUsbDb.mysqlParameter.del.callBack=function(err,success,affectRowsCount){
        if (err) {
            console.dir(err);  
            callBack(undefined);
        }else
        {
            if(success){
                console.log(success,"--operationLogShadow is deleted successfully!");
                callBack(true);
            }else{
                console.log(success,"--operationLogShadow is deleted failed!");
                callBack(false);
            }
        }
    };
    this.BoyUsbDb.del(); 
}


//operationLogLanding insert,delete
UsbNodeInfoRecord.prototype.operationLogLandingInsert=function(OperationLogLanding,callBack){
       
    this.BoyUsbDb.dbType = 'mysql';
    this.BoyUsbDb.mysqlParameter.common.dbConf=conf.mysqlConfig;
    this.BoyUsbDb.mysqlParameter.common.sql = "insert into operationLogLanding (operationStorageClusterType,operationLogGuid,userId,userName,operationType,operationLogTime,appId,docId,exfModuleId,viewId,platformControllerId,platformActionId,usingObjectId,bizUserRoleId,deviceId,devLangId,operationStatusId,userGuid,appGuid,workFlowStatusId,writeSqlSha,writeSql) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    this.BoyUsbDb.mysqlParameter.common.params = [OperationLogLanding.operationStorageClusterType,OperationLogLanding.operationLogGuid,OperationLogLanding.userId,OperationLogLanding.userName,OperationLogLanding.operationType,OperationLogLanding.operationLogTime,OperationLogLanding.appId,OperationLogLanding.docId,OperationLogLanding.exfModuleId,OperationLogLanding.viewId,OperationLogLanding.platformControllerId,OperationLogLanding.platformActionId,OperationLogLanding.usingObjectId,OperationLogLanding.bizUserRoleId,OperationLogLanding.deviceId,OperationLogLanding.devLangId,OperationLogLanding.operationStatusId,OperationLogLanding.userGuid,OperationLogLanding.appGuid,OperationLogLanding.workFlowStatusId,OperationLogLanding.writeSqlSha,OperationLogLanding.writeSql]; 
    this.BoyUsbDb.mysqlParameter.common.callBack = function (err, success, insertId) {
    
        if(err)
        {
            console.dir(err); 
            console.log(success,"--OperationLogLanding is inserted failed!"); 
            callBack(false);
        }else
        {
        if(insertId!=undefined){
            
            console.log(success,"--OperationLogLanding is inserted successfully!");
            callBack(true);
        }

        }
    
    }
    this.BoyUsbDb.add();
}

UsbNodeInfoRecord.prototype.operationLogLandingDeleteAll=function(callBack){
    
    this.BoyUsbDb.dbType = 'mysql'; 
    this.BoyUsbDb.mysqlParameter.del.tableName="operationLogLanding";
    this.BoyUsbDb.mysqlParameter.del.whereSql="where operationLogId>?";
    this.BoyUsbDb.mysqlParameter.del.params=[0];
    this.BoyUsbDb.mysqlParameter.del.callBack=function(err,success,affectRowsCount){
        if (err) {
            console.dir(err);  
            callBack(undefined);
        }else
        {
            if(success){
                console.log(success,"--operationLogLanding is deleted all successfully!");
                callBack(true);
            }else{
                console.log(success,"--operationLogLanding is deleted all failed!");
                callBack(false);
            }
        }
    };
    this.BoyUsbDb.del();   
}




UsbNodeInfoRecord.prototype.showDataBases=function(callBack){
    
    this.BoyUsbDb.dbType = 'mysql';
    this.BoyUsbDb.mysqlParameter.common.dbConf=conf.mysqlConfig; 
    this.BoyUsbDb.mysqlParameter.common.sql ="show databases";
    this.BoyUsbDb.mysqlParameter.common.params=[""];
    this.BoyUsbDb.mysqlParameter.common.callBack = function (err, rows) {
      
        if(err)
        {
              console.dir(err);  
              callBack(undefined);
        }else
        {
            callBack(rows);

        }
      
    };
    this.BoyUsbDb.querySql();
}

UsbNodeInfoRecord.prototype.showTablesBaseOnDBName=function(DbName,callBack){
    this.BoyUsbDb.dbType = 'mysql';
    this.BoyUsbDb.mysqlParameter.common.dbConf=conf.mysqlConfig; 
    this.BoyUsbDb.mysqlParameter.common.sql ="select TABLE_NAME from information_schema.TABLES where TABLE_SCHEMA=?";
    this.BoyUsbDb.mysqlParameter.common.params=[DbName];
    this.BoyUsbDb.mysqlParameter.common.callBack = function (err, rows) {
      
        if(err)
        {
              console.dir(err);  
              callBack(undefined);
        }else
        {
            callBack(rows);

        }
      
    };
    this.BoyUsbDb.querySql();
}

UsbNodeInfoRecord.prototype.deleteTablesByName=function(tableName,callback){
        this.BoyUsbDb.dbType = 'mysql'; 
        this.BoyUsbDb.mysqlParameter.del.tableName=tableName;
        this.BoyUsbDb.mysqlParameter.del.whereSql="";
        this.BoyUsbDb.mysqlParameter.del.params=[""];
        this.BoyUsbDb.mysqlParameter.del.callBack=function(err,success,affectRowsCount){
            if (err) {
                console.dir(err);  
                return callback(undefined);
            }else
            {
                if(success){
                    console.log(success,"--",tableName," is deleted successfully!");
                    callback(true);
                }else{
                    console.log(success,"--",tableName," is deleted failed!");
                    callback(false);
                }
            }
        };
        this.BoyUsbDb.del(); 
}

module.exports = UsbNodeInfoRecord;