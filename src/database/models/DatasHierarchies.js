'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Contexts } = require("./Contexts");
const { DataTables } = require("./DataTables");

/**
 * class model
 */
class DatasHierarchies extends BaseTableModel {
  static ID = 1010;
  static #model = null;
  static fields = {
    ...DatasHierarchies.getBaseTableModelFields(),...{           
      IDTABLEPARENT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDTABLESUBORDINATED:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDPARENT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDSUBORDINATED:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDCONTEXT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      ORDERNUM:{
        type: DataTypes.BIGINT
      },
      STARTMOMENT:{
        type: DataTypes.DATE
      },
      ENDMOMENT:{
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [
    'IDTABLEPARENT',
    'IDTABLESUBORDINATED',
    'IDPARENT',
    'IDSUBORDINATED',
    'IDCONTEXT',
    'STARTMOMENT'
  ];

  static constraints = [...(DatasHierarchies.getCconstraints() || []),...[
    {
      name: DatasHierarchies.name.toUpperCase() + '_U1',
      fields: [...DatasHierarchies.getBaseTableModelUniqueFields(),...DatasHierarchies.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(DatasHierarchies.getBaseTableModelForeignsKeys() || []),...[
    {
      fields: ['IDTABLEPARENT'],
      type: 'foreign key',
      references: { 
          table: DataTables,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDTABLESUBORDINATED'],
      type: 'foreign key',
      references: { 
          table: DataTables,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDCONTEXT'],
      type: 'foreign key',
      references: { 
          table: Contexts,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
  static getModel(pSequelize) {
    if (DatasHierarchies.#model == null) {
      DatasHierarchies.#model = DatasHierarchies.initModel(pSequelize);
    }
    return DatasHierarchies.#model;
  }
  
  static initAssociations() {
      DatasHierarchies.associates();
  }  
};

module.exports = {DatasHierarchies};
 