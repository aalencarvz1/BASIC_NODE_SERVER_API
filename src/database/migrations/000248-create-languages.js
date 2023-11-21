'use strict';

/*imports*/
const { Languages } = require('../models/Languages');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Languages.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Languages.name.toUpperCase());
  }
};