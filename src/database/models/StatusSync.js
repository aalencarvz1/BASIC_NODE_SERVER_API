'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class StatusSync extends BaseTableModel {
  static ID = 66;
  static #model = null;
  static fields = {
    ...StatusSync.getBaseTableModelFields(),...{
      NAME: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      SYNCRONIZED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(StatusSync.getCconstraints() || []),...[
    {
      name: StatusSync.name.toUpperCase() + '_U1',
      fields: [...StatusSync.getBaseTableModelUniqueFields(),...StatusSync.uniqueFields],
      type:"unique"
    },{
      name: StatusSync.name.toUpperCase() + '_C_1',
      fields:['SYNCRONIZED'],
      type:"check",
      where:{
        SYNCRONIZED: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = StatusSync.getBaseTableModelForeignsKeys();
  
  static getModel(pSequelize) {
    if (StatusSync.#model == null) {
      StatusSync.#model = StatusSync.initModel(pSequelize);
    }
    return StatusSync.#model;
  }
  
  static initAssociations() {
      StatusSync.associates();
  }
  
};


module.exports = {StatusSync};
 