var mssqlConf = {
    user: 'sa',
    password: 'Saboy3210',
    server: 'B4E62ROkd-29j',
    database: 'PerformanceTest',
    port: 2048,
    options: {
    encrypt: false // Use this if you're on Windows Azure=true
    }, 
    pool: {
        min: 0,
        max: 300,
        idleTimeoutMillis: 3000
    }
};

var mysqlConf = {

     dbConfig:{
        host: '127.0.0.1',
        user: 'root',
        port: 3306,
        password:'whoisboy',
        database: 'board_usb'  

     },
     onError: function(err){
        console.dir(err);
     },
     customError: null,
     timeout: 300,
     debug: false
};


var platformArch= {
     bizDomainModuleDbName:"board_usb",  //for biz projects,if project need a single DB change it into 'board_usb_proj',if project work with prod-biz DB change it into '[prod_biz_DbName]'
     defaultHttpReqTimeOut:20000,
     masterMandantoryVerifyTimeOut:40,
     shaHashLengh:36,
     shaHashTimes:3,
     md5Times:3,
     DeamonThreadSecRate:{
      
     
     },
     crystalCluster:{
         CheckSelfPubNetworkIpHttpMode:"https",
         CheckSelfPubNetworkIpDomainUrl: "api.ipify.org",
         CheckSelfPubNetworkIpPartialUrl:"/?format=json",
         SelfPubNetworkIpCacheTime:600,
         SelfPubNetworkIpCacheRetryRateOnceNetError:30,
         CrystalClusterNetworkMode:"lan",   //internet=广域网集群/lan=局域网内网集群
        interactProtocolType:0,
        httpDefaultMode:"http",
        defaultTalkingPort:8080,
        crystalTalkingSize:30,
        allowDuplicateOpTalking:true,
        crystalResendTimeout:30,
        ip1:'127.0.0.1:8080',
        ip2:'127.0.0.1:8080',
        ip3:'127.0.0.1:8080',
        ip4:'127.0.0.1:8080'
     },
     unitCluster:{
         interactProtocolType:0,
         httpDefaultMode:"http",
         defaultTalkingPort:8080,
         ip1:'192.168.125.1:8080',
         ip2:'192.168.125.1:8080',
         ip3:'192.168.125.1:8080',
         ip4:'192.168.125.1:8080'
     },
     serviceFor:{
       appId:0,
       appName:'',
       appGuid:'',
       reqStorageClusterType:0
     },
     encryptionKeyTtl:600,
     hubInfo:{
      url:"www.boyHub.com",
      httpDefaultMode:"http"
     },
     messageQueueInfo:{
        url:"www.boyMessageQueue.com",
        httpDefaultMode:"http"
     },
     memoryInfo:{
        url:"www.boyMemory.com",
        httpDefaultMode:"http"
     },
     diskFileInfo:{
         url:"www.boydiskfile.com",
         httpDefaultMode:"http"
     }
};

exports.mssqlConfig = mssqlConf;
exports.mysqlConfig = mysqlConf;
exports.platformArch=platformArch;
