"use strict";

var sampleWorld = require('./generator/overworld');
    //buildRoadGeometry = require('./generator/road-geometry');

self.addEventListener('message', function onMessage (e) {
    var x = e.data.posX;
    var y = e.data.posY;
    var world = sampleWorld(x, y);

    var roadGeometry = null; //buildRoadGeometry(world.points, world.roads, 6000);

    self.postMessage({
        request: e.data,
        result: {
            world: world,
            roadGeometry: roadGeometry
        }
    });
});

module.exports = self;
