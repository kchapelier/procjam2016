"use strict";

var makeWaterMaterial = require('../materials/water');

var WaterPlane = function WaterPlane () {
    this.geometry = new THREE.PlaneBufferGeometry(5000, 5000, 80, 80); //low perf: 26, 26
    this.material = makeWaterMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.set(0, -10, 0);
};

WaterPlane.prototype.followPlayer = function (player) {
    this.mesh.position.x = player.position.x;
    this.mesh.position.z = player.position.z;
    this.material.uniforms.iOffset.value.set(player.position.x, 0, player.position.z);
};

WaterPlane.prototype.update = function (deltaTime) {
    this.material.uniforms.iGlobalTime.value += deltaTime;
};

module.exports = WaterPlane;
