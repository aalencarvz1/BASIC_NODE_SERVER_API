const { People } = require("../../../../database/models/People");
const { Utils } = require("../../../../helpers/Utils");
const { DatabaseUtils } = require("../../../database/DatabaseUtils");
const { UsersController } = require("./users/UsersController");


/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-09-05
 */
class PeopleController {


    static processPostAsRegister = async(req,res,next,route,arrRoute,level) => {
        try {
            let tableClassModel = null;
            let modelName = arrRoute[level];
            let resolvedPath = require.resolve(`../../../../database/models/${modelName}`).toLowerCase();
            let ind = Object.keys(require.cache).join(',').toLowerCase().split(',').indexOf(resolvedPath);
            if (ind > -1) {
                tableClassModel = require.cache[Object.keys(require.cache)[ind]].exports[Utils.getKey(require.cache[Object.keys(require.cache)[ind]].exports,modelName)];
            } else {
                let tempp = require(resolvedPath);
                tableClassModel = tempp[Utils.getKey(tempp,modelName)];
            }            
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
                        let params = req.body;
                        let queryParams = params.queryParams || {};                        
                        queryParams = DatabaseUtils.prepareQueryParams(queryParams);            
                        res.data = await tableClassModel[arrRoute[level]](queryParams);
                        res.sendResponse(200,true,null,res.data);
                    } else {
                        //if (modelName.trim().toLowerCase() === 'warehouses') modelName = 'companies';
                        let modelController = null;
                        let modelControllerName = modelName + 'controller';
                        //if (modelControllerName.trim().toLowerCase() === 'warehousescontroller') modelControllerName = 'companiescontroller';


                        //continuar aqui: 
                        //a integração de warehouse dá erro de eager loading, enquanto a integração da companies não, aparentemente os codigos são exatamente iguais, verificar 

                        let resolvedPath = require.resolve(`./${modelName}/${modelControllerName}`).toLowerCase();
                        let ind = Object.keys(require.cache).join(',').toLowerCase().split(',').indexOf(resolvedPath);
                        if (ind > -1) {
                            modelController = require.cache[Object.keys(require.cache)[ind]].exports[Utils.getKey(require.cache[Object.keys(require.cache)[ind]].exports,modelControllerName)];
                        } else {
                            let tempp = require(resolvedPath);
                            modelController = tempp[Utils.getKey(tempp,modelControllerName)];
                        }
                        
                        if (typeof modelController[arrRoute[level]] === 'function') {
                            let params = req.body;
                            let queryParams = params.queryParams || {};                        
                            queryParams = DatabaseUtils.prepareQueryParams(queryParams);  
                            res.data = await modelController[arrRoute[level]](queryParams);
                            res.sendResponse(200,true,null,res.data);
                        } else if (typeof modelController['processPostAsRoute'] === 'function') {
                            level--;
                            await modelController['processPostAsRoute'](req,res,next,route,arrRoute,level);
                        } else {
                            throw new Error(`resource level not expected: ${arrRoute[level]} of ${route}`);
                        }
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
            //Utils.log(route,level,arrRoute[level]);
            switch(arrRoute[level].trim().toLowerCase()) {
                case 'create':
                case 'get':
                case 'update':
                case 'delete':
                    res.data = await People[`${arrRoute[level].trim().toLowerCase()}Data`](req.body);
                    res.sendResponse(200,true);
                    break;                
                case 'companies':
                case 'businessesunits':
                case 'warehouses':
                case 'suppliers':
                case 'clients':
                case 'collaborators':  
                    PeopleController.processPostAsRegister(req,res,next,route,arrRoute,level);
                    break;                     
                case 'users':
                    UsersController.processPostAsRoute(req,res,next,route,arrRoute,level);
                    break;
                default:
                    throw new Error(`resource level not expected: ${arrRoute[level]} of ${route}`);
                    break;
            }
        } catch (e) {
            console.log(e);
            res.sendResponse(417,false,e.message || e,null,e);
        }
    }
}

module.exports = {PeopleController}