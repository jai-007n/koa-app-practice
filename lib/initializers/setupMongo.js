const mongoose = require("mongoose");

async function setupMongo(config) {
    const { protocol, username, password, database, url,host } = config.mongo;

    
    let connectionUri;
    if (username && password) {
        connectionUri = `${protocol}${username}:${encodeURIComponent(password)}@${url}/${database}?authSource=admin`;
    } else {
        connectionUri = `${protocol}${host}/${database}`;
    }
    console.log(`\n connectionUri: ${connectionUri}`);

    try {
        await mongoose.connect(connectionUri);
    } catch (err) {
        throw new Error(err);
    };

}
module.exports.setupMongo = setupMongo