'use strict';

const { RoutinesTypes } = require('../models/RoutinesTypes');
const { OriginsDatas }  = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(RoutinesTypes.name.toUpperCase(),[{      
      ID:RoutinesTypes.SYSTEM,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME:'SYSTEM'
    },{      
      ID:RoutinesTypes.REGISTER,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME:'REGISTER'
    },{      
      ID:RoutinesTypes.REPORT,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME:'REPORT'
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:['IDSTATUSREG','NAME']
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(RoutinesTypes.name.toUpperCase(), null, {});
  }
};
