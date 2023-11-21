'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { RoutinesTypes } = require("./RoutinesTypes");
const { Modules } = require("./Modules");

/**
 * class model
 */
class Routines extends BaseTableModel {
  static ID = 240;
  static #model = null;
  static fields = {
    ...Routines.getBaseTableModelFields(),...{     
      IDSUP: {
        type: DataTypes.BIGINT.UNSIGNED
      }, 
      IDROUTINETYPE: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDMODULE: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      }, 
      NAME: {
        type: DataTypes.STRING(256),
        allowNull:false
      }, 
      ICON: {
        type: DataTypes.TEXT
      }, 
      VIEWPATH: {
        type: DataTypes.STRING(2000)
      },     
      DESCRIPTION: {
        type: DataTypes.TEXT
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

  static constraints = [...(Routines.getCconstraints() || []),...[
    {
      name: Routines.name.toUpperCase() + '_U1',
      fields: Routines.uniqueFields,
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(Routines.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDSUP'],
      type: 'foreign key',
      references: { 
          table: Routines,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDROUTINETYPE'],
      type: 'foreign key',
      references: { 
          table: RoutinesTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDMODULE'],
      type: 'foreign key',
      references: { 
          table: Modules,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
  static getModel(pSequelize) {
    if (Routines.#model == null) {
      Routines.#model = Routines.initModel(pSequelize);
    }
    return Routines.#model;
  }
  
  static initAssociations() {
      Routines.associates();
  }  

  
};

module.exports = {Routines};
 