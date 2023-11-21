'use strict';

/*imports*/
const { People } = require('../models/People');
const { OriginsDatas }  = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { IdentifiersTypes } = require('../models/IdentifiersTypes');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await People.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});         
    
    await queryInterface.bulkInsert(People.name.toUpperCase(),[{      
      ID:People.SYSTEM,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDIDENTIFIERDOCTYPE : IdentifiersTypes.CODE,
      IDENTIFIERDOC: People.SYSTEM,
      NAME : 'SYSTEM'
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    }); 
    
    await People.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await People.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
    await People.migrateForeignKeyContraint(queryInterface,IdentifiersTypes);  
        
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(People.name.toUpperCase());
  }
};