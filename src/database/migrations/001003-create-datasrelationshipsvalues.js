'use strict';

/*imports*/
const { DatasRelationshipsValues } = require('../models/DatasRelationshipsValues');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await DatasRelationshipsValues.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DatasRelationshipsValues.name.toUpperCase());
  }
};