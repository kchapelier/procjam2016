"use strict";

var Pass = function () {
    // if set to true, the pass is processed by the composer
    this.enabled = true;

    // if set to true, the pass clears its buffer before rendering
    this.clear = false;
};

Pass.prototype = {
    constructor: Pass,
    render: function ( renderer, writeBuffer, readBuffers) {
        console.error( "THREE.Pass: .render() must be implemented in derived pass." );
    }
};

module.exports = Pass;
