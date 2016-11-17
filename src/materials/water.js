"use strict";

var getDayTime = require('./commons/dayTime');

var fragmentShader = `
precision mediump float;

varying float vHeight;
varying float vDistance;


uniform highp float iGlobalTime;
uniform vec2 iResolution;
uniform sampler2D tSky;

const vec3 waterColor = vec3(0.7, 0.7, 1.);

${getDayTime}

void main () {
    float dayTime = getDayTime(iGlobalTime);
    float distance = pow(vDistance / 350., 0.8);

    vec3 skyColor = texture2D(tSky, gl_FragCoord.xy / iResolution).xyz;

    vec4 dayColor = vec4(mix(vec3(0.25, 0.25, 0.29) + skyColor * 1.25, vec3(0.,0.,0.05) + skyColor * waterColor * 1.35, vHeight), 0.35 + 0.3 * distance + vHeight * 0.18);
    vec4 nightColor = vec4(mix(vec3(0.10, 0.10, 0.15) + skyColor * 1.2, vec3(0.06, 0.06, 0.08) + skyColor * 1.4, vHeight), 0.2 + 0.4 * distance + vHeight * 0.26);

    gl_FragColor = mix(nightColor, dayColor, dayTime);

    gl_FragColor.a =  gl_FragColor.a * clamp(3. - vDistance / 1000., 0., 1.);
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

    vHeight = (sin((position.x + iOffset.x + iGlobalTime * 1.13) / 533.) * cos((position.y - iOffset.z + iGlobalTime * .2) / 227.) + 1.) * 0.5;
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
        side: THREE.DoubleSide,
        transparent: true
    });
};

