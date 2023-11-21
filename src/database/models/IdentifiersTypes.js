'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class IdentifiersTypes extends BaseTableModel {
  static ID = 70;
  static #model = null;

  static IDENTIFIER = 1;
  static CODE = 2;
  static CNPJ = 3;
  static CPF = 4;
  static CHAVENFE = 5;
  static GTIN = 10;
  static GTINTYPE = 11;
  static PACKAGING = 8001;
  static SUPPLIER = 5000; 
  static VALUE = 20;
  static WINTHORCODE = 30;
  static WINTHORCODEFAB = 31;
  
  static fields = {
    ...IdentifiersTypes.getBaseTableModelFields(),...{
      NAME: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      },
      PROCESSTOVALIDATE: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(IdentifiersTypes.getCconstraints() || []),...[
    {
      name: IdentifiersTypes.name.toUpperCase() + '_U1',
      fields: [...IdentifiersTypes.getBaseTableModelUniqueFields(),...IdentifiersTypes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = IdentifiersTypes.getBaseTableModelForeignsKeys();
  
  static getModel(pSequelize) {
    if (IdentifiersTypes.#model == null) {
      IdentifiersTypes.#model = IdentifiersTypes.initModel(pSequelize);
    }
    return IdentifiersTypes.#model;
  }
  
  static initAssociations() {
      IdentifiersTypes.associates();
  }


  
};


module.exports = {IdentifiersTypes};
 