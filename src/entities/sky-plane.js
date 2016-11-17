"use strict";

var makeSkyPlaneMaterial = require('../materials/sky-plane');

var SkyPlane = function SkyPlane () {
    this.geometry = new THREE.PlaneBufferGeometry(6000, 6000, 100, 100); //lowperf 30, 30
    this.material = makeSkyPlaneMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.rotation.x = Math.PI / 2;
    this.mesh.position.set(0, 500, 0);
};

SkyPlane.prototype.followPlayer = function (player) {
    this.mesh.position.x = player.position.x;
    this.mesh.position.z = player.position.z;
    this.material.uniforms.iOffset.value.set(player.position.x, 0, player.position.z);
};

SkyPlane.prototype.update = function (deltaTime) {
    this.material.uniforms.iGlobalTime.value += deltaTime;
};

module.exports = SkyPlane;
