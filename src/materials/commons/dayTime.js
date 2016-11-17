"use strict";

module.exports = `

float getDayTime (const in float globalTime) {
    return (cos(globalTime / 400000.) + 1.) * 0.5;
}
`;
