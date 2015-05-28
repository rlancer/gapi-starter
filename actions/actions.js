/* @flow */
"use strict";
var shared = require('../shared.js');
var events = require('events');
var emitter = new events.EventEmitter();

module.exports = {
    state: {},
}
