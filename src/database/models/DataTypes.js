'use strict';

/*imports*/
const { DataTypes: DataTypesSeq } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class DataTypes extends BaseTableModel {
  static ID = 50;
  static #model = null;
  static fields = {
    ...DataTypes.getBaseTableModelFields(),...{
      NAME: {
        type: DataTypesSeq.STRING(256),
        allowNull: false
      },
      DESCRIPTION: {
        type: DataTypesSeq.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(DataTypes.getCconstraints() || []),...[
    {
      name: DataTypes.name.toUpperCase() + '_U1',
      fields: [...DataTypes.getBaseTableModelUniqueFields(),...DataTypes.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = DataTypes.getBaseTableModelForeignsKeys();
  
  static getModel(pSequelize) {
    if (DataTypes.#model == null) {
      DataTypes.#model = DataTypes.initModel(pSequelize);
    }
    return DataTypes.#model;
  }
  
  static initAssociations() {
      DataTypes.associates();
  }
  
};


module.exports = {DataTypes};
 