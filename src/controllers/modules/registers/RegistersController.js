const { PeopleController } = require("./people/PeopleController");
const { DatabaseUtils } = require("../../database/DatabaseUtils");
const { Utils } = require("../../../helpers/Utils");


/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-25-08
 */
class RegistersController {    

    static async processPostAsRegister(req,res,next,route,arrRoute,level) {
        try {            
            let tableClassModel = null;
            let modelName = arrRoute[level];
            let resolvedPath = require.resolve(`../../../database/models/${modelName}`).toLowerCase();
            let ind = Object.keys(require.cache).join(',').toLowerCase().split(',').indexOf(resolvedPath);
            if (ind > -1) {
                tableClassModel = require.cache[Object.keys(require.cache)[ind]].exports[Utils.getKey(require.cache[Object.keys(require.cache)[ind]].exports,modelName)];
            } else {
                let tempp = require(resolvedPath);
                tableClassModel = tempp[Utils.getKey(tempp,modelName)];
            }
            let params = req.body;
            let queryParams = params.queryParams || {};                        
            queryParams = DatabaseUtils.prepareQueryParams(queryParams);            
            level++;
            switch(arrRoute[level].trim().toLowerCase()) {
                case 'create':
                case 'get':
                case 'update':
                case 'delete':
                    res.data = await tableClassModel[`${arrRoute[level].trim().toLowerCase()}Data`](req.body);                    
                    res.sendResponse(200,true);
                    break;
                default:
                    if (typeof tableClassModel[arrRoute[level]] === 'function') {
                        res.data = await tableClassModel[arrRoute[level]](queryParams);
                        res.sendResponse(200,true);
                    } else {
                        throw new Error(`resource level not expected: ${arrRoute[level]} of ${route}`);
                    }
            }            
        } catch (e) {
            console.log(e);
            res.sendResponse(417,false,e.message || e,null,e);
        }
    }

    
    /**
     * * Process route as array of levels. ex: /modules/inputs/purchases/forecast/get as ['modules','inputs','purchases','forecast','get']
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @param {*} arrRoute 
     * @param {*} level 
     * @created 2023-08-25
     */
    static processPostAsRoute = async(req,res,next,route,arrRoute,level) => {
        try {            
            level++;
            switch(arrRoute[level].trim().toLowerCase()) {
                case 'originsdatas':
                    RegistersController.processPostAsRegister(req,res,next,route,arrRoute,level);
                    break;
                case 'people':
                    await PeopleController.processPostAsRoute(req,res,next,route,arrRoute,level);
                    break;
                case 'items':
                    await ItemsController.processPostAsRoute(req,res,next,route,arrRoute,level);
                    break; 
                case 'orders':
                    await OrdersController.processPostAsRoute(req,res,next,route,arrRoute,level);
                    break; 
                case 'ordersxclients':
                    await OrdersXClientsController.processPostAsRoute(req,res,next,route,arrRoute,level);
                    break;   
                case 'ordersxitems':
                    await OrdersXItemsController.processPostAsRoute(req,res,next,route,arrRoute,level);
                    break;   
                default:
                    throw new Error(`resource level not expected: ${arrRoute[level]} of ${route}`);
                    break;
            }
        } catch (e) {
            console.log(e);
            res.sendResponse(404,false,e.message || e,null,e);
        }
    }
}

module.exports = {RegistersController}