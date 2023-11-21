'use strict';

/*imports*/
const { IdentifiersTypes } = require('../models/IdentifiersTypes');
const { OriginsDatas }  = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await IdentifiersTypes.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                 
    
    await queryInterface.bulkInsert(IdentifiersTypes.name.toUpperCase(),[{      
      ID:IdentifiersTypes.CODE,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      NAME : 'CODE'
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });
    
    await IdentifiersTypes.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await IdentifiersTypes.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
        
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(IdentifiersTypes.name.toUpperCase());
  }
};