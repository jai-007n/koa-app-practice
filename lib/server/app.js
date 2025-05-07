const koa = require('koa');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('config');
const { koaBody } = require('koa-body');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static')
const path = require('path')

const {libConfig}=require("../config");
const { initializeApp } = require('../initializers/index.js');

module.exports = class App {

    constructor() {
        this.app =new koa();
        if (!config.get('JWT_PRIVATE_KEY')) {
            console.log('FATAL ERROR : jwtPrivateKey is not defined')
            process.exit()
        }
        // this.app.use(cors({
        //     origin: '*',
        //     preflightContinue: true,
        //     methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'],
        //     allowedHeaders: ['Origin', 'X-Requested-With', 'content-disposition',
        //         'Content-Type', 'Accept', 'Authorization', 'x-auth-token', 'x-time-zone', 'x-hmac-token']
        // }));
        // this.app.use(koaBody());
        // this.app.use(express.urlencoded({extended: true}));

        // const debug = require('debug')('app:startUp')
        // if (this.app.get('env') === 'development') {
        //     this.app.use(morgan('tiny'))
        //     debug('Morgan Enabled')
        // }

        // this.app.use(cookieParser());
        // this.app.use(express.static(path.join(__dirname, 'public')));
        // this.app.use(mount('/public ',serve(path.join(__dirname, '/static'))))
        this.app.use(serve(path.join(__dirname, '/public')))

        // this.app.use(bodyParser());
       
        // this.setRoutes();
        this.initializeSetup()
    }


    initializeSetup(){
        initializeApp(this.app,libConfig)
    }

    setRoutes() {
        this.app.use(v1Routes);
        // error handler
        // this.app.use(function (err, req, res, next) {
        //     if (err) {
        //         return res.status(err.code || 500).json({
        //             status: false,
        //             code: err.code || 500,
        //             message: err.message || "something went wrong",
        //         });
        //     }
        //     next()
        // });
    }

    getApp() {
        return this.app;
    }

    getEnv() {
        return this.app.get('env');
    }

    listen() {
        const PORT = libConfig?.port || 5000;
        this.app.listen(PORT, () => {
            console.log(`Listening at PORT ${PORT}`);
        });
    }
}




