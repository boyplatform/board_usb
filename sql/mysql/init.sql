/*==============================For Common domain Module init================================*/
drop table if exists platformUser;
drop table if exists BizDomainList;
drop table if exists platformViewControls;
drop table if exists platformView;
drop table if exists AppList;
drop table if exists r_userAndApp;
drop table if exists opExchangeFeatureFieldModules;
drop table if exists platformActionList;
drop table if exists platformActionFlowList;
drop table if exists opDevLang;
drop table if exists platformDeviceType;
drop table if exists platformDevice;
drop table if exists bizOpUserRole;
drop table if exists usingObject;
drop table if exists opExchangeStatus;
drop table if exists CauseEffectContext;
/*==============================================================*/
/* Table: platformUser                                          */
/*==============================================================*/
create table platformUser
(
   platformUserId       bigint not null auto_increment,
   platformUserGuid     varchar(255),
   platformUserName     varchar(255),
   platformUserPwd      text,
   createTime           datetime,
   updateTime           timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   expiredDayCount      bigint default 15,
   isActive             bit default 1,
   systemRole           bigint comment '0=platform admin
            1=normal user',
   primary key (platformUserId)
);




/*==============================================================*/
/* Table: BizDomainList                                         */
/*==============================================================*/
create table BizDomainList
(
   bizDomainId          bigint not null auto_increment,
   bizDomainName        varchar(255),
   createTime           datetime,
   updateTime           timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   status               int default 0 comment '0=non active
            1=on design
            2=on dev
            3=on testing
            4=beta
            5=online testing
            6=Go Live active',
   createdBy            varchar(255),
   updatedBy            varchar(255),
   isShared             bit default 0 comment '0=no
            1=yes',
   primary key (bizDomainId)
);




/*==============================================================*/
/* Table: platformViewControls                                  */
/*==============================================================*/
create table platformViewControls
(
   platformViewControlId bigint not null auto_increment,
   platformViewControlGuid varchar(255),
   platformViewControlName varchar(255),
   platformViewControlType bigint comment '1=input
            2=output
            3=both',
   createTime           datetime,
   updateTime           timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   isActive             bit default 1,
   createdBy            varchar(255),
   updatedBy            varchar(255),
   isShared             bit default 0 comment '0=no
            1=yes',
   primary key (platformViewControlId)
);




/*==============================================================*/
/* Table: platformView                                          */
/*==============================================================*/
create table platformView
(
   platformViewId       bigint not null auto_increment,
   platformViewGuid     varchar(255),
   platformViewType     bigint comment '1-add
            2-viewUpdate
            3-List
            4-viewDelete
            5-listDelete',
   platformViewName     text,
   createTime           datetime,
   updateTime           timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   isActive             bit default 1,
   createdBy            varchar(255),
   updatedBy            varchar(255),
   isShared             bit default 0 comment '0=no
            1=yes',
   primary key (platformViewId)
);




/*==============================================================*/
/* Table: AppList                                               */
/*==============================================================*/
create table AppList
(
   appID                bigint not null,
   appGuid              varchar(255) not null,
   appName              varchar(255) not null,
   createTime           datetime,
   updateTime           timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   devOrg               varchar(255),
   devOrgDesciption     varchar(255),
   devPersonName        varchar(255),
   appDescription       varchar(255),
   statusFlag           int default 1 comment '0=delete
            1=on platform review
            2=beta Testing
            3=Live',
   r_domainId           bigint,
   r_deviceId           bigint,
   createdBy            varchar(255),
   updatedBy            varchar(255),
   isShared             bit default 0 comment '0=no
            1=yes',
   primary key (appID)
);

alter table AppList comment 'The purpose of the table is to create a list to descript ent';

alter table AppList add constraint FK_Reference_1 foreign key (r_domainId)
      references BizDomainList (bizDomainId) on delete restrict on update restrict;




/*==============================================================*/
/* Table: r_userAndApp                                          */
/*==============================================================*/
create table r_userAndApp
(
   platformUserId       bigint,
   appID                bigint,
   createTime           datetime,
   updateTime           timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   isActive             bit default 1,
   createdBy            varchar(255),
   updatedBy            varchar(255)
);

alter table r_userAndApp add constraint FK_Reference_18 foreign key (appID)
      references AppList (appID) on delete restrict on update restrict;

alter table r_userAndApp add constraint FK_Reference_19 foreign key (platformUserId)
      references platformUser (platformUserId) on delete restrict on update restrict;





/*==============================================================*/
/* Table: opExchangeFeatureFieldModules                         */
/*==============================================================*/
create table opExchangeFeatureFieldModules
(
   opExchangeFeatureFieldModuleId bigint not null,
   r_appId              bigint,
   opExchangeFeatureFieldModuleName varchar(255),
   opExchangeFeatureFieldModuleGuid varchar(255),
   status               bigint comment '0=non actvie
            1=active',
   createdBy            varchar(255),
   updatedBy            varchar(255),
   isShared             bit default 0 comment '0=no
            1=yes',
   primary key (opExchangeFeatureFieldModuleId)
);

alter table opExchangeFeatureFieldModules comment 'Used to descript the feature with many interact operation fo';

alter table opExchangeFeatureFieldModules add constraint FK_Reference_3 foreign key (r_appId)
      references AppList (appID) on delete restrict on update restrict;
	  



/*==============================================================*/
/* Table: platformActionList                                    */
/*==============================================================*/
create table platformActionList
(
   platformActionId     bigint not null auto_increment,
   platformActionName   text,
   platformCmd          varchar(255),
   r_appId              bigint,
   status               bigint default 1 comment '0=non-active
            1=active',
   r_opExchangeFeatureFieldModuleId bigint,
   r_platformViewId     bigint,
   r_platformViewControlId bigint,
   platformActionGuid   varchar(255),
   createdBy            varchar(255),
   updatedBy            varchar(255),
   isShared             bit default 0 comment '0=no
            1=yes',
   primary key (platformActionId)
);

alter table platformActionList comment 'descript platform actions';

alter table platformActionList add constraint FK_Reference_2 foreign key (r_appId)
      references AppList (appID) on delete restrict on update restrict;

alter table platformActionList add constraint FK_Reference_20 foreign key (r_platformViewId)
      references platformView (platformViewId) on delete restrict on update restrict;

alter table platformActionList add constraint FK_Reference_21 foreign key (r_platformViewControlId)
      references platformViewControls (platformViewControlId) on delete restrict on update restrict;

alter table platformActionList add constraint FK_Reference_4 foreign key (r_opExchangeFeatureFieldModuleId)
      references opExchangeFeatureFieldModules (opExchangeFeatureFieldModuleId) on delete restrict on update restrict;




/*==============================================================*/
/* Table: platformActionFlowList                                */
/*==============================================================*/
create table platformActionFlowList
(
   platformActionFlowId bigint not null auto_increment,
   platformActionFlowGuid varchar(255),
   r_platformActionId   bigint,
   r_platformActionName text,
   restApiUrl           text,
   restReqMessage_Json  text,
   restReqMessage_Xml   text,
   platformCmd          varchar(255),
   opType               bigint,
   bak_localController  varchar(255),
   bak_localControllerUrl varchar(255),
   executeOrder         bigint,
   executePosition      int comment '0=before action do some validation
            1=once action begin
            2=during action processing
            3=after action to do some thing.',
   resSuccessResultCode text,
   resFailedResultCode  text,
   createdBy            varchar(255),
   updatedBy            varchar(255),
   isShared             bit,
   primary key (platformActionFlowId)
);

alter table platformActionFlowList comment 'Descript the action detail steps';

alter table platformActionFlowList add constraint FK_Reference_11 foreign key (r_platformActionId)
      references platformActionList (platformActionId) on delete restrict on update restrict;




/*==============================================================*/
/* Table: opDevLang                                             */
/*==============================================================*/
create table opDevLang
(
   opImpDevLangId       bigint not null auto_increment,
   opImpDevLangName     varchar(255),
   status               bigint,
   createTime           datetime,
   updateTime           timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   createdBy            varchar(255),
   updatedBy            varchar(255),
   isShared             bit default 0 comment '0=no
            1=yes',
   primary key (opImpDevLangId)
);

alter table opDevLang comment 'Descript invoke the op api/cmd built by which computer langu';





/*==============================================================*/
/* Table: platformDeviceType                                    */
/*==============================================================*/
create table platformDeviceType
(
   platformDeviceTypeId bigint not null auto_increment,
   platformDeviceTypeName varchar(255),
   platformDeviceTypeGuid varchar(255),
   status               bigint comment '0=non active
            1=active',
   iotBoardType         bigint,
   osType               bigint,
   createdBy            varchar(255),
   updatedBy            varchar(255),
   isShared             bit default 0 comment '0=no
            1=yes',
   primary key (platformDeviceTypeId)
);




/*==============================================================*/
/* Table: platformDevice                                        */
/*==============================================================*/
create table platformDevice
(
   platformDeviceId     bigint not null auto_increment,
   platformDeviceName   varchar(255),
   platformDeviceGuid   varchar(255),
   status               bigint comment '0=non active
            1=active',
   platformDeviceTypeId bigint,
   createdBy            varchar(255),
   updatedBy            varchar(255),
   isShared             bit default 0 comment '0=no
            1=yes',
   primary key (platformDeviceId)
);

alter table platformDevice add constraint FK_Reference_7 foreign key (platformDeviceTypeId)
      references platformDeviceType (platformDeviceTypeId) on delete restrict on update restrict;





/*==============================================================*/
/* Table: bizOpUserRole                                         */
/*==============================================================*/
create table bizOpUserRole
(
   bizOpUserRoleId      bigint not null auto_increment,
   bizOpUserRoleName    varchar(255),
   bizOpUserRoleGuid    varchar(255),
   status               bigint comment '0=non active
            1=active',
   createdBy            varchar(255),
   updatedBy            varchar(255),
   isShared             bit default 0 comment '0=no
            1=yes',
   primary key (bizOpUserRoleId)
);




/*==============================================================*/
/* Table: usingObject                                           */
/*==============================================================*/
create table usingObject
(
   usingObjId           bigint not null,
   usingObjGuid         varchar(255),
   r_platformDeviceId   bigint,
   r_bizOpUserRoleId    bigint,
   r_opImpDevLangId     bigint,
   createTime           datetime,
   updateTime           timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   status               int comment '0=non active
            1=active',
   createdBy            varchar(255),
   updatedBy            varchar(255),
   isShared             bit default 0 comment '0=no
            1=yes',
   primary key (usingObjId)
);

alter table usingObject comment 'A fresh type of boy lang under boy platform which will be us';

alter table usingObject add constraint FK_Reference_10 foreign key (r_platformDeviceId)
      references platformDevice (platformDeviceId) on delete restrict on update restrict;

alter table usingObject add constraint FK_Reference_8 foreign key (r_opImpDevLangId)
      references opDevLang (opImpDevLangId) on delete restrict on update restrict;

alter table usingObject add constraint FK_Reference_9 foreign key (r_bizOpUserRoleId)
      references bizOpUserRole (bizOpUserRoleId) on delete restrict on update restrict;


/*==============================================================*/
/* Table: opExchangeStatus                                      */
/*==============================================================*/
create table opExchangeStatus
(
   opExchangeStatusID   bigint not null auto_increment,
   opExchangeStatusName varchar(255),
   opExchangeType       bigint,
   pendingOpUserRoleId  bigint,
   opExchangeStatusGuid varchar(255),
   r_opExchangeFeatureFieldModuleId bigint,
   createdBy            varchar(255),
   updatedBy            varchar(255),
   isShared             bit default 0 comment '0=no
            1=yes',
   primary key (opExchangeStatusID)
);

alter table opExchangeStatus comment 'op causal node table';

alter table opExchangeStatus add constraint FK_Reference_5 foreign key (r_opExchangeFeatureFieldModuleId)
      references opExchangeFeatureFieldModules (opExchangeFeatureFieldModuleId) on delete restrict on update restrict;

alter table opExchangeStatus add constraint FK_Reference_6 foreign key (pendingOpUserRoleId)
      references bizOpUserRole (bizOpUserRoleId) on delete restrict on update restrict;
	  
	  
	 


/*==============================================================*/
/* Table: CauseEffectContext                                    */
/*==============================================================*/
create table CauseEffectContext
(
   CauseEffectContextId bigint not null auto_increment,
   r_opExchangeFeatureFieldModuleId bigint,
   CauseEffectContextGuid varchar(255),
   r_platformActionId   bigint,
   r_platformActionName text,
   r_platformActionGuid varchar(255),
   r_currentOpStatusId  bigint,
   r_afterOpStatusId    bigint,
   r_usingObjId         bigint,
   status               bigint comment '0=non actvie
            1=active',
   createdBy            varchar(255),
   updatedBy            varchar(255),
   isShared             bit default 0 comment '0=no
            1=yes',
   menuRouteUrl         varchar(255),
   primary key (CauseEffectContextId)
);

alter table CauseEffectContext comment 'Descript the cause-effect context for entire platform.';

alter table CauseEffectContext add constraint FK_Reference_12 foreign key (r_platformActionId)
      references platformActionList (platformActionId) on delete restrict on update restrict;

alter table CauseEffectContext add constraint FK_Reference_13 foreign key (r_usingObjId)
      references usingObject (usingObjId) on delete restrict on update restrict;

alter table CauseEffectContext add constraint FK_Reference_14 foreign key (r_currentOpStatusId)
      references opExchangeStatus (opExchangeStatusID) on delete restrict on update restrict;

alter table CauseEffectContext add constraint FK_Reference_15 foreign key (r_afterOpStatusId)
      references opExchangeStatus (opExchangeStatusID) on delete restrict on update restrict;


