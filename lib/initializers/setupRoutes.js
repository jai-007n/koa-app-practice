const {initializeRoutes}  = require("../../routes/index.js")


function setupRoutes(app)  {

    initializeRoutes(app)

    // app.use(router.routes());
    // app.use(router.allowedMethods());
};

module.exports.setupRoutes = setupRoutes