"use strict";

var getDayTime = require('./commons/dayTime');

var fragmentShader = `
precision mediump float;

varying vec3 vColor;

void main () {
    gl_FragColor = vec4(vColor, 1.);
}
`;

var vertexShader = `
attribute vec3 position;
attribute vec3 normal;
attribute vec3 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform mat3 normalMatrix;
uniform vec3 cameraPosition;

uniform float iGlobalTime;

varying vec3 vColor;

vec3 packNormalToRGB( const in vec3 normal ) {
    return normalize( normal ) * 0.5 + 0.5;
}

${getDayTime}

void main () {
    vec4 modelPos = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelPos;
    float dayTime = getDayTime(iGlobalTime * 10.);
    float mixAmount = (clamp((dayTime - 0.5) * 5., -1., 1.) + 1.5) / 2.;

    float dayDist = clamp((20000. - position.y) / (2500. - dayTime * 75.) , 0.1, 0.99);
    float nightDist = clamp((-200.-position.y) / (2200. - dayTime * 75.) , 0.05, 0.995);
    vec3 dayColor = vec3(0.9 + dayTime * 0.14, 0.7 + dayTime * 0.19, 1.10 - dayTime * 0.1) * packNormalToRGB(normalMatrix * normal + normal * 2.75) * (dayDist + pow(dayDist, 1.8) * 2.) / 3.;
    vec3 nightColor = vec3(0.9 + dayTime * 0.15, 0.7 + dayTime * 0.2, 1.15 - dayTime * 0.1) * packNormalToRGB(normalMatrix * normal + normal * 3.0) * (nightDist + pow(nightDist, 1.8) * 2.) / 3.;

    #if ALTERNATECOLORS == 0
    vColor = mix(nightColor, dayColor, mixAmount);
    #else
    vColor = (1. - mix(nightColor, dayColor, 1. - mixAmount)) * (0.5 + dayTime * 0.2);
    #endif
}
`;

module.exports = function makeMaterial (alternateColors) {
    return new THREE.RawShaderMaterial({
        uniforms: {
            iGlobalTime: { type: 'f', value: 0 }
        },
        defines: {
            ALTERNATECOLORS: alternateColors ? 1 : 0
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide,
        transparent: false
    });
};

