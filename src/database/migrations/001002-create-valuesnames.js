'use strict';

/*imports*/
const { ValuesNames } = require('../models/ValuesNames');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ValuesNames.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ValuesNames.name.toUpperCase());
  }
};