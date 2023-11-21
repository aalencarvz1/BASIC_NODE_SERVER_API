'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { Collaborators } = require("./Collaborators");
const { AccessesProfiles } = require("./AccessesProfiles");
const { BasePeopleModel } = require("./BasePeopleModel");
/**
 * class model
 */
class Users extends BasePeopleModel {
  static ID = 120;
  static #model = null;

  static SYSTEM = 1;

  static fields = {
    ...(Users.getBaseTableModelFields() || {}),
    ...{ 
      IDPEOPLE:{
        type: DataTypes.BIGINT.UNSIGNED
      },          
      IDCOLLABORATOR: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDACCESSPROFILE: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull : false,
        defaultValue : AccessesProfiles.DEFAULT
      },
      EMAIL: {
        type: DataTypes.STRING(512),
        allowNull:false
      },
      PASSWORD: {
        type: DataTypes.STRING(1000),
        allowNull:false
      },
      LASTTOKEN:{
        type: DataTypes.STRING(1000)
      },
      LASTTIMEZONEOFFSET: {
        type: DataTypes.INTEGER
      }
    }
  };
  
  static uniqueFields = [    
    'EMAIL'
  ];

  static constraints = [...(Users.getCconstraints() || []),...[
    {
      name: Users.name.toUpperCase() + '_U1',
      fields: Users.uniqueFields,
      type:"unique"
    }
  ]];  

  static foreignsKeys = [...(Users.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDCOLLABORATOR'],
      type: 'foreign key',
      references: { 
          table: Collaborators,
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
    }
    
  ]];
  
  static getModel(pSequelize) {
    if (Users.#model == null) {
      Users.#model = Users.initModel(pSequelize);
    }
    return Users.#model;
  }
  
  static initAssociations() {
      Users.associates();
  }  

}

module.exports = { Users };