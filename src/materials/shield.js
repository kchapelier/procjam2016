"use strict";

var fragmentShader = `
precision mediump float;

varying vec3 vNormal;

uniform float iGlobalTime;
uniform float iHitTime;

const vec3 hitPos = vec3(0.5, 0.4, 0.);
const vec3 hitPos2 = vec3(-0.93, -0.4, -0.4);

void main () {
    float delta = iHitTime - iGlobalTime;

    if (delta > -666.) {
        float dist = (sin(distance(vNormal, hitPos) * 3. - iGlobalTime * 0.012) + 1.) * 0.5;
        dist *= (sin(distance(vNormal, hitPos2) * 50. - delta * 0.0026) + 1.) * 0.5;
        gl_FragColor = vec4(vec3(0.7 + 0.3 * dist), dist * dist * 0.8);
    } else {
        gl_FragColor = vec4(1., 1., 1., 0.);
    }
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

varying vec3 vNormal;

void main () {
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * worldPosition;
}
`;

module.exports = function makeMaterial () {
    return new THREE.RawShaderMaterial({
        uniforms: {
            iGlobalTime: { type: 'f', value: 0 },
            iHitTime: { type: 'f', value: -99999 }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        side: THREE.DoubleSide
    });
};

