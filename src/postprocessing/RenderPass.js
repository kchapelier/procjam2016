"use strict";

var Pass = require('./Pass');

var RenderPass = function ( scene, camera ) {
    Pass.call( this );

    this.scene = scene;
    this.camera = camera;

    this.clear = true;
};

RenderPass.prototype = Object.create( Pass.prototype );

RenderPass.prototype = {
    constructor: RenderPass,
    render: function ( renderer, writeBuffer ) {
        renderer.render( this.scene, this.camera, writeBuffer, this.clear );
    }
};

module.exports = RenderPass;
