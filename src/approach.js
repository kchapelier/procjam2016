"use strict";

function Approach (overlayElement) {
    this.overlayElement = overlayElement;
    this.textElement = overlayElement.querySelector('.approach-text');
}

Approach.prototype.display = function (text) {
    this.textElement.innerText = text;
};

module.exports = Approach;
