'use strict';

/*imports*/
const { UsersTokens } = require('../models/UsersTokens');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await UsersTokens.runUpMigration(queryInterface);           
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(UsersTokens.name.toUpperCase());
  }
};