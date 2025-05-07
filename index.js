(async () => {
    try {
        // const db = new Database(config.get('environment'), dbConfig);
        // await db.connect();

        const App = require('./lib/server/app');
        const app = new App();
        app.listen();
    } catch (err) {
        console.error(
            'Something went wrong when initializing the server:\n',
            err.stack
        );
    }
})();