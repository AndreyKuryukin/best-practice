const express = require('express');
const _ = require('lodash');
const path = require('path');

let staticHandler;

module.exports = function webStatic({req, res, next}, config, take) {
    if (!staticHandler) {
        staticHandler = express.static( path.resolve(process.cwd(), _.get(config, 'path', '/')), {
            index: _.get(config, 'index', 'index.html'),
        });
    } else {
        staticHandler(req, res, next);
    }
    take({req, res, next})
};