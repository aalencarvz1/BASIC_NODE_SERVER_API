'use strict';

/*imports*/
const { Modules } = require('../models/Modules');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Modules.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Modules.name.toUpperCase());
  }
};