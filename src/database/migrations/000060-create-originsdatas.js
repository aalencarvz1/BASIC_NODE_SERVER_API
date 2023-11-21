'use strict';

/*imports*/
const { OriginsDatas }  = require('../models/OriginsDatas');
const { DataTables } = require('../models/DataTables');
const { DataTypes } = require('../models/DataTypes');
const { Parameters } = require('../models/Parameters');
const { DataConnections } = require('../models/DataConnections');
const { DataSchemas } = require('../models/DataSchemas');
const { Contexts } = require('../models/Contexts');
const { ParametersValues } = require('../models/ParametersValues');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await OriginsDatas.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});       

    await queryInterface.bulkInsert(OriginsDatas.name.toUpperCase(),[{
      ID: OriginsDatas.DEFAULT_ORIGINDATA,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : 'DEFAULT_ORIGINDATA'      
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });    

    
    await DataTables.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
    await DataConnections.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
    await DataSchemas.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
    await Contexts.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
    await DataTypes.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
    await Parameters.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
    await ParametersValues.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
    await OriginsDatas.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(OriginsDatas.name.toUpperCase());
  }
};