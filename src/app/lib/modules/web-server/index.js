const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

module.exports = function webServer(content, config, take) {
    const ws = express();
    const json = _.get(config, 'bodyParser.json', {});
    const urlencoded = _.get(config, 'bodyParser.urlencoded', {});
    ws.use(bodyParser.json(json));
    ws.use(bodyParser.urlencoded(urlencoded));
    ws.all('*', function (req, res, next) {
        take({req, res, next}).catch((e) => console.error(e))
    });
    ws.listen(_.get(config, 'port'), () => {
        console.log(`Listening on ${_.get(config, 'port')}`);
    });
    return ws;
};