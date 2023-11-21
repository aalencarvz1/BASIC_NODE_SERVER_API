'use strict';

/*imports*/
const { Permissions } = require('../models/Permissions');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Permissions.runUpMigration(queryInterface);  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Permissions.name.toUpperCase());
  }
};