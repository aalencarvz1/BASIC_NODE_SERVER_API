'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Contexts extends BaseTableModel {
  static ID = 4;
  static #model = null;
  static fields = {
    ...Contexts.getBaseTableModelFields(),...{
      NAME: {
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

  static constraints = [...(Contexts.getCconstraints() || []),...[
    {
      name: Contexts.name.toUpperCase() + '_U1',
      fields: [...Contexts.getBaseTableModelUniqueFields(),...Contexts.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = Contexts.getBaseTableModelForeignsKeys();
  
  static getModel(pSequelize) {
    if (Contexts.#model == null) {
      Contexts.#model = Contexts.initModel(pSequelize);
    }
    return Contexts.#model;
  }
  
  static initAssociations() {
      Contexts.associates();
  }
  
};


module.exports = {Contexts};
 