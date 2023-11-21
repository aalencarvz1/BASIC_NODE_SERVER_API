'use strict';

/*imports*/
const { DataTypes } = require('../models/DataTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await DataTypes.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                       
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DataTypes.name.toUpperCase());
  }
};