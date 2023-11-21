'use strict';

/*imports*/
const { Routines } = require('../models/Routines');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Routines.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Routines.name.toUpperCase());
  }
};