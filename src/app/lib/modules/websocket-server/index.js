const WebSocket = require('ws');
const _ = require('lodash');

module.exports = function webSocketServer(content, config, take) {
    const wss = new WebSocket.Server({ port: _.get(config, 'wsPort') });
    wss.on('connection', function connection(ws) {
        try {
            ws.on('message', (message) => {
                take(message).then(({ content }) => {
                    if (content) {
                        ws.send(data)
                    }
                });

            })
        } catch (e) {
            console.log(e)
        }
    });

    console.log(`Web socket listening on ${_.get(config, 'wsPort')}`);
    return wss;
};