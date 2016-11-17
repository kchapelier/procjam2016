"use strict";

var isArray = require('is-array'),
    baseWidth = window.innerWidth,
    baseHeight = window.innerHeight,
    pixelRatio = 1; //(typeof window.devicePixelRatio !== 'undefined' ? window.devicePixelRatio : 1);

var EffectComposer = require('./postprocessing/EffectComposer');

var renderer = new THREE.WebGLRenderer({ antialias: true, stencil: true, depth: true, maxLights: 0 }),
    generalScene = new THREE.Scene(),
    skyboxScene = new THREE.Scene(),
    backgroundColor = 0x000000;

renderer.setPixelRatio(pixelRatio);
renderer.setSize(baseWidth, baseHeight);
renderer.autoClear = false;
renderer.setClearColor(backgroundColor, 1);

var composer = new EffectComposer(renderer, generalScene, skyboxScene);

module.exports = {
    screenWidth: baseWidth,
    screenHeight: baseHeight,
    camera: null,
    scene: generalScene,
    skyboxScene: skyboxScene,
    skyboxTexture: composer.skyboxTexture,
    renderer: renderer,
    useCamera: function (camera) {
        this.camera = camera;
        //this.scene.add(camera);

        composer.setCamera(camera);

        //pass.camera = camera;
    },
    resize: function (width, height) {
        this.screenHeight = height;
        this.screenWidth = width;
        renderer.setSize(width, height);
        composer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    },
    appendTo: function (domElement) {
        if (typeof domElement === 'string') {
            domElement = document.getElementById(domElement);
        }

        domElement.appendChild(renderer.domElement);
    },
    addToScene: function (object, skybox) {
        var scene = skybox ? this.skyboxScene : this.scene;

        if (isArray(object)) {
            for(var i = 0; i < object.length; i++) {
                scene.add(object[i]);
            }
        } else {
            scene.add(object);
        }
    },
    removeFromScene: function (object, skybox) {
        var scene = skybox ? this.skyboxScene : this.scene;

        if (isArray(object)) {
            for(var i = 0; i < object.length; i++) {
                scene.remove(object[i]);
            }
        } else {
            scene.remove(object);
        }
    },
    render: function () {
        //renderer.clear();
        //renderer.render(this.scene, this.camera);
        composer.render();
    }
};
