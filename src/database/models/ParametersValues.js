'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Parameters } = require("./Parameters");

/**
 * class model
 */
class ParametersValues extends BaseTableModel {
  static ID = 56;
  static #model = null;
  static fields = {
    ...ParametersValues.getBaseTableModelFields(),...{
      IDPARAMETER: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull : false,
      },
      VALUE: {
        type: DataTypes.STRING(256)
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDPARAMETER',
    'VALUE'
  ];

  static constraints = [...(ParametersValues.getCconstraints() || []),...[
    {
      name: ParametersValues.name.toUpperCase() + '_U1',
      fields: [...ParametersValues.getBaseTableModelUniqueFields(),...ParametersValues.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(ParametersValues.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDPARAMETER'],
      type: 'foreign key',
      references: { 
          table: Parameters,
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
  static getModel(pSequelize) {
    if (ParametersValues.#model == null) {
      ParametersValues.#model = ParametersValues.initModel(pSequelize);
    }
    return ParametersValues.#model;
  }
  
  static initAssociations() {
      ParametersValues.associates();
  }
  
};


module.exports = {ParametersValues};
 