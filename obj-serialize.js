"use strict";

var glob = require('glob'),
    fs = require('fs'),
    objParser = require('wavefront-obj-parser');

function serializeIndividual (objString) {
    var objData = objParser(objString),
        nbPolygons = objData.vertexIndex.length / 4, // the parser always return indices by group of 4 to support quads
        indicesMapping = [],
        indices = [],
        vertices = [],
        normals = [],
        i,
        k,
        vertexIndex,
        normalIndex,
        mapped,
        index;

    for (i = 0; i < nbPolygons; i++) {
        for (k = 0; k < 3; k++) { // assume we don't have actual quads in the models
            vertexIndex = objData.vertexIndex[i * 4 + k];
            normalIndex = objData.normalIndex[i * 4 + k];
            mapped = vertexIndex + ',' + normalIndex;
            index = indicesMapping.indexOf(mapped);

            if (index === -1) {
                index = indicesMapping.length;
                indicesMapping.push(mapped);

                normals.push(
                    objData.normal[normalIndex * 3],
                    objData.normal[normalIndex * 3 + 1],
                    objData.normal[normalIndex * 3 + 2]
                );

                vertices.push(
                    objData.vertex[vertexIndex * 3],
                    objData.vertex[vertexIndex * 3 + 1],
                    objData.vertex[vertexIndex * 3 + 2]
                );
            }

            indices.push(index);
        }
    }

    return {
        indices: indices,
        vertices: vertices,
        normals: normals
    };
}


glob("assets/models/*.obj", {}, function (er, files) {
    var data = {};

    files.forEach(function (file) {
        data[file] = serializeIndividual(fs.readFileSync(file, 'utf8'));
    });

    console.log(JSON.stringify(data));
});
