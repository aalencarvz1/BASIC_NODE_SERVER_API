'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class DataConnections extends BaseTableModel {
  static ID = 2;
  static #model = null;
  static fields = {
    ...DataConnections.getBaseTableModelFields(),...{
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

  static constraints = [...(DataConnections.getCconstraints() || []),...[
    {
      name: DataConnections.name.toUpperCase() + '_U1',
      fields: [...DataConnections.getBaseTableModelUniqueFields(),...DataConnections.uniqueFields],
      type:"unique"
    },{
      name: DataConnections.name.toUpperCase() + '_C_1',
      fields:['ISDEFAULT'],
      type:"check",
      where:{
        ISDEFAULT: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }

  ]];

  static foreignsKeys = DataConnections.getBaseTableModelForeignsKeys();
  
  static getModel(pSequelize) {
    if (DataConnections.#model == null) {
      DataConnections.#model = DataConnections.initModel(pSequelize);
    }
    return DataConnections.#model;
  }
  
  static initAssociations() {
      DataConnections.associates();
  }  
};


module.exports = {DataConnections};
 