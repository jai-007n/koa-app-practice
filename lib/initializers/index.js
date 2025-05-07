const {setupRoutes} = require("./setupRoutes")
const {setupMongo} = require("./setupMongo")

module.exports.initializeApp = async (app, config) => {

    // initialize mongodb
    setupMongo(config);
    console.log(`\n ✅ - MongoDB setup and connected...`);
    
    // setup express router
    setupRoutes(app,config);
    
    console.log(`\n ✅ - Express router and app routes setup...`)

};