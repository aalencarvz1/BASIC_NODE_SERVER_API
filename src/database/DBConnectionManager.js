const { Sequelize } = require("sequelize");
const configDB  = require("./config/config");
const OracleDB = require("oracledb");
const { Utils } = require("../helpers/Utils");

/**
 * Class to manage connections to database
 * @author Alencar
 * @created 2023-08-10
 */
module.exports = class DBConnectionManager {

    //to storage singleton default connection according configDB
    static #defaultDBConnection = null;

    static #oldDBConnection = null;

    static #winthorDBConnection = null;

    static #consultDBConnection = null;

    /**
     * get / start default database connection, according configDB
     * @returns database connection
     * @created 2023-08-10
     */
    static getDefaultDBConnection(){
        try {
            if (DBConnectionManager.#defaultDBConnection == null) {
                let connectionConfig = configDB[process.env.NODE_ENV];
                Utils.log('starting sequelize ', connectionConfig);
                if (process.env.NODE_ENV == 'production') {
                    if (connectionConfig?.logging !== false) {
                        connectionConfig.logging = (...msg)=>Utils.log(msg);
                    }
                }
                DBConnectionManager.#defaultDBConnection = new Sequelize(connectionConfig);                
            }
            return DBConnectionManager.#defaultDBConnection;
        } catch (e) {
            Utils.log('error on start connection',e);
        }
        return DBConnectionManager.#defaultDBConnection;
    }


    static getWinthorDBConnection(){
        try {
            if (DBConnectionManager.#winthorDBConnection == null) {
                let connectionConfig = configDB[process.env.NODE_ENV+"_winthor"] || null;


                if (connectionConfig) {

                    if ((connectionConfig?.dialect || '').toLowerCase().trim() == 'oracle' ) {
                        
                        //https://github.com/oracle/node-oracledb/blob/b2b784218a53e0adfb8b3b8eeb91532abed946f5/doc/src/user_guide/appendix_a.rst#id87                
                        //Utils.log('initializing oracle client');
                        OracleDB.initOracleClient();
                    }

                    Utils.log('starting sequelize ', connectionConfig);
                    if (process.env.NODE_ENV == 'production') {
                        if (connectionConfig?.logging !== false) {
                            connectionConfig.logging = (...msg)=>Utils.log(msg);
                        }
                    }
                    DBConnectionManager.#winthorDBConnection = new Sequelize(connectionConfig);                
                }
            }
            return DBConnectionManager.#winthorDBConnection;
        } catch (e) {
            Utils.log('error on start connection',e);
        }
        return DBConnectionManager.#winthorDBConnection;
    }


    static getConsultDBConnection(){
        try {
            if (DBConnectionManager.#consultDBConnection == null) {
                let connectionConfig = configDB[process.env.NODE_ENV+"_consult"] || null;


                if (connectionConfig) {

                    if ((connectionConfig?.dialect || '').toLowerCase().trim() == 'oracle' ) {
                        
                        //https://github.com/oracle/node-oracledb/blob/b2b784218a53e0adfb8b3b8eeb91532abed946f5/doc/src/user_guide/appendix_a.rst#id87                
                        //Utils.log('initializing oracle client');
                        OracleDB.initOracleClient();
                    }

                    Utils.log('starting sequelize ', connectionConfig);
                    if (process.env.NODE_ENV == 'production') {
                        if (connectionConfig?.logging !== false) {
                            connectionConfig.logging = (...msg)=>Utils.log(msg);
                        }
                    }
                    DBConnectionManager.#consultDBConnection = new Sequelize(connectionConfig);                
                }
            }
            return DBConnectionManager.#consultDBConnection;
        } catch (e) {
            Utils.log('error on start connection',e);
        }
        return DBConnectionManager.#consultDBConnection;
    }


    static getOldDBConnection(){
        try {
            if (DBConnectionManager.#oldDBConnection == null) {
                let connectionConfig = configDB[process.env.NODE_ENV+"_old"] || null;

                if (connectionConfig) {

                    if ((connectionConfig?.dialect || '').toLowerCase().trim() == 'oracle' ) {
                        
                        //https://github.com/oracle/node-oracledb/blob/b2b784218a53e0adfb8b3b8eeb91532abed946f5/doc/src/user_guide/appendix_a.rst#id87                
                        //Utils.log('initializing oracle client');
                        OracleDB.initOracleClient();
                    }

                    Utils.log('starting sequelize ', connectionConfig);
                    if (process.env.NODE_ENV == 'production') {
                        if (connectionConfig?.logging !== false) {
                            connectionConfig.logging = (...msg)=>Utils.log(msg);
                        }
                    }
                    DBConnectionManager.#oldDBConnection = new Sequelize(connectionConfig);                
                }
            }
            return DBConnectionManager.#oldDBConnection;
        } catch (e) {
            Utils.log('error on start connection',e);
        }
        return DBConnectionManager.#oldDBConnection;
    }
}

