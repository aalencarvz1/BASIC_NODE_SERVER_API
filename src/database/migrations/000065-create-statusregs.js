'use strict';

/*imports*/
const { StatusRegs } = require('../models/StatusRegs');
const { DataTables } = require('../models/DataTables');
const { DataTypes } = require('../models/DataTypes');
const { Parameters } = require('../models/Parameters');
const { DataConnections } = require('../models/DataConnections');
const { DataSchemas } = require('../models/DataSchemas');
const { Contexts } = require('../models/Contexts');
const { ParametersValues } = require('../models/ParametersValues');
const { OriginsDatas }  = require('../models/OriginsDatas');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await StatusRegs.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});         

    await queryInterface.bulkInsert(StatusRegs.name.toUpperCase(),[{
      ID: StatusRegs.ACTIVE,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : 'ACTIVE',
      ISACTIVE:1      
    },{
      ID: StatusRegs.INACTIVE,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : 'INACTIVE',
      ISACTIVE:1     
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });    

    
    await DataTables.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await DataConnections.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await DataSchemas.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await Contexts.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await DataTypes.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await Parameters.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await ParametersValues.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await OriginsDatas.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await StatusRegs.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await StatusRegs.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(StatusRegs.name.toUpperCase());
  }
};