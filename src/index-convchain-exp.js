"use strict";

function createWorker (script) {
    var now = Date.now();

    return new Worker(script + '?cache=' + now);
}

var worker = createWorker('./build/worker-convchain-exp.js');

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

var styles = [
    'white',
    'black',
    'blue',
    'green',
    'red',
    '#888888',
    '#DDDD00',
    'cyan',
    '#FF9999',
    '#E0E0FF'
];

worker.addEventListener('message', function (e) {
    var result = e.data.result.pattern,
        size = e.data.request.size;

    for (var i = 0; i < result.length; i++) {
        var y = i / size | 0,
            x = i % size;

        if (result[i]) {
            var tile = result[i] & 0x0F;

            if (tile && tile < 12) {
                context.fillStyle = styles[tile];
                context.fillRect(x * 4, y * 4, 4, 4);
            }
        }
    }
});

module.exports = function (size) {
    worker.postMessage({
        size: size * 2.5,
        posX: 0,
        posY: 0
    })
};
