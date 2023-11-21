'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { ValuesNames } = require("./ValuesNames");
const { DataTables } = require("./DataTables");
const { Contexts } = require("./Contexts");

/**
 * class model
 */
class DatasValues extends BaseTableModel {
  static ID = 1004;
  static #model = null;
  static fields = {
    ...DatasValues.getBaseTableModelFields(),...{     
      IDTABLE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      IDREG:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      IDVALUENAME:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },      
      IDCONTEXT:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      VALUE:{
        type: DataTypes.STRING(256)
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
    'IDTABLE',
    'IDREG',
    'IDVALUENAME',
    'IDCONTEXT',
    'VALUE',
    'ORDERNUM',
    'STARTMOMENT'
  ];

  static constraints = [...(DatasValues.getCconstraints() || []),...[
    {
      name: DatasValues.name.toUpperCase() + '_U1',
      fields: [...DatasValues.getBaseTableModelUniqueFields(),...DatasValues.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(DatasValues.getBaseTableModelForeignsKeys() || []),...[
    {
      fields: ['IDTABLE'],
      type: 'foreign key',
      references: { 
          table: DataTables,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDVALUENAME'],
      type: 'foreign key',
      references: { 
          table: ValuesNames,
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
    if (DatasValues.#model == null) {
      DatasValues.#model = DatasValues.initModel(pSequelize);
    }
    return DatasValues.#model;
  }
  
  static initAssociations() {
      DatasValues.associates();
  }  
};

module.exports = {DatasValues};
 