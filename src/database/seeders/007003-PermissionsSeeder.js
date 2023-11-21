'use strict';

const { Modules } = require('../models/Modules');
const { OriginsDatas }  = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
const { Permissions } = require('../models/Permissions');
const { PowersTypes } = require('../models/PowersTypes');
const { AccessesProfiles } = require('../models/AccessesProfiles');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(Permissions.name.toUpperCase(),[{      
      ID:Users.SYSTEM,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDPOWERTYPE: PowersTypes.SYSTEM,
      IDACCESSPROFILE: AccessesProfiles.SYSTEM,
      ALLOWED: 1,
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Permissions.name.toUpperCase(), null, {});
  }
};
