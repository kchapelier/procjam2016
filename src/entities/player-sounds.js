"use strict";

var PlayerSounds = function PlayerSounds (sound) {
    this.engineSound = sound.get('engine');
    this.engineSoundId = sound.play('engine');
    this.turningSound = sound.get('turning');
    this.turningSoundId = sound.play('turning');
    this.soundscape = sound.get('soundscape');
    this.soundscapeId = sound.play('soundscape');
};

PlayerSounds.prototype.followPlayer = function (player) {
    this.engineSound.volume(0.02 + Math.pow(player.speedRatio, 1.2) * 0.4, this.engineSoundId);
    this.engineSound.rate(1 + Math.pow(player.speedRatio, 0.8) * 0.2, this.engineSoundId);
    this.turningSound.volume(Math.min(1, Math.pow(Math.abs(player.sideAngle), 2.) * 3.0), this.turningSoundId);
    this.turningSound.rate(1. + Math.pow((player.speedRatio + Math.abs(player.sideAngle)) / 2., 0.8) * 0.22, this.turningSoundId);
    this.soundscape.volume(0.2 + player.speedRatio * 0.15, this.soundscapeId);
};

module.exports = PlayerSounds;
