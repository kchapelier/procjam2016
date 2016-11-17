"use strict";

function Structure (geometryData, material, positionX, positionY) {
    this.geometry = new THREE.BufferGeometry();

    this.geometry.addAttribute("position", new THREE.BufferAttribute(new Float32Array(geometryData.position), 3));
    this.geometry.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(geometryData.normal), 3));
    this.geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(geometryData.index), 1));

    this.geometry.computeBoundingBox();
    this.geometry.computeBoundingSphere();

    this.mesh = new THREE.Mesh(this.geometry, material);
    this.mesh.scale.set(60., 300., 60.);
    this.mesh.position.set(positionX, -1, positionY);
    this.mesh.visible = false;

    this.visible = false;

    // 3000 is from the visibility distance in the `structure` shader
    // 100 is a security buffer
    this.radiusVisibility = this.geometry.boundingSphere.radius * 60 + 3000. + 100.;
}

module.exports = Structure;
