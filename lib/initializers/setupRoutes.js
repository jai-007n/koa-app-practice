const {initializeRoutes}  = require("../../routes/index.js")


function setupRoutes(app)  {
    initializeRoutes(app)
};

module.exports.setupRoutes = setupRoutes