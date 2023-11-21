'use strict';

/*imports*/
const { DataRelationshipTypes } = require('../models/DataRelationshipTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await DataRelationshipTypes.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DataRelationshipTypes.name.toUpperCase());
  }
};