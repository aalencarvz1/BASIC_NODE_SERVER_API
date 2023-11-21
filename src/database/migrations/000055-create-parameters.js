'use strict';

/*imports*/
const { Parameters } = require('../models/Parameters');
const { DataTypes } = require('../models/DataTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Parameters.runUpMigration(queryInterface,{migrateForeignKeyContraint:false}); 
    await Parameters.migrateForeignKeyContraint(queryInterface,DataTypes);  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Parameters.name.toUpperCase());
  }
};