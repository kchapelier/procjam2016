"use strict";

var ConvChain = require('convchain');

/*
var sample = Uint8Array.from([
    0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1,
    0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
    0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0
]);

var sample2 = Uint8Array.from([
    1, 1, 0, 1, 1,
    1, 0, 0, 1, 1,
    0, 0, 0, 0, 0,
    1, 0, 0, 0, 1,
    1, 1, 0, 1, 1
]);

var sample3 = Uint8Array.from([
    0, 0, 0, 1, 1,
    0, 0, 1, 1, 0,
    0, 1, 1, 0, 0,
    1, 1, 0, 0, 0,
    1, 0, 0, 0, 0
]);
*/

var sample4 = Uint8Array.from([1,1,1,1,1,0,0,0,0,1,1,1,0,1,1,0,1,0,0,0,1,0,1,1,0,1,0,0,0,0,0,0,1,0,1,1,1,0,1,0,0,0,0,1,1,1,0,1,1,0,0,0,0,0,1,0,1,1,1,1,0,1,0,0,1,1,1,0,1,1,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,1,1,1,0,1,0,1,0,0,1,1,1,1,1,0,1,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,1,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,1,0,1,0,1,1,1,1,1,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,1,1,0,1,1,1,1,1,1,0,1,1,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,0]);

var sample5 = Uint8Array.from([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,0,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,0,0,0,0,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0]);

var sample6 = Uint8Array.from([0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,1,0,1,1,1,0,0,1,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,1,1,1,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,0,0,1,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,0,0,1,1,0,1,0,1,0,1,0,0,0,0,0,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1]);

var sample7 = Uint8Array.from([1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1]);

var sample8 = Uint8Array.from([0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,0,0,0,0,0,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,1,1,0,1,1,1]);

var ccs = [
    new ConvChain(sample4, [16, 16]),
    new ConvChain(sample5, [16, 16]),
    new ConvChain(sample6, [18, 18]),
    new ConvChain(sample7, [16, 16]),
    new ConvChain(sample8, [14, 16])
];

// based off http://iquilezles.org/www/articles/distfunctions/distfunctions.htm

function hexMask (x, y, size) {
    size = size / 2;
    x = Math.abs(x - size);
    y = Math.abs(y - size);

    return Math.max(x * 0.866025 + y * 0.5, y) - size * 0.86601;
}

function lozengeMask (x, y, size) {
    size = size / 2;
    x = Math.abs(x - size);
    y = Math.abs(y - size);

    return Math.max(x * 0.866025 + y * 0.5, -y) - size * 0.5;
}

function triangleMask (x, y, size) {
    size = size / 2;
    x = x - size;
    y = size - y;
    var ax = Math.abs(x),
        ay = Math.abs(y);

    return Math.max(ax * 0.866025 + y * 0.5, -y) - size * 0.5;
}


function generate(size) {
    var result = ccs[Math.random() * ccs.length | 0].generate([size, size], 3, 0, 6),
        size_2 = size / 2 | 0,
        i,
        x,
        y;

    // circle shape
    for (i = 0; i < result.length; i++) {
        y = i / size | 0;
        x = i % size;

        if (hexMask(x, y, size) > 0.) {
            result[i] = 0;
        }
    }


    for (i = 0; i < result.length; i++) {

        if (result[i]) {
            y = i / size | 0;
            x = i % size;

            var countNeighbours = 0,
                right = x < size - 1 && result[y * size + x + 1] > 0,
                left = x > 0 && result[y * size + x - 1] > 0,
                up = y > 0 && result[(y - 1) * size + x] > 0,
                down = y < size - 1 && result[(y + 1) * size + x] > 0;

            if (!(right || left || up || down)) {
                // remove solitary cells
                result[i] = 0;
            } else {
                var upRight = x < size - 1 && y > 0 && result[(y - 1) * size + x + 1] > 0,
                    upLeft = x > 0 && y > 0 && result[(y - 1) * size + x - 1] > 0,
                    downRight = x < size - 1 && y < size - 1 && result[(y + 1) * size + x + 1] > 0,
                    downLeft = x > 0 && y < size - 1 && result[(y + 1) * size + x - 1] > 0;

                // kinda marching squares
                // warning huge if !

                if (up && !right && !down && !left && !upRight && !upLeft) {
                    result[i] = 2 + (3 << 4);
                } else if (down && !right && !up && !left && !downRight && !downLeft) {
                    result[i] = 2 + (1 << 4);
                } else if (left && !right && !up && !down && !upLeft && !downLeft) {
                    result[i] = 2 + (4 << 4);
                } else if (right && !left && !up && !down && !upRight && !downRight) {
                    result[i] = 2 + (2 << 4);
                } else

                if (up && !right && down && !left) {
                    result[i] = 3 + (1 << 4);
                } else if (!down && right && !up && left) {
                    result[i] = 3;
                } else

                if (up && right && !down && !left) {
                    result[i] = 4 + (3 << 4);
                } else if (!up && right && down && !left) {
                    result[i] = 4 + (2 << 4);
                } else if (!up && !right && down && left) {
                    result[i] = 4 + (1 << 4);
                } else if (up && !right && !down && left) {
                    result[i] = 4 + (4 << 4);
                } else

                if (up && !right && !down && !left && upRight && upLeft) {
                    result[i] = 5;
                } else if (down && !right && !up && !left && downRight && downLeft) {
                    result[i] = 5 + (2 << 4);
                } else if (left && !right && !up && !down && upLeft && downLeft) {
                    result[i] = 5 + (1 << 4);
                } else if (right && !left && !up && !down && upRight && downRight) {
                    result[i] = 6 + (3 << 4);
                } else

                if (up && !right && !down && !left && !upRight && upLeft) {
                    result[i] = 6;
                } else if (down && !right && !up && !left && downRight && !downLeft) {
                    result[i] = 6 + (2 << 4);
                } else if (left && !right && !up && !down && !upLeft && downLeft) {
                    result[i] = 6 + (1 << 4);
                } else if (right && !left && !up && !down && upRight && !downRight) {
                    result[i] = 6 + (3 << 4);
                } else

                if (up && !right && !down && !left && upRight && !upLeft) {
                    result[i] = 7;
                } else if (down && !right && !up && !left && !downRight && downLeft) {
                    result[i] = 7 + (2 << 4);
                } else if (left && !right && !up && !down && upLeft && !downLeft) {
                    result[i] = 7 + (1 << 4);
                } else if (right && !left && !up && !down && !upRight && downRight) {
                    result[i] = 7 + (3 << 4);
                } else

                if (up && right && !down && left) {
                    result[i] = 8 + (4 << 4);
                } else if (down && right && !up && left) {
                    result[i] = 8 + (2 << 4);
                } else if (left && !right && up && down) {
                    result[i] = 8 + (1 << 4);
                } else if (right && !left && up && down) {
                    result[i] = 8 + (3 << 4);
                }
            }
        }
    }

    //identify straight corridors
    //this is not actually used yet
    /*
    for (i = 0; i < result.length; i++) {
        if (result[i] === 0 && Math.sin(i * 28007543.) > -1.) {
            y = i / size | 0;
            x = i % size;

            var right = x < size - 1 ? result[y * size + x + 1] & 0x0F : 0,
                left = x > 0 ? result[y * size + x - 1] & 0x0F : 0,
                up = y > 0 ? result[(y - 1) * size + x] & 0x0F : 0,
                down = y < size - 1 ? result[(y + 1) * size + x] & 0x0F : 0;

            if ((right === 3 || right === 8) && (left === 3 || left === 8)) {
                result[i] = 12 + (1 << 4);
            } else if ((up === 3 || up === 8) && (down === 3 || down === 8)) {
                result[i] = 12;
            }
        }
    }
    */

    return result;
}

module.exports = generate;
