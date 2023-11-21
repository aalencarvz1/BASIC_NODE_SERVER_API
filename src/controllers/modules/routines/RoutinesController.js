const { Sequelize } = require("sequelize");
const { Modules } = require("../../../database/models/Modules");
const { StatusRegs } = require("../../../database/models/StatusRegs");
const { Users } = require("../../../database/models/Users");
const { Permissions } = require("../../../database/models/Permissions");
const { Routines } = require("../../../database/models/Routines");
const { AccessesProfiles } = require("../../../database/models/AccessesProfiles");
const { Utils } = require("../../../helpers/Utils");

/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-25-08
 */
class RoutinesController {


    static removeNonVisualModules(modules) {
        let result = [];
        for(let key in modules) {
            //console.log('a1 ',key,modules[key]);
            if (modules[key]?.VISUALMODULE === 0) {
                for(let kr in modules[key].ROUTINES) {
                    result.push(modules[key].ROUTINES[kr]);
                }
                if (modules[key].SUBS) {
                    let newSubs = RoutinesController.removeNonVisualModules(modules[key].SUBS);

                    for(let ks in newSubs) {
                        result.push(newSubs[ks]);                
                    }
                }
            } else {
                result.push(modules[key]);
            }
        }
        result.sort((a,b) => ((typeof a.VISUALORDER !== 'undefined' && a.VISUALORDER !== null ? a.VISUALORDER : a.ID) > (typeof b.VISUALORDER !== 'undefined' && b.VISUALORDER !== null ? b.VISUALORDER : b.ID)) ? 1 : (((typeof b.VISUALORDER !== 'undefined' && b.VISUALORDER !== null ? b.VISUALORDER : b.ID) > (typeof a.VISUALORDER !== 'undefined' && a.VISUALORDER !== null ? a.VISUALORDER : a.ID)) ? -1 : 0));
        return result;
    }


    /**
     * get the user menu({module:{routine:...}}) according user permissions
     * @param {*} req 
     * @returns 
     * @created 2023-08-21
     */
    static async getUserMenu(req){
        let modules = null;
        try {
            Utils.log('user',req.user);
            modules = await Modules.getModel().findAll({  
                raw:true,          
                include: [{
                    model: Users.getModel(),
                    required:true,
                    attributes:[],
                    on: {
                        ID: req.user.ID,
                        IDSTATUSREG : StatusRegs.ACTIVE,
                        DELETEDAT : {
                            [Sequelize.Op.is] : null
                        }
                    }
                },{
                    model: Permissions.getModel(),
                    required:true,
                    attributes:[],
                    on: {                    
                        [Sequelize.Op.and] : [
                            {IDSTATUSREG : StatusRegs.ACTIVE},
                            {DELETEDAT : {
                                [Sequelize.Op.is] : null
                            }},
                            Sequelize.where(Sequelize.fn('COALESCE',Sequelize.col('PERMISSIONS.IDACCESSPROFILE'),Sequelize.col('USERS.IDACCESSPROFILE')),Sequelize.col('USERS.IDACCESSPROFILE')),
                            Sequelize.where(Sequelize.fn('COALESCE',Sequelize.col('PERMISSIONS.IDUSER'),Sequelize.col('USERS.ID')),Sequelize.col('USERS.ID')),
                            Sequelize.where(Sequelize.fn('COALESCE',Sequelize.col('PERMISSIONS.IDMODULE'),Sequelize.col('MODULES.ID')),Sequelize.col('MODULES.ID')),
                            Sequelize.where(Sequelize.col('PERMISSIONS.ALLOWED'),Sequelize.literal(1))
                        ]
                    }
                }]
            });

            if (modules && modules.length > 0) {
                for(let i = 0; i < modules.length; i++) {
                    modules[i].ROUTINES = await Routines.getModel().findAll({     
                        raw:true,       
                        include: [{
                            raw:true,
                            model: Users.getModel(),
                            required:true,
                            attributes:[],
                            on: {
                                ID: req.user.ID,
                                IDSTATUSREG : StatusRegs.ACTIVE,
                                DELETEDAT : {
                                    [Sequelize.Op.is] : null
                                }
                            },
                            include:[{
                                raw:true,                            
                                model: AccessesProfiles.getModel(),
                                required:true,
                                attributes:[],
                                on: {                                
                                    [Sequelize.Op.and] : [
                                        Sequelize.where(Sequelize.col(`\`${Users.name.toUpperCase()}->${AccessesProfiles.name.toUpperCase()}\`.ID`),Sequelize.col(`${Users.name.toUpperCase()}.IDACCESSPROFILE`)),
                                        {IDSTATUSREG : StatusRegs.ACTIVE},
                                        {DELETEDAT : {
                                            [Sequelize.Op.is] : null
                                        }}
                                    ]
                                }
                            }]
                        },{
                            model: Permissions.getModel(),
                            required:true,
                            attributes:[],
                            on: {                    
                                [Sequelize.Op.and] : [
                                    {IDSTATUSREG : StatusRegs.ACTIVE},
                                    {DELETEDAT : {
                                        [Sequelize.Op.is] : null
                                    }},
                                    Sequelize.where(Sequelize.fn('COALESCE',Sequelize.col('PERMISSIONS.IDACCESSPROFILE'),Sequelize.col('USERS.IDACCESSPROFILE')),Sequelize.col('USERS.IDACCESSPROFILE')),
                                    Sequelize.where(Sequelize.fn('COALESCE',Sequelize.col('PERMISSIONS.IDUSER'),Sequelize.col('USERS.ID')),Sequelize.col('USERS.ID')),
                                    Sequelize.where(Sequelize.fn('COALESCE',Sequelize.col('PERMISSIONS.IDMODULE'),Sequelize.literal(modules[i].ID)),Sequelize.literal(modules[i].ID)),
                                    Sequelize.where(Sequelize.fn('COALESCE',Sequelize.col('PERMISSIONS.IDROUTINE'), Sequelize.literal(`case when \`${Users.name.toUpperCase()}->${AccessesProfiles.name.toUpperCase()}\`.ALLOWACESSALLROUTINESOFMODULE = 0 then -1 else ${Routines.name.toUpperCase()}.ID END`) ),Sequelize.col('ROUTINES.ID')),
                                    Sequelize.where(Sequelize.col('PERMISSIONS.ALLOWED'),Sequelize.literal(1))
                                ]
                            }
                        }],
                        where:{
                            IDMODULE:modules[i].ID
                        }
                    });
                }

                let nestedModules = {};
                for(let i = 0; i < modules.length; i++) {                
                    nestedModules[modules[i].ID] = modules[i];
                }

                for(let key in nestedModules) {
                    if (Utils.hasValue(nestedModules[key].IDSUP || null)) {
                        nestedModules[nestedModules[key].IDSUP].SUBS = nestedModules[nestedModules[key].IDSUP]?.SUBS || {};
                        nestedModules[nestedModules[key].IDSUP].SUBS[key] = nestedModules[key];
                        nestedModules[key].moved = true;
                    }
                }

                for(let key in nestedModules) {
                    if ((nestedModules[key].moved || false) == true) {
                        nestedModules[key] = null;
                        delete nestedModules[key];
                    }
                }
                //console.log("nested",JSON.stringify(nestedModules));
                modules = RoutinesController.removeNonVisualModules(nestedModules);
                //modules = nestedModules;
            }
        } catch(e) {
            Utils.log(e);
        }
        return modules;        
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
                case 'get':                    
                    res.data = await RoutinesController.getUserMenu(req,res,next);
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

module.exports = {RoutinesController}