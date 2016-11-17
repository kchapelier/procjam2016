"use strict";

var RenderPass = require('./RenderPass');

var EffectComposer = function ( renderer, generalScene, skyboxScene ) {
    this.renderer = renderer;

    var parameters = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false
    };

    var size = renderer.getSize();

    // render the skybox at half the resolution
    this.skyboxTarget = new THREE.WebGLRenderTarget(size.width / 3 | 0, size.height / 2 | 0, parameters); //lowperf /4, /3
    this.skyboxTexture = this.skyboxTarget.texture;

    this.generalRenderPass = new RenderPass(generalScene, null);
    this.skyboxRenderPass = new RenderPass(skyboxScene, null);
};

EffectComposer.prototype = {
    setCamera: function (camera) {
        this.generalRenderPass.camera = camera;
        this.skyboxRenderPass.camera = camera;
    },
    applyPass: function (pass, writeBuffer, readBuffers) {
        pass.render(
            this.renderer,
            writeBuffer,
            readBuffers
        );
    },
    render: function ( delta ) {
        this.applyPass(this.skyboxRenderPass, this.skyboxTarget, null);
        this.applyPass(this.generalRenderPass, null, null);
    },
    setSize: function (width, height) {
        this.skyboxTarget.setSize(width / 3 | 0, height / 2 | 0);
    }
};

module.exports = EffectComposer;
