'use strict';

/*imports*/
const { ParametersValues } = require('../models/ParametersValues');
const { Parameters } = require('../models/Parameters');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ParametersValues.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});    
    await ParametersValues.migrateForeignKeyContraint(queryInterface,Parameters);  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ParametersValues.name.toUpperCase());
  }
};