const mongoose = require("mongoose");


export const setupMongo = async ({ mongo }) => {
    
    const { protocol, username, password, database, url } = mongo;

    const connectionUri = `${protocol}${username}:${encodeURIComponent(password)}@${url}/${database}?authSource=admin`;
    
    console.log(`\n connectionUri: ${connectionUri}`);

    try {
        await mongoose.connect(connectionUri);
    } catch (err) {
        throw new Error(err);
    };

};