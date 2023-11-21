'use strict';

/*imports*/
const { BasePeopleModel } = require("./BasePeopleModel");

/**
 * class model
 */
class Clients extends BasePeopleModel {
  static ID = 4000;

  static ANONYMOUS = 1; //to use as anonymous clients
  
  static #model = null;

  static fields = {
    ...(Clients.getBaseTableModelFields() || {})
  };
  
  static uniqueFields = [];

  static constraints = [...(Clients.getCconstraints() || []),...[
    {
      name: Clients.name.toUpperCase() + '_U1',
      fields: [...Clients.getBaseTableModelUniqueFields(),...Clients.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(Clients.getBaseTableModelForeignsKeys() || [])];
  
  static getModel(pSequelize) {
    if (Clients.#model == null) {
      Clients.#model = Clients.initModel(pSequelize);
    }
    return Clients.#model;
  }
  
  static initAssociations() {
      Clients.associates();
  }  

};

module.exports = {Clients};
 