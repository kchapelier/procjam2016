"use strict";

var makeShieldMaterial = require('../materials/shield');
var makePlayerMaterial = require('../materials/player');
var core = require('../../assets/models/compiled')['assets/models/core.obj'];

var coreGeometry = new THREE.BufferGeometry();

coreGeometry.addAttribute("position", new THREE.BufferAttribute(new Float32Array(core.vertices), 3));
coreGeometry.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(core.normals), 3));
coreGeometry.setIndex(new THREE.BufferAttribute(new Uint16Array(core.indices), 1));

var Player = function Player (input, camera) {
    this.position = new THREE.Vector3(0,0,-1000);
    this.previousPosition = new THREE.Vector3(0,0,-1000);

    this.geometry = coreGeometry; //new THREE.CubeGeometry(1, 1, 1);
    this.material = makePlayerMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.scale.set(0.5, 0.5, 0.5);
    this.mesh.visible = true;

    this.sphereGeometry = coreGeometry; //new THREE.CubeGeometry(1, 1, 1); //new THREE.IcosahedronBufferGeometry(1, 3);
    this.sphereMaterial = makeShieldMaterial();
    this.sphereMesh = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
    this.sphereMesh.scale.set(0.525, 0.525, 0.525);

    this.camera = camera;

    this.leftCommand = input.commands.left;
    this.rightCommand = input.commands.right;
    this.upCommand = input.commands.up;
    this.downCommand = input.commands.down;

    this.braking = false;
    this.speedRatio = 0;
    this.currentSpeed = 0;
    this.acceleration = 0.003;
    this.maxSpeed = 7;
    this.minSpeed = -0.35;
    this.angle = 0 * Math.PI;
    this.normalizedDirection = new THREE.Vector3(0, 0, -1);
    this.lookAt = new THREE.Vector3(0, 0, 0);
    this.cameraOffset = new THREE.Vector3(0, 0.75, 0);
    this.amplitudeFov = 0;

    this.bump = new THREE.Vector3(0,0,0);

    this.timer = 0;
    this.sideAngle = 0;
    this.camera.lookAt(this.lookAt);
};

Player.prototype.update = function (deltaTime) {

    this.previousPosition.copy(this.position);

    this.braking = false;
    this.timer += deltaTime;

    if (this.upCommand.active) {
        this.currentSpeed += deltaTime * this.acceleration;
    } else if (this.downCommand.active) {
        if (this.currentSpeed > 0) {
            this.braking = true;
        }
        this.currentSpeed -= deltaTime * this.acceleration;
    }

    this.currentSpeed = Math.max(this.minSpeed, Math.min(this.maxSpeed, this.currentSpeed));

    if (this.currentSpeed > -0.03 && this.currentSpeed < 0.04) {
        this.currentSpeed = 0;
    }

    this.speedRatio = this.currentSpeed > 0. ? this.currentSpeed / this.maxSpeed : 0.;

    var amplitudeAngle = 0.5 + this.speedRatio * 0.5;

    if (this.leftCommand.active) {
        this.angle += deltaTime * 0.002 * amplitudeAngle * this.leftCommand.value;
        this.sideAngle += deltaTime * 0.016 * this.leftCommand.value;
    } else if (this.rightCommand.active) {
        this.angle -= deltaTime * 0.002 * amplitudeAngle * this.rightCommand.value;
        this.sideAngle -= deltaTime * 0.016 * this.rightCommand.value;
    }

    this.sideAngle = this.sideAngle * this.sideAngle * (this.sideAngle > 0 ? 1 : -1);
    this.sideAngle = Math.max(-0.4 * this.speedRatio, Math.min(0.4 * this.speedRatio, this.sideAngle));

    this.normalizedDirection.x = Math.sin(this.angle);
    this.normalizedDirection.z = Math.cos(this.angle);

    // change position
    this.position.addScaledVector(this.normalizedDirection, this.currentSpeed).add(this.bump);
    //this.position.y = -100. * (Math.sin((this.position.x + this.timer * 1.13) / 533.) * Math.cos((-this.position.z + this.timer * .2) / 227.) + 1.) * 0.5;
    this.mesh.position.copy(this.position);


    this.currentSpeed *= this.braking ? 0.990 : 0.992;
    this.bump.multiplyScalar(this.braking ? 0.989 : 0.9915);

    var amplitudeFloating = 1.0 - 0.6 * Math.sqrt(this.speedRatio);

    this.mesh.rotation.x = amplitudeFloating * Math.sin(this.timer / 800) / 11;
    this.mesh.rotation.y = this.angle + amplitudeFloating * Math.sin(this.timer / 990) / 23;
    this.mesh.rotation.z = this.mesh.rotation.z * 0.94 + this.sideAngle * 0.06;
};

Player.prototype.postUpdate = function () {
    this.sphereMesh.position.copy(this.position);
    this.sphereMesh.rotation.copy(this.mesh.rotation);
    this.sphereMesh.material.uniforms.iGlobalTime.value = this.timer;

    // move camera and lookAt
    this.amplitudeFov = this.amplitudeFov * 0.92 + Math.pow(this.speedRatio, 2.5) * 0.08;

    this.camera.fov = 52 * (1. - this.amplitudeFov) + 109 * (this.amplitudeFov);
    this.camera.position.copy(this.position).addScaledVector(this.normalizedDirection, -3.5 + this.amplitudeFov * 1.8).addScaledVector(this.cameraOffset, 1.0 - this.amplitudeFov * 0.5);
    this.lookAt.copy(this.position).add(this.normalizedDirection).addScaledVector(this.cameraOffset, 0.5);
    this.camera.lookAt(this.lookAt);

    this.camera.rotation.z += this.mesh.rotation.z * 0.96;

    this.camera.updateProjectionMatrix();
};

Player.prototype.registerHit = function () {
    this.sphereMesh.material.uniforms.iHitTime.value = this.timer;
};

module.exports = Player;
