'use strict';

/*imports*/
const { RoutinesTypes } = require('../models/RoutinesTypes');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await RoutinesTypes.runUpMigration(queryInterface);             
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(RoutinesTypes.name.toUpperCase());
  }
};