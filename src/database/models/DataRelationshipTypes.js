'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class DataRelationshipTypes extends BaseTableModel {
  static ID = 1000;
  static #model = null;

  static RELATIONSHIP = 1;
  static IDENTIFIER = 2;

  static fields = {
    ...DataRelationshipTypes.getBaseTableModelFields(),...{     
      NAME:{
        type: DataTypes.STRING(256),
        allowNull: false
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(DataRelationshipTypes.getCconstraints() || []),...[
    {
      name: DataRelationshipTypes.name.toUpperCase() + '_U1',
      fields: [...DataRelationshipTypes.getBaseTableModelUniqueFields(),...DataRelationshipTypes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = DataRelationshipTypes.getBaseTableModelForeignsKeys();
  
  static getModel(pSequelize) {
    if (DataRelationshipTypes.#model == null) {
      DataRelationshipTypes.#model = DataRelationshipTypes.initModel(pSequelize);
    }
    return DataRelationshipTypes.#model;
  }
  
  static initAssociations() {
      DataRelationshipTypes.associates();
  }  
};

module.exports = {DataRelationshipTypes};
 