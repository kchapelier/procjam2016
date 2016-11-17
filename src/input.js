"use strict";

var Input = require('migl-input');

var input = new Input({
    up: {
        keys: ['<up>', 'W', 'Z', '<pad1-button13>', '<pad1-button1>'],
        group: 'axisV'
    },
    down: {
        keys: ['<down>', 'S', '<pad1-button14>', '<pad1-button3>'],
        group: 'axisV'
    },
    left: {
        keys: ['<left>', 'A', 'Q', '<pad1-button15>', '<pad1-axis1-negative>'],
        group: 'axisH'
    },
    right: {
        keys: ['<right>', 'D', '<pad1-button16>', '<pad1-axis1-positive>'],
        group: 'axisH'
    }
});

input.attach();

module.exports = input;
