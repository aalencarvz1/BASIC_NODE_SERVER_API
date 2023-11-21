/*imports*/
require('dotenv').config({ path: __dirname + "/../../../.env" });
const { Sequelize,Model,DataTypes } = require("sequelize");
const configDB  = require("../../database/config/config");
const DBConnectionManager = require('../DBConnectionManager');
const { DatabaseUtils } = require('../../controllers/database/DatabaseUtils');
const { Utils } = require('../../helpers/Utils');

/**
 * class model
 */
class BaseTableModel extends Model { 
    
    static schema = configDB[process.env.NODE_ENV].database;  
    
    static getBaseTableModelFields = () => {
        return {
            ID: {
                type: DataTypes.BIGINT.UNSIGNED,                
                autoIncrement: true,
                primaryKey: true,               
                allowNull: false 
            },
            IDSTATUSREG: {
                type: DataTypes.BIGINT.UNSIGNED,                
                allowNull: false,
                defaultValue:1 
            },
            IDUSERCREATE: {
                type: DataTypes.BIGINT.UNSIGNED,                
                allowNull: false,
                defaultValue:1 
            },
            CREATEDAT : {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            IDUSERUPDATE: {
                type: DataTypes.BIGINT.UNSIGNED,
            },
            UPDATEDAT : {
                type: DataTypes.DATE,
                allowNull: true
            },
            IDORIGINDATA: {
                type: DataTypes.BIGINT.UNSIGNED,                
                allowNull: false,
                defaultValue:1 
            },
            DELETEDAT:{
                type: DataTypes.DATE,
                allowNull : true
            },
            ISSYSTEMREG: {
                type: DataTypes.INTEGER(1),
                allowNull: false,
                defaultValue:0
            }
        }; 
    }
    
    static getCconstraints = () => {
        return [
            {
                fields:['ISSYSTEMREG'],
                type:"check",
                where:{
                    ISSYSTEMREG: {
                        [Sequelize.Op.in]: [0,1]
                    }
                }
            }
        ];
    };

    static getBaseTableModelUniqueFields = () => {
        return [
            'IDSTATUSREG',
            'IDORIGINDATA'
        ];
    };

    static getBaseTableModelForeignsKeys = () => {        
        return [
            {
                fields: ['IDSTATUSREG'],
                type: 'foreign key',
                references: { 
                    table: 'STATUSREGS',
                    field: 'ID'
                },
                onUpdate: 'cascade'
            },{
                fields: ['IDUSERCREATE'],
                type: 'foreign key',
                references: { 
                    table: 'USERS',
                    field: 'ID'
                },
                onUpdate: 'cascade'
            },{
                fields: ['IDUSERUPDATE'],
                type: 'foreign key',
                references: { 
                    table: 'USERS',
                    field: 'ID'
                },
                onUpdate: 'cascade'
            },{
                fields: ['IDORIGINDATA'],
                type: 'foreign key',
                references: { 
                    table: 'ORIGINSDATAS',
                    field: 'ID'
                },
                onUpdate: 'cascade'
            }        
        ];
    };

    static getBaseTableModelInitHooks = () => {
        return {
            beforeCreate : (record, options) => {
                record.dataValues.CREATEDAT = Sequelize.literal('current_timestamp');//new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');                
            },
            beforeUpdate : (record, options) => {
                record.dataValues.UPDATEDAT = Sequelize.literal('current_timestamp');//new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');        
            }
        };
    }

    /**
     * run migrations constraints of inherited model
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async migrateConstraints(queryInterface) {
        if (this.constraints && (this.constraints||[]).length > 0) {
            for(let i in this.constraints) {
                if (typeof this.constraints[i] === 'object') {
                    if (!this.constraints[i].name) {
                        this.constraints[i].name = this.name.toUpperCase() + '_C' + i;
                    }
                    Utils.log(' add constraint',this.name.toUpperCase(), this.constraints[i]);
                    await queryInterface.addConstraint(this.name.toUpperCase(), this.constraints[i]);
                } else {
                    Utils.log(' add constraint',this.name.toUpperCase(), this.constraints[i]);
                    await queryInterface.sequelize.query(this.constraints[i]);
                }
            }
        }
    }

    /**
     * run migrations foreign keys of inherited model
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async migrateForeignKeyContraint(queryInterface, pClassModelRef) {
        for(let i in (this.foreignsKeys || [])) {
            let foreignKey = {};
            if (typeof this.foreignsKeys[i] === 'object') {
                for(let key in this.foreignsKeys[i]) {
                    if (key.trim().toLowerCase() != 'references') {
                        foreignKey[key] = this.foreignsKeys[i][key];
                    } else {
                        foreignKey[key] = {};
                        foreignKey[key].field = this.foreignsKeys[i][key].field;
                        if (typeof this.foreignsKeys[i][key].table == 'string') {
                            foreignKey[key].table = this.foreignsKeys[i][key].table.toUpperCase();
                        } else {
                            foreignKey[key].table = this.foreignsKeys[i][key].table.name.toUpperCase();
                        }
                    }
                }
                foreignKey.references.table = foreignKey.references.table.split('.');
                foreignKey.references.table = foreignKey.references.table[1] || foreignKey.references.table[0];

                //migrate all foreign keys or only specific model ref parameter
                if (!pClassModelRef || (foreignKey.references.table.trim().toUpperCase() == pClassModelRef.name.toUpperCase().trim())) {
                    if (!foreignKey.name) {
                        foreignKey.name = this.name.toUpperCase() + '_FK' + i;
                    }
                    Utils.log(' add constraint',this.name.toUpperCase(), foreignKey);
                    await queryInterface.addConstraint(this.name.toUpperCase(), foreignKey);                
                }
            } else {
                Utils.log(' add constraint',this.name.toUpperCase(), this.foreignsKeys[i]);
                await queryInterface.sequelize.query(this.foreignsKeys[i]);  
            }
        }        
    }

    
    /**
     * run migrations of inherited model
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async runUpMigration(queryInterface, options) {
        options = options || {};
        Utils.log('creating table',this.name.toUpperCase(), Object.keys(this.fields));
        await queryInterface.createTable(this.name.toUpperCase(), this.fields);
        await this.migrateConstraints(queryInterface);    
        Utils.log(' inserting on tables',this.ID,this.name.toUpperCase());
        await queryInterface.bulkInsert('DATATABLES',[{      
            ID:this.ID,
            CREATEDAT: new Date(),
            ISSYSTEMREG : 1,
            IDDATACONNECTION : configDB[process.env.NODE_ENV].ID,
            IDSCHEMA : configDB[process.env.NODE_ENV].ID,
            NAME : this.name.toUpperCase()
        }],{
            ignoreDuplicates:true,
            updateOnDuplicate:null
        });
        if (Object.keys(options).indexOf('migrateForeignKeyContraint') == -1) options.migrateForeignKeyContraint = true;
        if (options.migrateForeignKeyContraint == true) {
            await this.migrateForeignKeyContraint(queryInterface);              
        }
    }


    /**
     * init associations of inherited model to other model
     * @static (pay attention to bindings)
     * @created 2023-11-10
     */
    static associates() {
        let ignoredForeignsKeys = 0;
        try {
            for(let i in (this.foreignsKeys || [])) {
                if (this.name.toUpperCase().indexOf('PC') === 0)
                    Utils.log(' associating',this.name.toUpperCase(),i,this.foreignsKeys[i]);

                let tableRefClassModel = this.foreignsKeys[i].references.table; //for re-declare if necessary
                if (typeof tableRefClassModel == 'string') {

                    //require.cache is case sensitive, avoid reload cached model
                    let path = require.resolve(`./${tableRefClassModel.toUpperCase().indexOf('PC') === 0 ? 'winthor/':''}${tableRefClassModel}`).toLowerCase();
                    //tableRefClassModel = RoutesController.loadDinamicCachedRequire(path); dont use this method, circurlar dependency
                    let ind = Object.keys(require.cache).join(',').toLowerCase().split(',').indexOf(path);
                    //Utils.log('loading module dinamic',path,ind);
                    if (ind > -1) {
                        tableRefClassModel = require.cache[Object.keys(require.cache)[ind]].exports[Utils.getKey(require.cache[Object.keys(require.cache)[ind]].exports,tableRefClassModel)];
                    } else {
                        let tempp = require(`./${tableRefClassModel.toUpperCase().indexOf('PC') === 0 ? 'winthor/' : ''}${tableRefClassModel}`);
                        tableRefClassModel = tempp[Utils.getKey(tempp,tableRefClassModel)]
                    }
                }        
                let model = null;
                let columnForeign = this.foreignsKeys[i].fields.join(',');
                let sourceParams = {
                    foreignKey : this.foreignsKeys[i].references.field,//this.foreignsKeys[i].name || pModel.tableName.trim().toUpperCase() + '_FK_' + i,
                    sourceKey : columnForeign
                };
                let targetParams = {
                    foreignKey : columnForeign
                };
                if (tableRefClassModel.name.toUpperCase().trim() == this.getModel().tableName.trim().toUpperCase()) {
                    model = this.getModel();
                } else {
                    model = tableRefClassModel.getModel();
                }                
                sourceParams.targetKey = this.foreignsKeys[i].references.field;
                if (this.getModel().tableName.toUpperCase().indexOf('PC') === 0) {
                    console.log(model.tableName,'hasMany',this.getModel(),targetParams);
                    console.log(this.getModel().tableName,'belongsTo',model,sourceParams);
                }
                model.hasMany(this.getModel(),targetParams);                
                this.getModel().belongsTo(model,sourceParams);               
                
            }            
        } catch(e) {
            Utils.log(' error ',e);
        } 
    }

    /**
     * init model inherithed
     * @static (pay attention to bindings)
     * @created 2023-11-10
     */
    static initModel(pSequelize) {
        pSequelize = pSequelize || DBConnectionManager.getDefaultDBConnection();  
        let model = this.init(this.fields,{
            sequelize: pSequelize,
            underscore:false,
            freezeTableName:true,
            modelName:this.name.toUpperCase(),
            tableName:this.name.toUpperCase(),
            name:{
                singular:this.name.toUpperCase(),
                plural:this.name.toUpperCase()
            },
            timestamps:false,
            hooks: this.getBaseTableModelInitHooks()
        });
        return model;
    }

    /**
     * create data of model inherithed of this if not exists
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async createIfNotExists(queryParams, newValues){
        let reg = await this.getModel().findOne(queryParams);
        if (!reg) {
            let options = {};            
            if (queryParams.transaction) options.transaction = queryParams.transaction;        
            let values = newValues || queryParams.where;
            reg = await this.getModel().create(values,options);
        }
        return reg;
    }

    static async getOneByID(id) {
        let result = await this.getData({queryParams:{where:{ID:id}}});
        if (result && result.length) {
            result = result[0];
        }
        return result;
    }

    /**
     * create data of model inherithed of this
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async createData(params) {
        let queryParams = params.queryParams || params || {};
        let result = await this.getModel().create(queryParams);
        if (typeof this.getData === 'function') return await this.getOneByID(result.ID) || result
        else return result;
    }

    /**
     * get data of model inherithed of this
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async getData(params) {
        let queryParams = DatabaseUtils.prepareQueryParams(params.queryParams || params || {});
        if (queryParams.raw !== false) queryParams.raw = true; 
        return await this.getModel().findAll(queryParams);
    }

    /**
     * update data of model inherithed of this
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async updateData(params) {
        let queryParams = params.queryParams || params || {};
        if (queryParams.ID) {                        
            let reg = await this.getModel().findOne({where:{ID:queryParams.ID}});
            if (reg) {
                for(let key in queryParams) {
                    if (key != 'ID') {
                        reg[key] = queryParams[key];
                    }
                }
                await reg.save();
                if (typeof this.getData === 'function') return await this.getOneByID(reg.ID) || reg.dataValues
                else return reg.dataValues;
            } else {
                throw new Error('no data found');
            }
        } else {
            throw new Error('missing data');
        }
    }


    /**
     * delete data of model inherithed of this
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async deleteData(params){
        let queryParams = DatabaseUtils.prepareQueryParams(params.queryParams || params || {});
        if (queryParams.identifiers) {                        
            let regs = await this.getModel().findAll({
                where:{
                    ID: {
                        [Sequelize.Op.in]: queryParams.identifiers
                    }
                }
            });
            if (regs && regs.length) {
                await this.getModel().destroy({
                    where:{
                        ID: {
                            [Sequelize.Op.in]: queryParams.identifiers
                        }
                    }
                });
                return true;
            } else {
                throw new Error('no data found');
            }
        } else {
            throw new Error('missing data');
        }
    }

};
module.exports = {BaseTableModel};
