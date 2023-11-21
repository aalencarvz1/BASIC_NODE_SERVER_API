'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Users } = require("./Users");
const { Contexts } = require("./Contexts");
const { Routines } = require("./Routines");
const { PowersTypes } = require("./PowersTypes");
const { AccessesProfiles } = require("./AccessesProfiles");
const { DataTables } = require("./DataTables");
const { Modules } = require("./Modules");

/**
 * class model
 */
class Permissions extends BaseTableModel {
  static ID = 7003;
  static #model = null;

  static SYSTEM = 1;

  static fields = {
    ...Permissions.getBaseTableModelFields(),...{           
      IDPOWERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDACCESSPROFILE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDUSER:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDCONTEXT:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDTABLE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDMODULE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDROUTINE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      STARTDATE:{
        type: DataTypes.DATE
      },
      ENDDATE:{
        type: DataTypes.DATE
      },
      ALLOWED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      }
    }
  };
  
  static uniqueFields = [
    'IDPOWERTYPE',
    'IDACCESSPROFILE',
    'IDUSER',
    'IDCONTEXT',
    'IDTABLE',
    'IDMODULE',
    'IDROUTINE',
    'STARTDATE'
  ];

  static constraints = [...(Permissions.getCconstraints() || []),...[
    {
      name: Permissions.name.toUpperCase() + '_U1',
      fields: [...Permissions.getBaseTableModelUniqueFields(),...Permissions.uniqueFields],
      type:"unique"
    },{
      name: Permissions.name.toUpperCase() + '_C_1',
      fields:['ALLOWED'],
      type:"check",
      where:{
        ALLOWED: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(Permissions.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDPOWERTYPE'],
      type: 'foreign key',
      references: { 
          table: PowersTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDACCESSPROFILE'],
      type: 'foreign key',
      references: { 
          table: AccessesProfiles,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDUSER'],
      type: 'foreign key',
      references: { 
          table: Users,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCONTEXT'],
      type: 'foreign key',
      references: { 
          table: Contexts,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDTABLE'],
      type: 'foreign key',
      references: { 
          table: DataTables,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDMODULE'],
      type: 'foreign key',
      references: { 
          table: Modules,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDROUTINE'],
      type: 'foreign key',
      references: { 
          table: Routines,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
  static getModel(pSequelize) {
    if (Permissions.#model == null) {
      Permissions.#model = Permissions.initModel(pSequelize);
    }
    return Permissions.#model;
  }
  
  static initAssociations() {
      Permissions.associates();
  }  
};

module.exports = {Permissions};
 