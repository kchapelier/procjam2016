"use strict";

function addNGon (x, y, n, r1, r2, vertices, normals, indices) {
    var indicesBase = vertices.length / 3;

    for (var k = 0; k < n; k++) {
        vertices.push(
            x + Math.sin(k * Math.PI * 2 / n) * r1,
            -300,
            y + Math.cos(k * Math.PI * 2 / n) * r1,
            x + Math.sin(k * Math.PI * 2 / n) * r2,
            -300,
            y + Math.cos(k * Math.PI * 2 / n) * r2
        );

        normals.push(
            0, 1, 0,
            0, 1, 0
        );

        indices.push(
            indicesBase + k * 2 + 1,
            indicesBase + (k * 2 + 2) % (n * 2),
            indicesBase + k * 2,
            indicesBase + (k * 2 + 3) % (n * 2),
            indicesBase + (k * 2 + 2) % (n * 2),
            indicesBase + k * 2 + 1
        );
    }
}

function addLine (x1, y1, x2, y2, width, vertices, normals, indices) {
    var angle = Math.atan2(x1 - x2, y1 - y2);

    indices.push(
        vertices.length / 3 + 0,
        vertices.length / 3 + 1,
        vertices.length / 3 + 2,
        vertices.length / 3 + 3,
        vertices.length / 3 + 0,
        vertices.length / 3 + 2
    );

    vertices.push(
        x1 - Math.sin(angle - Math.PI / 2) * width,
        -300,
        y1 - Math.cos(angle - Math.PI / 2) * width,
        x2 - Math.sin(angle - Math.PI / 2) * width,
        -300,
        y2 - Math.cos(angle - Math.PI / 2) * width,
        x2 + Math.sin(angle - Math.PI / 2) * width,
        -300,
        y2 + Math.cos(angle - Math.PI / 2) * width,
        x1 + Math.sin(angle - Math.PI / 2) * width,
        -300,
        y1 + Math.cos(angle - Math.PI / 2) * width
    );

    normals.push(
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0
    );
}

function buildRoadGeometry (points, roads, scale) {
    var vertices = [],
        normals = [],
        indices = [],
        i,
        point,
        road;


    for (i = 0; i < points.length; i++) {
        point = points[i];

        addNGon(
            point[0] * scale - scale / 2,
            point[1] * scale - scale / 2,
            6,
            0,
            60,
            vertices, normals, indices
        );
    }

    for (i = 0; i < roads.length; i++) {
        road = roads[i];

        addLine(
            road[0] * scale - scale / 2,
            road[1] * scale - scale / 2,
            road[2] * scale - scale / 2,
            road[3] * scale - scale / 2,
            20,
            vertices, normals, indices
        );
    }

    return {
        position: new Float32Array(vertices),
        normal: new Float32Array(normals),
        index: new Uint16Array(indices)
    };
}

module.exports = buildRoadGeometry;
