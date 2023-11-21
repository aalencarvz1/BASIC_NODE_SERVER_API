'use strict';

const { Routines } = require('../models/Routines');
const { OriginsDatas }  = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
const modules = require('../catalogs/modules.json');
const { Modules } = require('../models/Modules');
const { Utils } = require('../../helpers/Utils');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    

    let registersModules = [];
    let registersRoutines = [];


    function seedRoutine(routine,idsup) {
      try {
        if (Utils.typeOf(routine) == 'array') {          
          for(let i = 0; i < routine.length; i++) {
            seedRoutine(routine[i],idsup);
          }
        } else {
          if (Utils.hasValue(routine?.SUBS || null)) {
            let module = {
              ID:routine.ID-0,
              IDSTATUSREG: StatusRegs.ACTIVE,
              IDUSERCREATE : Users.SYSTEM,
              CREATEDAT: new Date(),
              IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
              ISSYSTEMREG : 1,
              IDSUP: idsup,
              NAME:routine.NAME,
              ICON:routine.ICON              
            };
            if (typeof routine.VISUALMODULE !== 'undefined') {
              console.log('attribuing visualmodule', routine.NAME);
              module.VISUALMODULE = routine.VISUALMODULE;
            }
            registersModules.push(module);

            for(let i = 0; i < routine.SUBS.length; i++) {
              seedRoutine(routine.SUBS[i],routine.ID);
            } 

          } else {
            registersRoutines.push({
              ID:routine.ID-0,
              IDSTATUSREG: StatusRegs.ACTIVE,
              IDUSERCREATE : Users.SYSTEM,
              CREATEDAT: new Date(),
              IDORIGINDATA : OriginsDatas.DEFAULT_ORIGINDATA,
              ISSYSTEMREG : 1,
              IDMODULE: idsup,
              IDROUTINETYPE : routine.IDROUTINETYPE-0,
              NAME:routine.NAME,
              ICON:routine.ICON,
              VIEWPATH:routine.VIEWPATH
            });
          }
        }
      } catch(e) {
        Utils.log(e);
      }
    }

    seedRoutine(modules,null);
    Utils.log(registersModules);
    //Utils.log(registersRoutines);

    await queryInterface.bulkInsert(Modules.name.toUpperCase(),registersModules,{
      ignoreDuplicates:true,
      updateOnDuplicate:['IDSTATUSREG','IDSUP','NAME','ICON','VISUALMODULE']
    });  

    await queryInterface.bulkInsert(Routines.name.toUpperCase(),registersRoutines,{
      ignoreDuplicates:true,
      updateOnDuplicate:['IDSTATUSREG','IDMODULE','NAME','ICON','VIEWPATH']
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Routines.name.toUpperCase(), null, {});
     await queryInterface.bulkDelete(Modules.name.toUpperCase(), null, {});
  }
};
