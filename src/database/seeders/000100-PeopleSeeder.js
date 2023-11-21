'use strict';

const { IdentifiersTypes } = require('../models/IdentifiersTypes');
const { People } = require('../models/People');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert(People.name.toUpperCase(),[{      
      ID:People.SYSTEM,
      IDIDENTIFIERDOCTYPE: IdentifiersTypes.CNPJ,
      IDENTIFIERDOC : 1,
      NAME : 'SYSTEM'
    },{      
      ID:People.ANONYMOUS,
      IDIDENTIFIERDOCTYPE: IdentifiersTypes.CNPJ,
      IDENTIFIERDOC : 2,
      NAME : 'ANONYMOUS'
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(People.name.toUpperCase(), null, {});
  }
};
