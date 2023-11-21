'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class OriginsDatas extends BaseTableModel {
  static ID = 60;
  static #model = null;

  static DEFAULT_ORIGINDATA = 1;
  static WINTHOR = 2;
  static AURORA = 3;
  static APP_COLLECTOR = 1001;

  static fields = {
    ...OriginsDatas.getBaseTableModelFields(),...{
      NAME: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(OriginsDatas.getCconstraints() || []),...[
    {
      name: OriginsDatas.name.toUpperCase() + '_U1',
      fields: [...OriginsDatas.getBaseTableModelUniqueFields(),...OriginsDatas.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = OriginsDatas.getBaseTableModelForeignsKeys();
  
  static getModel(pSequelize) {
    if (OriginsDatas.#model == null) {
      OriginsDatas.#model = OriginsDatas.initModel(pSequelize);
    }
    return OriginsDatas.#model;
  }
  
  static initAssociations() {
      OriginsDatas.associates();
  }
  
};


module.exports = { OriginsDatas };
 