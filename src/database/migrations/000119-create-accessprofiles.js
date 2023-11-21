'use strict';

/*imports*/
const { AccessesProfiles } = require('../models/AccessesProfiles');
const { OriginsDatas }  = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await AccessesProfiles.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});

    await queryInterface.bulkInsert(AccessesProfiles.name.toUpperCase(),[{      
      ID:AccessesProfiles.SYSTEM,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME:'SYSTEM',
      ALLOWACESSALLROUTINESOFMODULE:1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    }); 

    await AccessesProfiles.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await AccessesProfiles.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(AccessesProfiles.name.toUpperCase());
  }
};