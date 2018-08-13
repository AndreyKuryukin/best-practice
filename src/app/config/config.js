module.exports = {
    instances: [{
        name: 'Эхо сервер',
        module: 'websocket-server',
        chain: [{
            name: 'echo',
            module: 'echo',
            config: {
                timeout: 2000,
            }
        }, {
            name: 'uppercase',
            module: 'uppercase',
        }, {
            name: 'reverse',
            module: 'reverse',
        }],
        config: {
            wsPort: 8001,
            path: './dist',
            bodyParser: {
                json: {
                    limit: "50mb"
                }
            },
            urlencoded: {
                extended: true
            }
        },
    }],
};
