'use strict'
var conf=require("../../../src/config");
var CrystalClusterInfoRecord=require("../../../Dao/crystalClusterInfoRecord")
var CrystalClusterBlock=require('../../../pojo/crystalClusterBlock');
var CrystalMasterVote=require('../../../pojo/crystalMasterVote');



function DecideAndAction(){
    
    if(this.crystalClusterInfoRecord===undefined){
        this.crystalClusterInfoRecord=new CrystalClusterInfoRecord();
     }
     if(this.crystalMasterVote===undefined){
        this.crystalMasterVote=new CrystalMasterVote();
     }
     
 
};

DecideAndAction.prototype.constructor=DecideAndAction;

//Effective master node vote result
DecideAndAction.prototype.effectiveMasterNodeVoteResult=function(){

    console.log("start effectiveMasterNodeVoteResult")
    //--Base on voting result under defined time period under current nodeDB, update the master node flag column under current nodeDB
       //sort crystalMasterVote by lastVoteCount and get the terminal master node
       if(this.crystalClusterInfoRecord===undefined){
        this.crystalClusterInfoRecord=new CrystalClusterInfoRecord();
     }
     
      this.crystalClusterInfoRecord.crystalMasterVoteSelect("1","",[""],"order by lastVoteCount desc",function(rows){
            if(rows!=undefined&&rows.length>0){
                //update the master node flag column under current nodeDB
                var crystalClusterInfoRecord=new CrystalClusterInfoRecord();
                
                //update the master
                crystalClusterInfoRecord.crystalClusterBlockSelect("1","where crystalNodeIp=?",[rows[0].crystalNodeIp],"",function(rows){
                    if(rows!==undefined&&rows.length>0){
                        var crystalClusterBlock=  new CrystalClusterBlock(rows[0].crystalNodeGuid,rows[0].crystalNodeIp,rows[0].crystalNodePort,conf.platformArch.crystalCluster.interactProtocolType
                        ,rows[0].mem_totalHeap,rows[0].mem_heapUsed,rows[0].mem_totalForCurrentProcess,rows[0].mem_totalOnV8EngineUsing,rows[0].mem_usedMemRate,rows[0].cpuArch,rows[0].cpuInfo,rows[0].freemem,rows[0].hostName
                        ,rows[0].loadAvg,rows[0].networkInterface,rows[0].platformtype,rows[0].platformVersion,rows[0].osTempDir,rows[0].totalMemory,rows[0].osType,rows[0].nodeNormalRunedTime,0);
                        crystalClusterInfoRecord.crystalClusterBlockMasterUpdate(crystalClusterBlock);
                    }
                });

                //revoke any other node's master role to work role
                crystalClusterInfoRecord.crystalClusterBlockSelect("","where crystalNodeIp<>?",[rows[0].crystalNodeIp],"",function(rows){
                    if(rows!==undefined&&rows.length>0){
                        for(let row of rows){
                            var crystalClusterBlock=  new CrystalClusterBlock(row.crystalNodeGuid,row.crystalNodeIp,row.crystalNodePort,conf.platformArch.crystalCluster.interactProtocolType
                            ,row.mem_totalHeap,row.mem_heapUsed,row.mem_totalForCurrentProcess,row.mem_totalOnV8EngineUsing,row.mem_usedMemRate,row.cpuArch,row.cpuInfo,row.freemem,row.hostName
                            ,row.loadAvg,row.networkInterface,row.platformtype,row.platformVersion,row.osTempDir,row.totalMemory,row.osType,row.nodeNormalRunedTime,1);
                            crystalClusterInfoRecord.crystalClusterBlockMasterUpdate(crystalClusterBlock);
                        }
                    }
                });
            }

      
      });  


};


module.exports=DecideAndAction;