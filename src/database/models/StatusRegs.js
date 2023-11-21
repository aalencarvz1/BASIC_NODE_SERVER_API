'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

/**
 * class model
 */
class StatusRegs extends BaseTableModel {
  static ID = 65;
  static #model = null;

  static ACTIVE = 1;
  static INACTIVE = 2;

  static fields = {
    ...StatusRegs.getBaseTableModelFields(),...{
      NAME: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      },
      ISACTIVE: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(StatusRegs.getCconstraints() || []),...[
    {
      name: StatusRegs.name.toUpperCase() + '_U1',
      fields: [...StatusRegs.getBaseTableModelUniqueFields(),...StatusRegs.uniqueFields],
      type:"unique"
    },{
      name: StatusRegs.name.toUpperCase() + '_C_1',
      fields:['ISACTIVE'],
      type:"check",
      where:{
        ISACTIVE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }

  ]];

  static foreignsKeys = StatusRegs.getBaseTableModelForeignsKeys();
  
  static getModel(pSequelize) {
    if (StatusRegs.#model == null) {
      StatusRegs.#model = StatusRegs.initModel(pSequelize);
    }
    return StatusRegs.#model;
  }
  
  static initAssociations() {
      StatusRegs.associates();
  }
  
};

module.exports = { StatusRegs };
 