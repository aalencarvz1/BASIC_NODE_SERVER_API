'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { IdentifiersTypes } = require("./IdentifiersTypes");

/**
 * class model
 */
class People extends BaseTableModel {
  static ID = 100;

  

  static #model = null;

  static SYSTEM = 1;
  static ANONYMOUS = 2; //to use as clients anonimous
  
  static fields = {
    ...People.getBaseTableModelFields(),...{
      IDIDENTIFIERDOCTYPE: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      IDENTIFIERDOC: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      NAME: {
        type: DataTypes.STRING(2000),
        allowNull: false
      },
      BIRTHDATE: {
        type: DataTypes.DATE
      },
      FANTASY: {
        type: DataTypes.STRING(2000)
      },
      ALIAS: {
        type: DataTypes.STRING(2000)
      },
      OBSERVATIONS: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDIDENTIFIERDOCTYPE',
    'IDENTIFIERDOC'
  ];

  static constraints = [...(People.getCconstraints() || []),...[
    {
      name: People.name.toUpperCase() + '_U1',
      fields: [...People.getBaseTableModelUniqueFields(),...People.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(People.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDIDENTIFIERDOCTYPE'],
      type: 'foreign key',
      references: { 
          table: IdentifiersTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
  static getModel(pSequelize) {
    if (People.#model == null) {
      People.#model = People.initModel(pSequelize);
    }
    return People.#model;
  }
  
  static initAssociations() {
      People.associates();
  }

 
  static include(queryParams,pClassModelParent) {
    queryParams = queryParams || {};
    queryParams.attributes = queryParams.attributes || [`${pClassModelParent.name.toUpperCase()}.*`],
    queryParams.attributes.push([Sequelize.col(`${People.name.toUpperCase()}.IDIDENTIFIERDOCTYPE`),'IDIDENTIFIERDOCTYPE']);
    queryParams.attributes.push([Sequelize.col(`${People.name.toUpperCase()}.IDENTIFIERDOC`),'IDENTIFIERDOC']);
    queryParams.attributes.push([Sequelize.col(`${People.name.toUpperCase()}.NAME`),'NAME']);
    queryParams.attributes.push([Sequelize.col(`${People.name.toUpperCase()}.FANTASY`),'FANTASY']);
    queryParams.include = queryParams.include || [];
    queryParams.include.push({
        raw:true,
        model:People.getModel(),
        attributes:[],
        on:Sequelize.where(
            Sequelize.col(`${People.name.toUpperCase()}.ID`),
            '=',
            Sequelize.col(`${pClassModelParent.name.toUpperCase()}.IDPEOPLE`)
        )
    });
    return queryParams;
  }

  static async updateOrCreatePeopleByIdentifierDocAndGet(queryParams) {
    if (queryParams.IDIDENTIFIERDOCTYPE && queryParams.IDENTIFIERDOC) {
      let people = await People.getModel().findOne({
        where:[
          {IDIDENTIFIERDOCTYPE: queryParams.IDIDENTIFIERDOCTYPE},
          Sequelize.where(Sequelize.fn('lower',Sequelize.fn('regexp_replace',Sequelize.col('IDENTIFIERDOC'),'[^a-z|A-Z|0-9]','')),'=',Sequelize.fn('lower',Sequelize.fn('regexp_replace',queryParams.IDENTIFIERDOC,'[^a-z|A-Z|0-9]','')))
        ] 
      });

      let describeTable = await People.getModel().describe();
      let originalFieldsNames = Object.keys(describeTable);
      let fieldsUpper = originalFieldsNames.join(',').toUpperCase().split(',');
      let newParams = {};
      let ind = null;
      for(let key in queryParams) {
        ind = fieldsUpper.indexOf(key.trim().toUpperCase());
        if (ind > -1) {
          newParams[originalFieldsNames[ind]] = queryParams[key];
        }
      }
      if (people) {
        for(let key in newParams) {
          if (key != 'ID') people[key] = newParams[key];
        }
        await people.save();
        return people;
      } else {        
        people = await People.getModel().create(newParams);
        return people;
      }
    } else {
      throw new Error("missing data");    
    }
  }
  
};


module.exports = {People};
 