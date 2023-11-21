'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { DataRelationshipTypes } = require("./DataRelationshipTypes");
const { DataTables } = require("./DataTables");
const { Contexts } = require("./Contexts");
const { Utils } = require("../../helpers/Utils");

/**
 * class model
 */
class DatasRelationships extends BaseTableModel {
  static ID = 1001;
  static #model = null;
  static fields = {
    ...DatasRelationships.getBaseTableModelFields(),...{     
      IDRELATIONSHIPTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      IDTABLE1:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      IDTABLE2:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      IDREG1:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      IDREG2:{
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
    'IDRELATIONSHIPTYPE',
    'IDTABLE1',
    'IDTABLE2',
    'IDREG1',
    'IDREG2',
    'IDCONTEXT',
    'VALUE',
    'ORDERNUM',
    'STARTMOMENT'
  ];

  static constraints = [...(DatasRelationships.getCconstraints() || []),...[
    {
      name: DatasRelationships.name.toUpperCase() + '_U1',
      fields: [...DatasRelationships.getBaseTableModelUniqueFields(),...DatasRelationships.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(DatasRelationships.getBaseTableModelForeignsKeys() || []),...[
    {
      fields: ['IDRELATIONSHIPTYPE'],
      type: 'foreign key',
      references: { 
          table: DataRelationshipTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDTABLE1'],
      type: 'foreign key',
      references: { 
          table: DataTables,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDTABLE2'],
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
    if (DatasRelationships.#model == null) {
      DatasRelationships.#model = DatasRelationships.initModel(pSequelize);
    }
    return DatasRelationships.#model;
  }
  
  static initAssociations() {
      DatasRelationships.associates();
  } 
 

  static async createIfNotExistsAndRelationed(queryParams, newValues, queryParamsRelationshipCheck){
    let reg = await DatasRelationships.getModel().findOne(queryParams);
    if (!reg) {
      if (Utils.typeOf(queryParamsRelationshipCheck) !== 'array') {
        queryParamsRelationshipCheck = [queryParamsRelationshipCheck];
      }
      for(let key in queryParamsRelationshipCheck) {
        let relationed = await DatasRelationships.getModel().findOne(queryParamsRelationshipCheck[key]);
        if (!relationed) {
          throw new Error(`not has relationship with ${JSON.stringify(queryParamsRelationshipCheck[key])}`);
        }
      }       
      let options = {};
      if (queryParams.transaction) options.transaction = queryParams.transaction;
      let values = newValues || queryParams.where;
      reg = await DatasRelationships.getModel().create(values,options);
    }
    return reg;
  }


  static async createIfNotExists(queryParams, newValues){
    return await BaseTableModel.createIfNotExists.bind(DatasRelationships)(queryParams, newValues);
  }
  
};

module.exports = {DatasRelationships};
 