'use strict';

/*imports*/
require('dotenv').config({ path: __dirname + "/../../../.env" });
const { DataSchemas } = require('../models/DataSchemas');
const { DataTables } = require('../models/DataTables');
const configDB  = require("../config/config.js");
const { OriginsDatas }  = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await DataSchemas.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});           
    await queryInterface.bulkInsert(DataSchemas.name.toUpperCase(),[{      
      ID:configDB[process.env.NODE_ENV].ID,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : configDB[process.env.NODE_ENV].database,
      ISDEFAULT : 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
    await DataTables.migrateForeignKeyContraint(queryInterface,DataSchemas);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DataSchemas.name.toUpperCase());
  }
};