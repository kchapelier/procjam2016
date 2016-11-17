"use strict";

var models = require('../../assets/models/compiled.json');

var geometries = [
    null,
    models['assets/models/cover.obj'],
    models['assets/models/peak.obj'],
    models['assets/models/twofaces.obj'],
    models['assets/models/corner.obj'],
    models['assets/models/protrude.obj'],
    models['assets/models/protrudeleft.obj'],
    models['assets/models/protrudeleft.obj'],
    models['assets/models/oneface.obj']
];

var accessoryGeometries = [
    models['assets/models/accessory2.obj'],
    models['assets/models/accessory2.obj'],
    models['assets/models/accessory2.obj']
];

function generate (pattern, size) {
    var indices = [],
        nbVerticesTotal = 0,
        vertices = [],
        normals = [],
        i,
        x,
        y;

    for (i = 0; i < pattern.length; i++) {
        y = i / size | 0;
        x = i % size;

        if (pattern[i] > 0) {
            // first 4 bytes stores the tile, last 4 bytes stores it's orientation
            var orientation = pattern[i] >> 4,
                tile = pattern[i] & 0x0F;

            var indicesBase = nbVerticesTotal;

            if (tile >= 12) {
                /*
                if (Math.random() > 0.) {
                    var obj = accessoryGeometries[Math.random() * 3 | 0],
                        nbVertices = obj.vertices.length / 3,
                        k;

                    orientation += (Math.random() * 2 | 0) * 2;

                    for (k = 0; k < nbVertices; k++) {
                        var vdist = Math.sqrt(obj.vertices[k * 3] * obj.vertices[k * 3] + obj.vertices[k * 3 + 2] * obj.vertices[k * 3 + 2]),
                            vangle = Math.atan2(obj.vertices[k * 3], obj.vertices[k * 3 + 2]) + orientation * Math.PI / 2,
                            ndist = Math.sqrt(obj.normals[k * 3] * obj.normals[k * 3] + obj.normals[k * 3 + 2] * obj.normals[k * 3 + 2]),
                            nangle = Math.atan2(obj.normals[k * 3], obj.normals[k * 3 + 2]) + orientation * Math.PI / 2,
                            vx = Math.round((Math.sin(vangle) * vdist + x * 2 - size) * 100000) / 100000,
                            vy = Math.round((obj.vertices[k * 3 + 1]) * 100000) / 100000 - Math.random() * 1.,
                            vz = Math.round((Math.cos(vangle) * vdist + y * 2 - size) * 100000) / 100000,
                            nx = Math.sin(nangle) * ndist,
                            ny = obj.normals[k * 3 + 1],
                            nz = Math.cos(nangle) * ndist;

                        vertices.push(vx, vy, vz);
                        normals.push(nx, ny, nz);
                    }

                    nbVerticesTotal = nbVerticesTotal + nbVertices;

                    for (k = 0; k < obj.indices.length; k++) {
                        indices.push(indicesBase + obj.indices[k]);
                    }
                }
                */
            } else {
                var obj = geometries[tile],
                    nbVertices = obj.vertices.length / 3,
                    k;

                for (k = 0; k < nbVertices; k++) {
                    var vdist = Math.sqrt(obj.vertices[k * 3] * obj.vertices[k * 3] + obj.vertices[k * 3 + 2] * obj.vertices[k * 3 + 2]),
                        vangle = Math.atan2(obj.vertices[k * 3], obj.vertices[k * 3 + 2]) + orientation * Math.PI / 2,
                        ndist = Math.sqrt(obj.normals[k * 3] * obj.normals[k * 3] + obj.normals[k * 3 + 2] * obj.normals[k * 3 + 2]),
                        nangle = Math.atan2(obj.normals[k * 3], obj.normals[k * 3 + 2]) + orientation * Math.PI / 2,
                        vx = Math.round((Math.sin(vangle) * vdist + x * 2 - size) * 100000) / 100000,
                        vy = Math.round((obj.vertices[k * 3 + 1]) * 100000) / 100000,
                        vz = Math.round((Math.cos(vangle) * vdist + y * 2 - size) * 100000) / 100000,
                        nx = Math.sin(nangle) * ndist,
                        ny = obj.normals[k * 3 + 1],
                        nz = Math.cos(nangle) * ndist;

                    vertices.push(vx, vy, vz);
                    normals.push(nx, ny, nz);
                }

                nbVerticesTotal = nbVerticesTotal + nbVertices;

                for (k = 0; k < obj.indices.length; k++) {
                    indices.push(indicesBase + obj.indices[k]);
                }
            }
        }
    }

    return {
        position: (new Float32Array(vertices)).buffer,
        normal: (new Float32Array(normals)).buffer,
        index: (new Uint16Array(indices)).buffer
    };
}

module.exports = generate;
