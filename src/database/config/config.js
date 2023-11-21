
require('dotenv').config({ path: __dirname + "/../../../.env" });
/**
 * configure database for use in sequelize-cli and default connection
 */
module.exports = {
  "production": {
    "ID":1,
    "database": process.env.DB_NAME || "SERVER_API_DB", 
    "username": process.env.DB_USERNAME || "root",
    "password": process.env.DB_PASSWORD || "masterkey",
    "host": process.env.DB_HOST || "localhost",
    "port": process.env.DB_PORT || "3306",
    "dialect": process.env.DB_DIALECT ||"mysql",
    "logQueryParameters":true,
    "define":{
      "freezeTableName": true
    }
  },  
  "development": {
    "ID":10,
    "database": process.env.DB_DEV_NAME || "SERVER_API_DB", 
    "username": process.env.DB_DEV_USERNAME || "root",
    "password": process.env.DB_DEV_PASSWORD || "masterkey",
    "host": process.env.DB_DEV_HOST || "localhost",
    "port": process.env.DB_DEV_PORT || "3306",
    "dialect": process.env.DB_DEV_DIALECT ||"mysql",
    "logQueryParameters":true,
    "define":{
      "freezeTableName": true
    }
  }
}
  