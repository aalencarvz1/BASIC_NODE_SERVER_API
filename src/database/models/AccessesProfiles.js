'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

/**
 * class model
 */
class AccessesProfiles extends BaseTableModel {
  static ID = 119;
  static #model = null;

  static SYSTEM = 1;
  static DEFAULT = 2;

  static fields = {
    ...AccessesProfiles.getBaseTableModelFields(),...{           
      NAME:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      },
      ALLOWACESSALLROUTINESOFMODULE: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];  

  static constraints = [...(AccessesProfiles.getCconstraints() || []),...[
    {
      name: AccessesProfiles.name.toUpperCase() + '_U1',
      fields: [...AccessesProfiles.getBaseTableModelUniqueFields(),...AccessesProfiles.uniqueFields],
      type:"unique"
    },{
      name: AccessesProfiles.name.toUpperCase() + '_C_1',
      fields:['ALLOWACESSALLROUTINESOFMODULE'],
      type:"check",
      where:{
        ALLOWACESSALLROUTINESOFMODULE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(AccessesProfiles.getBaseTableModelForeignsKeys()||[]),...[]];  
  
  static getModel(pSequelize) {
    if (AccessesProfiles.#model == null) {
      AccessesProfiles.#model = AccessesProfiles.initModel(pSequelize);
    }
    return AccessesProfiles.#model;
  }

  static initAssociations() {
      AccessesProfiles.associates();
  }  
};

module.exports = {AccessesProfiles};
 