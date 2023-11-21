'use strict';

/*imports*/
const { DatasHierarchies } = require('../models/DatasHierarchies');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await DatasHierarchies.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DatasHierarchies.name.toUpperCase());
  }
};