const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const PORT = 8081;

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server});
const wss = new WebSocket.Server({ port: PORT});

wss.on('connection', function connection(ws) {
    console.log('CONNECTED');
    ws.on('message', function incoming(message) {
        console.log('MESSAGE  - ' + message);
        ws.send(message);
    });
});

// app.use(express.static('../dist'));
//
// server.listen(PORT, () => {
//     console.log(`Listening on ${PORT}`);
// });