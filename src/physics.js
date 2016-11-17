"use strict";

var CustomRaycaster = require('./utils/custom-raycaster');

var rayCaster = new CustomRaycaster(),
    intersects = [],
    faceNormal = new THREE.Vector3();

module.exports = {
    playerConstraints: function (player, meshCollisions) {
        rayCaster.origin.copy(player.previousPosition);
        rayCaster.direction.copy(player.position).sub(player.previousPosition);
        rayCaster.far = Math.max(rayCaster.direction.length(), 0.5);
        rayCaster.direction.normalize();

        intersects.length = 0;
        rayCaster.intersectObjects(meshCollisions, false, intersects);

        if (intersects.length) {
            var closestIntersection = intersects[0],
                i;

            for (i = 1; i < intersects.length; i++) {
                if (closestIntersection.distance > intersects[i].distance) {
                    closestIntersection = intersects[i];
                }
            }

            player.position.copy(closestIntersection.point).addScaledVector(rayCaster.direction, -0.5);
            faceNormal.set(closestIntersection.face.normal.x, 0, closestIntersection.face.normal.z);
            faceNormal.applyQuaternion(closestIntersection.object.quaternion).normalize();

            player.bump.copy(rayCaster.direction).reflect(faceNormal).multiplyScalar(rayCaster.far * 0.95);
            player.currentSpeed *= 0.2;
        }

        return intersects.length;
    }
};
