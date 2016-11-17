"use strict";

var fragmentShader = `
precision mediump float;

varying float vHeight;
varying float vDistance;

uniform vec2 iResolution;
uniform sampler2D tSky;

void main () {
    vec2 perturbedSkyUv = vec2(gl_FragCoord.x * 0.6, gl_FragCoord.y) / iResolution + vec2(0.4, 0.);
    vec3 perturbedSkyColor = texture2D(tSky, perturbedSkyUv).xyz;
    vec3 skyColor = texture2D(tSky, gl_FragCoord.xy / iResolution).xyz;
    float alpha = pow(clamp(1. - vDistance / 3000., 0., 1.), 1.4);
    gl_FragColor = vec4(skyColor * (1.2 - vHeight) + perturbedSkyColor * (0.5 + vHeight * vHeight * 1.2), alpha * 0.95);
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
uniform vec3 iOffset;

//varying vec3 vNormal;
//varying vec3 vUv;
varying float vHeight;
varying float vDistance;

void main () {
    //vUv = uv;
    //vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelViewMatrix * vec4(position, 1.0);
    vec4 worldOffset = modelViewMatrix * vec4(iOffset, 1.0);
    gl_Position = projectionMatrix * worldPosition;

    vHeight = (sin((position.x * (0.9 + sin(iGlobalTime * 0.007 + position.y * 0.01) * 0.03) + iOffset.x * 0.9 + iGlobalTime * 1.) / 523.) * cos((position.y * (0.9 + sin(iGlobalTime * 0.016 + position.x * 0.01) * 0.03) - iOffset.z * 0.9 + iGlobalTime * .14) / 237.) + 1.) * 0.5;
    gl_Position.y -= vHeight * 100.;
    vDistance = length(position);
}
`;

module.exports = function makeMaterial () {
    return new THREE.RawShaderMaterial({
        uniforms: {
            iGlobalTime: { type: 'f', value: 0 },
            iOffset: { type: 'v3', value: new THREE.Vector3(0) },
            iResolution: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            tSky: { type: 't', value: null }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true
    });
};

