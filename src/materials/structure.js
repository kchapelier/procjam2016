"use strict";

var fragmentShader = `
precision highp float;

varying vec3 vFresnelPosition;
varying vec3 vFresnelNormal;
varying float vHeight;

uniform sampler2D tSky;
uniform vec2 iResolution;

const float uFresnelFadeDistance = 0.75;
const float uFresnelRimWidth = 0.25;

float sampleFresnel(float dist) {
    vec3 viewDirectionW = normalize(-vFresnelNormal);
    vec3 eye = normalize(-vFresnelPosition.xyz);
    return (uFresnelRimWidth + dist * 0.05) * clamp((uFresnelFadeDistance + dist * 0.1) - dot(eye, vFresnelNormal), 0.0, 1.0);
}

const vec3 fogColor = vec3(0.0, 0.0, 0.0);

void main () {
    float height = clamp(vHeight, 0., 1.);
    #if FOGGY == 1
    height = min(height, clamp(1. - (vHeight - 1.) / 2., 0., 1.));
    #endif
    float distance = clamp((3000. - length(vFresnelPosition.xz)) / 1000., 0., 1.);
    float fog = max(1. - distance * distance, 1. - height * height);

    float dist = clamp((200. - abs(length(vFresnelPosition) - 200.)) / 200., 0., 1.);
    float fresnel = sampleFresnel(dist) * (1.8 - length(vFresnelPosition.xz) / 2000. - abs(vFresnelPosition.y) / 300.);
    vec3 colorStructure = vec3(length(vFresnelNormal.xz) * 0.0475 + fresnel);

    if (fog > 0.) {
        gl_FragColor = mix(vec4(colorStructure, 1.), texture2D(tSky, gl_FragCoord.xy / iResolution), fog);
    } else {
        gl_FragColor = vec4(colorStructure, 1.);
    }
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
varying float vHeight;

void main () {
    vFresnelNormal = normalize(normalMatrix * normal);

    vec4 modelPos = modelViewMatrix * vec4(position, 1.0);

    vHeight = 1.5 + position.y * 1.5;
    vFresnelPosition = modelPos.xyz;

    gl_Position = projectionMatrix * modelPos;
}
`;

module.exports = function makeMaterial (foggy) {
    return new THREE.RawShaderMaterial({
        uniforms: {
            iResolution: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            tSky: { type: 't', value: null }
        },
        defines: {
            FOGGY: foggy ? 1 : 0
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: false
    });
};

