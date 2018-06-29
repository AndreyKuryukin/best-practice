const WebSocket = require('ws');
const path = require('path');
const app = require('express')();
const bodyParser = require('body-parser');
const config = require(path.resolve(__dirname, 'lib/config'))(path.resolve(__dirname, 'config/default.json'));

const wss = new WebSocket.Server({port: config.get('WEB.port')});

wss.on('connection', function connection(ws) {
    try {
        ws.on('message', (message) => {
            console.log('MESSAGE  - ' + message);
            ws.send(message);
        })
    } catch (e) {
        console.log(e)
    }
});


app.use(bodyParser.json(config.get('APP.bodyParser')));
app.use(bodyParser.urlencoded(config.get('APP.urlencoded')));

app.listen(config.get('APP.port'), () => {
    console.log(`Listening on ${config.get('WEB.port')}`)
});

