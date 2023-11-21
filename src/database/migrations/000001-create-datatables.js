'use strict';

/*imports*/
const { DataTables } = require('../models/DataTables');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await DataTables.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});          
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DataTables.name.toUpperCase());
  }
};