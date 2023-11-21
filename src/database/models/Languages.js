'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Languages extends BaseTableModel {
  static ID = 248;
  static #model = null;
  static fields = {
    ...Languages.getBaseTableModelFields(),...{     
      NAME: {
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [ 
    'NAME'
  ];

  static constraints = [...(Languages.getCconstraints() || []),...[
    {
      name: Languages.name.toUpperCase() + '_U1',
      fields: Languages.uniqueFields,
      type:"unique"
    }
  ]];

  static foreignsKeys = Languages.getBaseTableModelForeignsKeys();
  
  static getModel(pSequelize) {
    if (Languages.#model == null) {
      Languages.#model = Languages.initModel(pSequelize);
    }
    return Languages.#model;
  }
  
  static initAssociations() {
      Languages.associates();
  }  
};

module.exports = {Languages};
 