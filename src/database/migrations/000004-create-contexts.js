'use strict';

/*imports*/
const { Contexts } = require('../models/Contexts');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Contexts.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});                 
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Contexts.name.toUpperCase());
  }
};