const { Sequelize } = require("sequelize");
const { Utils } = require("../../helpers/Utils");

class DatabaseUtils {
    static customOrder(column, values, direction) {
        let orderByClause = 'CASE ';
      
        for (let index = 0; index < values.length; index++) {
          let value = values[index];
      
          if (typeof value === 'string') value = `'${value}'`;
      
          orderByClause += `WHEN ${column} = ${value} THEN '${index}' `;
        }
      
        orderByClause += `ELSE ${column} END`
      
        return [Sequelize.literal(orderByClause), direction]
    };

    static prepareLogicalQueryParams(queryParamsProp) {
        let result = queryParamsProp;
        let opKeysLower = Object.keys(Sequelize.Op).map(el=>el.toLowerCase().trim()); 
        let opKeys = Object.keys(Sequelize.Op); 
        let realInd = -1;
        if (Utils.typeOf(queryParamsProp) === 'object') {
            console.log('queryParamsProp 1',queryParamsProp);
            if (queryParamsProp == null) {
                result = null;
            } else {
                result = {};
                for(let key in queryParamsProp) {                
                    console.log('  key',key);
                    realInd = opKeysLower.indexOf(key.replace(/[\s_]/g,'').toLowerCase().trim());
                    if (realInd > 0)  {
                        result[Sequelize.Op[opKeys[realInd]]] = DatabaseUtils.prepareLogicalQueryParams(queryParamsProp[key]);
                    } else {
                        result[key] = DatabaseUtils.prepareLogicalQueryParams(queryParamsProp[key]);  
                    }
                }
            }
        } else if (Utils.typeOf(queryParamsProp) === 'array') {
            console.log('queryParamsProp 2',queryParamsProp);
            for(let key in queryParamsProp) {                                
                result[key] = DatabaseUtils.prepareLogicalQueryParams(queryParamsProp[key]);  
            }
        } else if (typeof queryParamsProp === 'string' && (queryParamsProp.indexOf(' ') > -1  || queryParamsProp.indexOf('(') > -1)) {
            console.log('queryParamsProp 3',queryParamsProp);
            if (queryParamsProp.indexOf('%') === 0) queryParamsProp = `'${queryParamsProp}'`; //like %%
            result = Sequelize.literal(queryParamsProp);
        }
        return result;
    }

    static prepareQueryParams(queryParams) {
        queryParams = queryParams || {};      
        queryParams.where = DatabaseUtils.prepareLogicalQueryParams(queryParams.where || {});
        console.log(queryParams.where);
        for(let key in queryParams?.attributes || []) {
            if (typeof queryParams.attributes[key] === 'string' && (
                queryParams.attributes[key].trim().indexOf(' ') > -1
                || queryParams.attributes[key].trim().indexOf('(') > -1
            )) {
                queryParams.attributes[key] = Sequelize.literal(queryParams.attributes[key]);
            }
        }
        for(let key in queryParams?.order || []) {            
            if (queryParams.order[key][0].trim().indexOf(' ') > -1
                || queryParams.order[key][0].trim().indexOf('(') > -1
            ) {
                queryParams.order[key][0] = Sequelize.literal(queryParams.order[key][0]);
            }
        }
        return queryParams;
    }

}

module.exports = { DatabaseUtils }