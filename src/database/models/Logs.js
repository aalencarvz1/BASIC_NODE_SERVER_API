'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

/**
 * class model
 */
class Logs extends BaseTableModel {
  static #model = null;
  static fields = {
    PROCESSNAME: {
      type: DataTypes.STRING(256),
      allowNull: true
    },    
    PROCESSVALUES: {
      type: DataTypes.STRING(2000),
      allowNull: true
    }
  };
  static constraints = [];

  static getModel(pSequelize) {
    if (Logs.#model == null) {
      Logs.#model = Logs.initModel(pSequelize);
    }
    return Logs.#model;
  }

  static initAssociations() {
    Logs.associates();
  }  
};


module.exports = {Logs};
 