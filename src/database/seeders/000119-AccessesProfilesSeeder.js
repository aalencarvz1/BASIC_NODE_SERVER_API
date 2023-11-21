'use strict';

const { AccessesProfiles } = require('../models/AccessesProfiles');
const { OriginsDatas }  = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(AccessesProfiles.name.toUpperCase(),[{      
      ID:AccessesProfiles.DEFAULT,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME:'DEFAULT',
      ALLOWACESSALLROUTINESOFMODULE:1
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    }); 
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(AccessesProfiles.name.toUpperCase(), null, {});
  }
};
