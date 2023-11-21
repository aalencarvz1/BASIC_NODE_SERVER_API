'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class DataSchemas extends BaseTableModel {
  static ID = 3;
  static #model = null;
  static fields = {
    ...DataSchemas.getBaseTableModelFields(),...{
      NAME: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      },
      ISDEFAULT: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(DataSchemas.getCconstraints() || []),...[
    {
      name: DataSchemas.name.toUpperCase() + '_U1',
      fields: [...DataSchemas.getBaseTableModelUniqueFields(),...DataSchemas.uniqueFields],
      type:"unique"
    },{
      name: DataSchemas.name.toUpperCase() + '_C_1',
      fields:['ISDEFAULT'],
      type:"check",
      where:{
        ISDEFAULT: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }

  ]];

  static foreignsKeys = DataSchemas.getBaseTableModelForeignsKeys();
  
  static getModel(pSequelize) {
    if (DataSchemas.#model == null) {
      DataSchemas.#model = DataSchemas.initModel(pSequelize);
    }
    return DataSchemas.#model;
  }
  
  static initAssociations() {
      DataSchemas.associates();
  }
  
};


module.exports = {DataSchemas};
 