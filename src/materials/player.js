"use strict";

var fragmentShader = `
precision highp float;

varying vec3 vFresnelPosition;
varying vec3 vFresnelNormal;

uniform sampler2D tSky;
uniform vec2 iResolution;

const float uFresnelFadeDistance = 0.75;
const float uFresnelRimWidth = 0.25;

float sampleFresnel() {
    vec3 viewDirectionW = normalize(-vFresnelNormal);
    vec3 eye = normalize(-vFresnelPosition.xyz);
    return (uFresnelRimWidth) * clamp((uFresnelFadeDistance) - dot(eye, vFresnelNormal), 0.0, 1.0);
}

void main () {
    float fresnel = sampleFresnel();
    vec3 colorStructure = vec3(length(vFresnelNormal.xz) * 0.025 + pow(fresnel, 0.85 + fresnel * 0.3));

    gl_FragColor = vec4(colorStructure, 1.);
}
`;

var vertexShader = `
precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec3 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform mat3 normalMatrix;
uniform vec3 cameraPosition;

varying vec3 vFresnelPosition;
varying vec3 vFresnelNormal;

void main () {
    vFresnelNormal = normalize(normalMatrix * normal);

    vec4 modelPos = modelViewMatrix * vec4(position, 1.0);

    vFresnelPosition = modelPos.xyz;

    gl_Position = projectionMatrix * modelPos;
}
`;

module.exports = function makeMaterial (depthFog) {
    return new THREE.RawShaderMaterial({
        uniforms: {
            iResolution: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            tSky: { type: 't', value: null },
            iDepthFog: { type: 'b', value: depthFog }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: false
    });
};

