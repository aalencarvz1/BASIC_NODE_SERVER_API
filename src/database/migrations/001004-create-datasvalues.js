'use strict';

/*imports*/
const { DatasValues } = require('../models/DatasValues');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await DatasValues.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DatasValues.name.toUpperCase());
  }
};