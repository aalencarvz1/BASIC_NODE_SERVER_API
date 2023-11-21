'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Users } = require("./Users");
/**
 * class model
 */
class UsersTokens extends BaseTableModel {
  static ID = 121;
  static #model = null;

  
  static fields = {
    ...UsersTokens.getBaseTableModelFields(),...{
      IDUSER: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      TOKEN: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      EXPIREAT: {
        type: DataTypes.DATE
      },
      EXPIRED: {
        type: DataTypes.INTEGER(1),
        allowNull:false,
        defaultValue:0
      },
      DEVICEINFORMATION: {
        type: DataTypes.STRING(2000)
      },
      TIMEZONEOFFSET: {
        type: DataTypes.INTEGER
      }
    }
  };
  
  static uniqueFields = [    
    'IDUSER',
    'TOKEN',
    'EXPIRED'
  ];

  static constraints = [...(UsersTokens.getCconstraints() || []),...[
    {
      name: UsersTokens.name.toUpperCase() + '_U1',
      fields: UsersTokens.uniqueFields,
      type:"unique"
    },{
      name: UsersTokens.name.toUpperCase() + '_C_1',
      fields:['EXPIRED'],
      type:"check",
      where:{
        EXPIRED: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(UsersTokens.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDUSER'],
      type: 'foreign key',
      references: { 
          table: Users,
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
  static getModel(pSequelize) {
    if (UsersTokens.#model == null) {
      UsersTokens.#model = UsersTokens.initModel(pSequelize);
    }
    return UsersTokens.#model;
  }
  
  static initAssociations() {
      UsersTokens.associates();
  }  
}

module.exports = { UsersTokens };