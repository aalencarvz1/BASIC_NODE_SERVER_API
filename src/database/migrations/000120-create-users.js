'use strict';

/*imports*/
const bcrypt = require("bcrypt");
const { Users } = require('../models/Users');
const { DataTables } = require('../models/DataTables');
const { OriginsDatas }  = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { People } = require('../models/People');
const { Collaborators } = require('../models/Collaborators');
const { DataConnections } = require('../models/DataConnections');
const { DataSchemas } = require('../models/DataSchemas');
const { Contexts } = require('../models/Contexts');
const { DataTypes } = require('../models/DataTypes');
const { Parameters } = require('../models/Parameters');
const { ParametersValues } = require('../models/ParametersValues');
const { StatusSync } = require('../models/StatusSync');
const { IdentifiersTypes } = require('../models/IdentifiersTypes');
const { AccessesProfiles } = require('../models/AccessesProfiles');
const { AuthController } = require('../../controllers/auth/AuthController');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Users.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});           
    
    await queryInterface.bulkInsert(Users.name.toUpperCase(),[{      
      ID:Users.SYSTEM,
      IDSTATUSREG: StatusRegs.ACTIVE,
      IDUSERCREATE : Users.SYSTEM,
      CREATEDAT: new Date(),
      IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
      ISSYSTEMREG : 1,      
      IDPEOPLE : People.SYSTEM,
      IDACCESSPROFILE : AccessesProfiles.SYSTEM,
      EMAIL:'system@system',
      PASSWORD: bcrypt.hashSync('system',AuthController.getCryptSalt())
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });     

    await DataTables.migrateForeignKeyContraint(queryInterface,Users);  
    await DataConnections.migrateForeignKeyContraint(queryInterface,Users);  
    await DataSchemas.migrateForeignKeyContraint(queryInterface,Users);  
    await Contexts.migrateForeignKeyContraint(queryInterface,Users);  
    await DataTypes.migrateForeignKeyContraint(queryInterface,Users);  
    await Parameters.migrateForeignKeyContraint(queryInterface,Users);  
    await ParametersValues.migrateForeignKeyContraint(queryInterface,Users);  
    await OriginsDatas.migrateForeignKeyContraint(queryInterface,Users);  
    await StatusRegs.migrateForeignKeyContraint(queryInterface,Users);  
    await StatusSync.migrateForeignKeyContraint(queryInterface,Users);  
    await IdentifiersTypes.migrateForeignKeyContraint(queryInterface,Users);  
    await People.migrateForeignKeyContraint(queryInterface,Users);  
    await Collaborators.migrateForeignKeyContraint(queryInterface,Users);  
    await AccessesProfiles.migrateForeignKeyContraint(queryInterface,Users);  
    await Users.migrateForeignKeyContraint(queryInterface);  
        
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Users.name.toUpperCase());
  }
};