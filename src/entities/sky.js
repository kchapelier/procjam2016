"use strict";

var makeSkyMaterial = require('../materials/sky'),
    makeSkyCopyMaterial = require('../materials/sky-copy');

var Sky = function WaterPlane () {
    this.geometry = new THREE.SphereBufferGeometry(3200, 32, 24); //lowperf 10, 10
    this.material = makeSkyMaterial(false);
    this.materialCopy = makeSkyCopyMaterial();

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = Math.PI;

    this.meshCopy = new THREE.Mesh(this.geometry, this.materialCopy);
    this.meshCopy.rotation.x = Math.PI;
};

Sky.prototype.followPlayer = function (player) {
    this.mesh.position.x = player.position.x;
    this.mesh.position.z = player.position.z;
    this.meshCopy.position.x = player.position.x;
    this.meshCopy.position.z = player.position.z;
};

Sky.prototype.update = function (deltaTime) {
    this.material.uniforms.iGlobalTime.value += deltaTime;
};

Sky.prototype.resize = function (width, height) {
    this.materialCopy.uniforms.iResolution.value.set(width, height);
};

Sky.prototype.setSkyTexture = function (texture) {
    this.materialCopy.uniforms.tSky.value = texture;
};

module.exports = Sky;
