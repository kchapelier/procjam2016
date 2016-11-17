"use strict";

var fragmentShader = `
precision mediump float;

uniform vec2 iResolution;
uniform sampler2D tSky;

void main () {
    vec2 screenUv = gl_FragCoord.xy / iResolution;

    gl_FragColor = texture2D(tSky, screenUv);
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

void main () {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

module.exports = function makeMaterial () {
    return new THREE.RawShaderMaterial({
        uniforms: {
            iResolution: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            tSky: { type: 't', value: null }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide,
        transparent: false
    });
};

