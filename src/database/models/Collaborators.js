'use strict';

/*imports*/
const { BasePeopleModel } = require("./BasePeopleModel");

/**
 * class model
 */
class Collaborators extends BasePeopleModel {
  static ID = 110;
  static #model = null;

  static SYSTEM = 1;
  
  static fields = {
    ...(Collaborators.getBaseTableModelFields() || {})
  };
  
  static uniqueFields = [];

  static constraints = [...(Collaborators.getCconstraints() || []),...[
    {
      name: Collaborators.name.toUpperCase() + '_U1',
      fields: [...Collaborators.getBaseTableModelUniqueFields(),...Collaborators.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(Collaborators.getBaseTableModelForeignsKeys() || [])];
  
  static getModel(pSequelize) {
    if (Collaborators.#model == null) {
      Collaborators.#model = Collaborators.initModel(pSequelize);
    }
    return Collaborators.#model;
  }
  
  static initAssociations() {
      Collaborators.associates();
  }
 
};


module.exports = {Collaborators};
 