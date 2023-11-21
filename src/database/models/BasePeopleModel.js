'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { People } = require("./People");
const { Utils } = require("../../helpers/Utils");


/**
 * class model
 */
class BasePeopleModel extends BaseTableModel {

  
  /**
   * @static
   * @override
   * @created 2023-11-10
   */
  static getBaseTableModelFields = () => {
    return {
      ...BaseTableModel.getBaseTableModelFields(),
      ...{
        IDPEOPLE:{
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull:false
        },
        ALIAS: {
          type: DataTypes.STRING(2000)
        },
        OBSERVATIONS: {
          type: DataTypes.TEXT
        }
      }
    };
  };


  /**
   * @static
   * @override
   * @created 2023-11-10
   */
  static getBaseTableModelUniqueFields = () => {
      return [
          ...(BaseTableModel.getBaseTableModelUniqueFields() || []),
          'IDPEOPLE'
      ];
  };

  /**
   * @static
   * @override
   * @created 2023-11-10
   */
  static getBaseTableModelForeignsKeys = () => {        
    return [
        ...(BaseTableModel.getBaseTableModelForeignsKeys() || []),
        {
            fields: ['IDPEOPLE'],
            type: 'foreign key',
            references: { 
                table: 'PEOPLE',
                field: 'ID'
            },
            onUpdate: 'cascade'
        }       
    ];
  };
  
  
  static async addIdPeopleToReqQueryParams(params) {
    params = params || {};
    let queryParams = params.queryParams || params;
    let people = await People.updateOrCreatePeopleByIdentifierDocAndGet(queryParams);          
    if (params.queryParams) {
      params.queryParams.IDPEOPLE = people.ID;
    } else {
      params.IDPEOPLE = people.ID;
    }
    return params;
  }

  /**
   * this is a base method of others classes. if called on derived classes, USE BINDING LOGIC
   * @static (pay attention to bindings)
   * @async (pay attention to await)
   * @override
   * @created 2023-11-09
   */
  static async getData(params) {
    params = params || {};
    params.includePeople = Utils.firstValid([params.includePeople,true]);
    if (params.includePeople) {
        params.queryParams = People.include(params.queryParams,this);
    }
    return await BaseTableModel.getData.bind(this)(params);
  }


   /**
   * this is a base method of others classes. if called on derived classes, USE BINDING LOGIC
   * @static (pay attention to bindings)
   * @async (pay attention to await)
   * @override
   * @created 2023-11-09
   */
  static async createData(params) {
    let queryParams = params.queryParams || params || {};
    if (!queryParams.IDPEOPLE) {
      await this.addIdPeopleToReqQueryParams(params);
    }
    return await BaseTableModel.createData.bind(this)(params);
  }

  /**
   * update entity type people
   * @static (pay attention to bindings)
   * @async (pay attention to await)
   * @override
   *   * @created 2023-11-10
   */
  static async updateData(params) {
    let queryParams = params.queryParams || params || {};
    if (Object.keys(queryParams).indexOf('IDPEOPLE') > -1 && !Utils.hasValue(queryParams.IDPEOPLE)) {
      await this.addIdPeopleToReqQueryParams(req);
    }
    return await BaseTableModel.updateData.bind(this)(params);
  }
  
};


module.exports = {BasePeopleModel};
 