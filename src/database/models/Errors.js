'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

/**
 * class model
 */
class Errors extends BaseTableModel {
  static #model = null;
  static fields = {
    OBJECTTYPE: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    OBJECTNAME: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    LINE: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CODE: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    MESSAGE: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    DATA: {
      type: DataTypes.STRING(2000),
      allowNull: true
    }
  };
  static constraints = [];

  static getModel(pSequelize) {
    if (Errors.#model == null) {
      Errors.#model = Errors.initModel(pSequelize);
    }
    return Errors.#model;
  }

  static initAssociations() {
    Errors.associates();
  }  
};


module.exports = {Errors};
 