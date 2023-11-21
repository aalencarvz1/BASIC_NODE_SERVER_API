const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../../database/models/Users");
const { AccessesProfiles } = require("../../database/models/AccessesProfiles");
const { UsersTokens } = require("../../database/models/UsersTokens");
const { Utils } = require("../../helpers/Utils");


/**
 * class to handle authentication
 */
class AuthController{

    static #cryptSalt = 10;    

    /**
     * unsecure routes
     */
    static #unsecureRoutes = [
        "/api/auth/login",
        "/api/auth/token/refresh",
        "/api/auth/register"
    ];

    static getCryptSalt(){
        return AuthController.#cryptSalt;
    }

    /**
     * api login method
     * @returns object with token
     */
    static async login(req,res,next) {
        let body = req.body || {};
        Utils.log(req.method,body);
        if (!body.email || !body.password) return res.sendResponse(401,false,'missing data');
        let user = await Users.getModel().findOne({where:{email:body.email}});
        if (!user) return res.sendResponse(401,false,'user not found'); 
        if (!bcrypt.compareSync(body.password, user.PASSWORD)) return res.sendResponse(401,false,'password not math'); 
        let token = jwt.sign({ID: user.ID},process.env.API_SECRET || 'secret', {expiresIn:process.env.API_TOKEN_EXPIRATION || '1h'});
        let refreshToken = jwt.sign({ID: user.ID}, process.env.API_REFRESH_SECRET || 'secret2', {expiresIn:process.env.API_REFRESH_TOKEN_EXPIRATION || '1d'}); 
        
        user.LASTTOKEN = token;
        user.LASTTIMEZONEOFFSET = body?.currentTimeZoneOffset || 0;
        await user.save();

        let userToken = await UsersTokens.getModel().findOne({
            IDUSER: user.ID,
            TOKEN: token            
        })
        if (!userToken) {
            await UsersTokens.getModel().create({
                IDUSER: user.ID,
                TOKEN: token,
                TIMEZONEOFFSET: user.LASTTIMEZONEOFFSET
            });
        } else {
            userToken.TIMEZONEOFFSET = user.LASTTIMEZONEOFFSET;
            await userToken.save();
        }

        res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 })
            .header('Authorization', token) //web applications use header, but others applications like mobile or direct request from database triggers, use only body
            .sendResponse(200,true,'logged',{token:token});
    }


    /**
     * api refreshToken method
     * @returns object with token
     */
    static async refreshToken(req,res,next) {
        console.log('cokies',req.cookies);
        let refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({success:false,message:'no refresh token'});
        jwt.verify(refreshToken,process.env.API_REFRESH_SECRET || 'secret2',async function(error,decoded) {
            if (error) return res.status(401).json({success:false,message:error.message || error});
            req.user = {ID:decoded.ID};  
            console.log("in refresh token",req.user,decoded);

            
            let token = jwt.sign({ID: decoded.ID},process.env.API_SECRET || 'secret', {expiresIn:process.env.API_TOKEN_EXPIRATION || '1h'});

            let user = await Users.getModel().findOne({where:{ID:req.user.ID}});
            if (!user) return res.sendResponse(401,false,'user not found'); 
            user.LASTTOKEN = token;
            user.LASTTIMEZONEOFFSET = req.body?.currentTimeZoneOffset || 0;
            await user.save();

            let userToken = await UsersTokens.getModel().findOne({
                IDUSER: user.ID,
                TOKEN: token            
            });
            console.log('userToken',userToken);
            if (!userToken) {
                await UsersTokens.getModel().create({
                    IDUSER: user.ID,
                    TOKEN: token,
                    TIMEZONEOFFSET: user.LASTTIMEZONEOFFSET
                });
            } else {
                userToken.TIMEZONEOFFSET = user.LASTTIMEZONEOFFSET;
                await userToken.save();
            }

            res.header('Authorization', token) //web applications use header, but others applications like mobile or direct request from database triggers, use only body
                .sendResponse(200,true,'logged',{token:token});
            
            //next();
        });
        
    }

    /**
     * api register method
     * @returns object with token
     */
    static async register(req,res,next) {
        let body = req.body || {};
        Utils.log(req.method,body);
        if (!body.email || !body.password) return res.sendResponse(401,false,'missing data');
        if (body.password.trim().length < 8) return res.sendResponse(401,false,'password < 8');
        let user = await Users.getModel().findOne({where:{email:body.email}},{raw:true});
        if (user) return res.sendResponse(401,false,'user already register'); 
        user = await Users.getModel().create({
            IDUSERCREATE : Users.SYSTEM,
            IDACCESSPROFILE : AccessesProfiles.DEFAULT,
            EMAIL:req.body.email,
            PASSWORD: bcrypt.hashSync(req.body.password,AuthController.getCryptSalt())
        });
        let token = jwt.sign({ID: user.ID},process.env.API_SECRET || 'secret', {expiresIn:process.env.API_TOKEN_EXPIRATION || '1h'});
        let refreshToken = jwt.sign({ID: user.ID}, process.env.API_REFRESH_SECRET || 'secret2', {expiresIn:process.env.API_REFRESH_TOKEN_EXPIRATION || '1d'}); 

        user.LASTTOKEN = token;
        user.LASTTIMEZONEOFFSET = req.body?.currentTimeZoneOffset || 0;
        await user.save();

        await UsersTokens.getModel().create({
            IDUSER: user.ID,
            TOKEN: token,
            TIMEZONEOFFSET: user.LASTTIMEZONEOFFSET
        });

        res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 })
            .header('Authorization', token) //web applications use header, but others applications like mobile or direct request from database triggers, use only body
            .sendResponse(200,true,'logged',{token:token});       
    }

    /**
     * middleware check autorization, called by all routes (app.use)
     */
    static checkToken(req,res,next) {
        if (AuthController.#unsecureRoutes.indexOf(req.url) > -1
            || req.url.indexOf('/public/') > -1
        ) {
            //unsecure route
            next(); 
        } else {       
            //secure route 
            let token = req.headers['x-access-token'];
            if (!token) return res.status(401).json({success:false,message:'no token'});
            jwt.verify(token,process.env.API_SECRET || 'secret',function(error,decoded) {
                if (error) return res.status(401).json({success:false,message:error.message || error});
                req.user = {ID:decoded.ID};                
                next();
            });
        }
    }
}

module.exports = {AuthController}