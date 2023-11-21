'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { DatasRelationships } = require("./DatasRelationships");
const { Contexts } = require("./Contexts");
const { DataTypes : DataTypesModel } = require("./DataTypes");
const { IdentifiersTypes } = require("./IdentifiersTypes");

/**
 * class model
 */
class DatasRelationshipsValues extends BaseTableModel {
  static ID = 1003;
  static #model = null;
  static fields = {
    ...DatasRelationshipsValues.getBaseTableModelFields(),...{           
      IDDATARELATIONSHIP:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDCONTEXT:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDIDENTIFIERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDDATATYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
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
    'IDDATARELATIONSHIP',
    'IDCONTEXT',
    'IDIDENTIFIERTYPE',
    'IDDATATYPE',
    'VALUE',
    'ORDERNUM',
    'STARTMOMENT'
  ];

  static constraints = [...(DatasRelationshipsValues.getCconstraints() || []),...[
    {
      name: DatasRelationshipsValues.name.toUpperCase() + '_U1',
      fields: [...DatasRelationshipsValues.getBaseTableModelUniqueFields(),...DatasRelationshipsValues.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(DatasRelationshipsValues.getBaseTableModelForeignsKeys() || []),...[
    {
      fields: ['IDDATARELATIONSHIP'],
      type: 'foreign key',
      references: { 
          table: DatasRelationships,
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
    },{
      fields: ['IDIDENTIFIERTYPE'],
      type: 'foreign key',
      references: { 
          table: IdentifiersTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDDATATYPE'],
      type: 'foreign key',
      references: { 
          table: DataTypesModel,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }

  ]];
  
  static getModel(pSequelize) {
    if (DatasRelationshipsValues.#model == null) {
      DatasRelationshipsValues.#model = DatasRelationshipsValues.initModel(pSequelize);
    }
    return DatasRelationshipsValues.#model;
  }
  
  static initAssociations() {
      DatasRelationshipsValues.associates();
  }  
};

module.exports = {DatasRelationshipsValues};
 