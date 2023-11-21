'use strict';

const { OriginsDatas }  = require('../models/OriginsDatas');
/*imports*/
const { PowersTypes } = require('../models/PowersTypes');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await PowersTypes.runUpMigration(queryInterface);     

    await queryInterface.bulkInsert(PowersTypes.name.toUpperCase(),[{      
      ID:PowersTypes.SYSTEM,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME:'SYSTEM'
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });     

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(PowersTypes.name.toUpperCase());
  }
};