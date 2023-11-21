'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const modulesJson = require("../catalogs/modules.json");

/**
 * class model
 */
class Modules extends BaseTableModel {
  static ID = 230;
  static #model = null;

  static WMS = modulesJson.find(el => el.NAME == "WMS")?.ID;

  static fields = {
    ...Modules.getBaseTableModelFields(),...{     
      IDSUP: {
        type: DataTypes.BIGINT.UNSIGNED
      }, 
      NAME: {
        type: DataTypes.STRING(256),
        allowNull:false
      }, 
      ICON: {
        type: DataTypes.TEXT
      }, 
      PATH: {
        type: DataTypes.STRING(2000)
      },           
      DESCRIPTION: {
        type: DataTypes.TEXT
      },
      VISUALMODULE: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 1 
      },
      VISUALORDER:{
        type: DataTypes.INTEGER
      }
    }
  };
  
  static uniqueFields = [ 
    'IDSUP',   
    'NAME'
  ];

  static constraints = [...(Modules.getCconstraints() || []),...[
    {
      name: Modules.name.toUpperCase() + '_U1',
      fields: Modules.uniqueFields,
      type:"unique"
    },{
      name: Modules.name.toUpperCase() + '_C_1',
      fields:['VISUALMODULE'],
      type:"check",
      where:{
        VISUALMODULE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(Modules.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDSUP'],
      type: 'foreign key',
      references: { 
          table: Modules,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
  static getModel(pSequelize) {
    if (Modules.#model == null) {
      Modules.#model = Modules.initModel(pSequelize);
    }
    return Modules.#model;
  }
  
  static initAssociations() {
      Modules.associates();
  }  
};

module.exports = {Modules};
 