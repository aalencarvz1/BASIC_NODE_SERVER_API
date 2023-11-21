'use strict';

/*imports*/
const { DataTypes : DataTypesSeq } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { DataTypes } = require("./DataTypes");

/**
 * class model
 */
class Parameters extends BaseTableModel {
  static ID = 55;
  static #model = null;
  static fields = {
    ...Parameters.getBaseTableModelFields(),...{
      IDDATATYPE: {
        type: DataTypesSeq.BIGINT.UNSIGNED,
        allowNull : false,
      },
      NAME: {
        type: DataTypesSeq.STRING(256),
        allowNull: false
      },
      DEFAULTVALUE: {
        type: DataTypesSeq.STRING(256)
      },
      DESCRIPTION: {
        type: DataTypesSeq.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(Parameters.getCconstraints() || []),...[
    {
      name: Parameters.name.toUpperCase() + '_U1',
      fields: [...Parameters.getBaseTableModelUniqueFields(),...Parameters.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(Parameters.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDDATATYPE'],
      type: 'foreign key',
      references: { 
          table: DataTypes,
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
  static getModel(pSequelize) {
    if (Parameters.#model == null) {
      Parameters.#model = Parameters.initModel(pSequelize);
    }
    return Parameters.#model;
  }
  
  static initAssociations() {
      Parameters.associates();
  }
  
};


module.exports = {Parameters};
 