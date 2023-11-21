'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class ValuesNames extends BaseTableModel {
  static ID = 1002;
  static #model = null;

  static INVOICENUM = 1;

  static fields = {
    ...ValuesNames.getBaseTableModelFields(),...{           
      NAME:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(ValuesNames.getCconstraints() || []),...[
    {
      name: ValuesNames.name.toUpperCase() + '_U1',
      fields: [...ValuesNames.getBaseTableModelUniqueFields(),...ValuesNames.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = ValuesNames.getBaseTableModelForeignsKeys();
  
  static getModel(pSequelize) {
    if (ValuesNames.#model == null) {
      ValuesNames.#model = ValuesNames.initModel(pSequelize);
    }
    return ValuesNames.#model;
  }
  
  static initAssociations() {
      ValuesNames.associates();
  }  
};

module.exports = {ValuesNames};
 