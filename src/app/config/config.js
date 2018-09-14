module.exports = {
    instances: [{
        name: 'WebServer',
        module: 'web-server',
        chain: [{
            name: 'Static files',
            module: 'web-static',
            config: {
                path: 'dist',
                index: 'index.html'
            }
        }],
        config: {
            port: 8010,
            bodyParser: {
                json: {
                    limit: "50mb"
                },
                urlencoded: {
                    extended: true
                }
            },
        },
    }],
};
