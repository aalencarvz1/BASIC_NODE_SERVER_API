'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class PowersTypes extends BaseTableModel {
  static ID = 7002;
  static #model = null;

  static SYSTEM = 1;
  static ACCESS = 2;

  static fields = {
    ...PowersTypes.getBaseTableModelFields(),...{           
      NAME:{
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

  static constraints = [...(PowersTypes.getCconstraints() || []),...[
    {
      name: PowersTypes.name.toUpperCase() + '_U1',
      fields: [...PowersTypes.getBaseTableModelUniqueFields(),...PowersTypes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(PowersTypes.getBaseTableModelForeignsKeys()||[]),...[]];
  
  static getModel(pSequelize) {
    if (PowersTypes.#model == null) {
      PowersTypes.#model = PowersTypes.initModel(pSequelize);
    }
    return PowersTypes.#model;
  }
  
  static initAssociations() {
      PowersTypes.associates();
  }  
};

module.exports = {PowersTypes};
 