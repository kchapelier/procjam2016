"use strict";

var generatePattern = require('./generator/structure-pattern'),
    generateStructureGeometry = require('./generator/structure-geometry');

self.addEventListener('message', function onMessage (e) {
    var size = e.data.size;

    var pattern = generatePattern(size);

    var response = {
        request: e.data,
        result: {
            //pattern: pattern,
            geometry: generateStructureGeometry(pattern, size)
        }
    };

    self.postMessage(response, [
        response.result.geometry.position,
        response.result.geometry.normal,
        response.result.geometry.index
    ]);
});

module.exports = self;
