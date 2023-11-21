const { Users } = require("../../../../../database/models/Users");

/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-09-05
 */
class UsersController {

    
    /**
     * * Process route as array of levels. ex: /modules/inputs/purchases/forecast/get as ['modules','inputs','purchases','forecast','get']
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @param {*} arrRoute 
     * @param {*} level 
     * @created 2023-08-25
     */
    static async processPostAsRoute(req,res,next,route,arrRoute,level) {
        try {            
            level++;
            //Utils.log(route,level,arrRoute[level]);
            switch(arrRoute[level].trim().toLowerCase()) {    
                case 'create':
                case 'get':
                case 'update':
                case 'delete':
                    res.data = await Users[`${arrRoute[level].trim().toLowerCase()}Data`](req.body);
                    res.sendResponse(200,true);
                    break;            
                default:
                    throw new Error(`resource level not expected: ${arrRoute[level]} of ${route}`);
                    break;
            }
        } catch (e) {
            res.sendResponse(404,false,e.message || e,null,e);
        }
    }
}

module.exports = {UsersController}