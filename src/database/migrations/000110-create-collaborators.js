'use strict';

/*imports*/
const { Collaborators } = require('../models/Collaborators');
const { OriginsDatas }  = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { People } = require('../models/People');
const { Users } = require('../models/Users');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Collaborators.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});          
    
    await queryInterface.bulkInsert(Collaborators.name.toUpperCase(),[{      
      ID:Collaborators.SYSTEM,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,
      IDPEOPLE : People.SYSTEM
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    }); 
    
    await Collaborators.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await Collaborators.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
    await Collaborators.migrateForeignKeyContraint(queryInterface,People);  
        
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Collaborators.name.toUpperCase());
  }
};