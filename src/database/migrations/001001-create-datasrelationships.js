'use strict';

/*imports*/
const { DatasRelationships } = require('../models/DatasRelationships');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await DatasRelationships.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DatasRelationships.name.toUpperCase());
  }
};