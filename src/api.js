const express = require('express');
require('dotenv').config();
const { Utils } = require('./helpers/Utils');
Utils.log('NODE_ENV =',process.env.NODE_ENV || 'development');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const { AuthController } = require('./controllers/auth/AuthController');
const { RoutesController } = require('./controllers/routes/RoutesController');
const { ModelsController } = require('./controllers/database/ModelsController');



//api create
const api = express();

//api configure midlewares
api.use(express.json({limit: '50mb'}));
api.use(express.urlencoded({limit: '50mb', extended: true }));
api.use(bodyParser.json({limit: '50mb'}));
api.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
api.use(cookieParser())
api.use(RoutesController.getReqResMiddleware());
api.use(AuthController.checkToken); //auth token check middleware

//handle all methods and routes
api.all('*', RoutesController.processRoute);

//api start
api.listen(process.env.API_PORT || 3000,function(){
    Utils.log(`server api running on port ${process.env.API_PORT || 3000}`)
});

//init database models
ModelsController.initModels();