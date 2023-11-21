'use strict';

/*imports*/

require('dotenv').config({ path: __dirname + "/../../../.env" });
const { DataConnections } = require('../models/DataConnections');
const { DataTables } = require('../models/DataTables');
const configDB  = require("../config/config");
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  
  async up(queryInterface, Sequelize) {
    await DataConnections.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});          
    await queryInterface.bulkInsert(DataConnections.name.toUpperCase(),[{      
      ID:configDB[process.env.NODE_ENV].ID,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : process.env.NODE_ENV,
      ISDEFAULT : 1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
    await DataTables.migrateForeignKeyContraint(queryInterface,DataConnections);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DataConnections.name.toUpperCase());
  }
};