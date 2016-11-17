"use strict";

function createWorker (script) {
    var now = Date.now();

    return new Worker(script + '?cache=' + now);
}

var samplingSize = 300;

var worker = createWorker('./build/worker-pds-exp.js');

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

worker.addEventListener('message', function (e) {
    console.log(Date.now() - e.data.request.time);
    console.log(e.data);

    var positionX = e.data.request.posX,
        positionY = e.data.request.posY,
        result = e.data.result,
        points = result.world.points,
        roads = result.world.roads;

    console.log(result);

    context.clearRect(positionX * samplingSize, positionY * samplingSize, samplingSize, samplingSize);

    var i;

    context.lineWidth = 0.5;

    /*
    for (i = 0; i < roads.length; i++) {
        context.beginPath();
        context.moveTo(roads[i][0] * samplingSize + positionX * samplingSize, roads[i][1] * samplingSize + positionY * samplingSize);
        context.lineTo(roads[i][2] * samplingSize + positionX * samplingSize, roads[i][3] * samplingSize + positionY * samplingSize);
        context.stroke();
    }
    */

    for (i = 0; i < points.length; i++) {
        context.fillRect(points[i][0] * samplingSize + positionX * samplingSize - 1, points[i][1] * samplingSize + positionY * samplingSize - 1, 2, 2);
    }
});

module.exports = function (positionX, positionY) {
    positionX = positionX || 0;
    positionY = positionY || 0;

    worker.postMessage({ posX: positionX, posY: positionY, time: Date.now() });
};
