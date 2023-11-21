'use strict';

/*imports*/
const { Logs } = require('../models/Logs');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(Logs.name.toUpperCase(), Logs.fields);
    await Logs.migrateConstraints(queryInterface);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Logs.name.toUpperCase());
  }
};