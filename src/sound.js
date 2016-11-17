"use strict";

var howler = require('howler'),
    dictionary = {};

var RoundRobinHowl = function (sounds) {
    this.sounds = sounds;
    this.number = sounds.length;
    this.lastPlayed = 0;
};

RoundRobinHowl.prototype.play = function (volume) {
    var pick = Math.random() * (this.number - 1) | 0;

    if (pick >= this.lastPlayed) {
        pick = pick + 1;
    }

    this.lastPlayed = pick;
    this.sounds[pick].volume(volume);
    this.sounds[pick].play();
};

module.exports = {
    load: function (id, filename, volume, buffered, looping) {
        dictionary[id] = new howler.Howl({
            src: ['./assets/sounds/' + filename + '.ogg', './assets/sounds/' + filename + '.wav'],
            autoplay: false,
            loop: !!looping,
            buffer: !!buffered,
            volume: volume || 0.75
        });
    },
    toggleSound: function () {
        if (howler.Howler.masterGain.gain.value === 0) {
            howler.Howler.masterGain.gain.value = 1;
        } else {
            howler.Howler.masterGain.gain.value = 0;
        }
    },
    getRoundRobin: function (ids) {
        var sounds = [];

        for (var i = 0; i < ids.length; i++) {
            if (!!dictionary[ids[i]]) {
                sounds.push(dictionary[ids[i]]);
            }
        }

        return new RoundRobinHowl(sounds);
    },
    get: function (id) {
        if (!!dictionary[id]) {
            return dictionary[id];
        }
    },
    play: function (id) {
        if (!!dictionary[id]) {
            return dictionary[id].play();
        }

        return false;
    }
};
