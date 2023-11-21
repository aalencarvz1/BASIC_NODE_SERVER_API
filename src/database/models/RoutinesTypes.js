'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class RoutinesTypes extends BaseTableModel {
  static ID = 210;
  static #model = null;

  static SYSTEM = 1;
  static REGISTER = 2;
  static REPORT = 3;

  static fields = {
    ...RoutinesTypes.getBaseTableModelFields(),...{      
      NAME: {
        type: DataTypes.STRING(256),
        allowNull:false
      },      
      DESCRIPTION: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [    
    'NAME'
  ];

  static constraints = [...(RoutinesTypes.getCconstraints() || []),...[
    {
      name: RoutinesTypes.name.toUpperCase() + '_U1',
      fields: RoutinesTypes.uniqueFields,
      type:"unique"
    }
  ]];

  static foreignsKeys = RoutinesTypes.getBaseTableModelForeignsKeys();
  
  static getModel(pSequelize) {
    if (RoutinesTypes.#model == null) {
      RoutinesTypes.#model = RoutinesTypes.initModel(pSequelize);
    }
    return RoutinesTypes.#model;
  }
  
  static initAssociations() {
      RoutinesTypes.associates();
  }  
};

module.exports = {RoutinesTypes};
 