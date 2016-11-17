"use strict";

var GameLoop = require('migl-gameloop'),
    input = require('./input'),
    renderer = require('./renderer'),
    sound = require('./sound'),
    fullscreen = require('./fullscreen'),
    physics = require('./physics'),
    WebWorkerPool = require('./utils/web-worker-pool');

var Approach = require('./approach');

var models = require('../assets/models/compiled');

var Sky = require('./entities/sky'),
    WaterPlane = require('./entities/water-plane'),
    SkyPlane = require('./entities/sky-plane'),
    Player = require('./entities/player'),
    PlayerSounds = require('./entities/player-sounds'),
    Structure = require('./entities/structure');

var makeStructureMaterial = require('./materials/structure'),
    structureMaterial = makeStructureMaterial(false),
    structureAltMaterial = makeStructureMaterial(true);

var camera;

var loadSounds = function loadSounds () {
    sound.load('soundscape', 'soundscape', 0.05, true, true);
    sound.load('engine', 'engine', 0.05, true, true);
    sound.load('turning', 'engine', 0.05, true, true);
    sound.load('hit1', 'ld31-dissonant1', 0.5, false, false);
    sound.load('hit2', 'ld31-dissonant2', 0.5, false, false);
    sound.load('hit3', 'ld31-dissonant3', 0.5, false, false);
    sound.load('hit4', 'ld31-dissonant4', 0.5, false, false);
};

function createWorker (script) {
    var now = Date.now();

    return new Worker(script + '?cache=' + now);
}

var currentX = 0,
    currentY = 0;

var debugMode = false;

var init = function init () {
    var chosenStructureMaterial = Math.random() > 0.2 ? structureMaterial : structureAltMaterial;
    //console.log('init');
    loadSounds();

    document.addEventListener('keyup', function (e) {
        if (e.which === 70) {
            fullscreen.requestFullscreen(element);
            // just hide the pointer, nothing fancy with the mouse
            if (element.requestPointerLock) {
                element.requestPointerLock();
            }
        } else if (e.which === 71) {
            document.body.classList.toggle('debug');
            debugMode = !debugMode;
        } else if (e.which === 72) {
            player.mesh.visible = !player.mesh.visible;
        } else if (e.which === 77) {
            sound.toggleSound();
        }
    });

    var element = document.getElementById('renderer');

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.01, 7500);
    renderer.useCamera(camera);
    renderer.appendTo(element);

    var approach = new Approach(document.getElementById('overlay'));

    function resize () {
        renderer.resize(window.innerWidth, window.innerHeight);
        sky.resize(window.innerWidth, window.innerHeight);
        chosenStructureMaterial.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
        waterPlane.material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
        skyPlane.material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', resize);

    var cube = new THREE.CubeGeometry(10,10,10);
    var base = models['assets/models/base.obj'];




    var sky = new Sky(),
        waterPlane = new WaterPlane(),
        skyPlane = new SkyPlane(),
        player = new Player(input, camera),
        playerSounds = new PlayerSounds(sound);

    sky.setSkyTexture(renderer.skyboxTexture);
    chosenStructureMaterial.uniforms.tSky.value = renderer.skyboxTexture;
    waterPlane.material.uniforms.tSky.value = renderer.skyboxTexture;
    skyPlane.material.uniforms.tSky.value = renderer.skyboxTexture;


    var baseGeometry = new THREE.BufferGeometry();

    baseGeometry.addAttribute("position", new THREE.BufferAttribute(new Float32Array(base.vertices), 3));
    baseGeometry.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(base.normals), 3));
    baseGeometry.setIndex(new THREE.BufferAttribute(new Uint16Array(base.indices), 1));

    var coreMesh = new THREE.Mesh(baseGeometry, new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));

    coreMesh.scale.set(34, 34, 34);
    coreMesh.position.set(0,305,0);

    var cylinderMesh = new THREE.Mesh(baseGeometry, chosenStructureMaterial);

    cylinderMesh.scale.set(300, 300, 300);
    cylinderMesh.position.set(0, -10, 0);

    renderer.addToScene(cylinderMesh);
    renderer.addToScene(coreMesh);
    renderer.addToScene(sky.mesh, true);
    renderer.addToScene(sky.meshCopy, false);
    renderer.addToScene(waterPlane.mesh);
    renderer.addToScene(skyPlane.mesh);
    renderer.addToScene(player.mesh);
    renderer.addToScene(player.sphereMesh);

    var meshCollisions = [cylinderMesh];
    meshCollisions.push();

    var workerPds = createWorker('./build/worker-pds-exp.js');
    var workerCc = new WebWorkerPool('./build/worker-convchain-exp.js', Math.max(navigator.hardwareConcurrency - 2, 2) || 2);

    var scale = 6000;

    workerPds.addEventListener('message', function (e) {
        //console.log('PDS', Date.now() - e.data.request.time, e.data.result);
        //console.log(e);
        var positionX = e.data.request.posX,
            positionY = e.data.request.posY,
            sortedPoints,
            point;

        sortedPoints = e.data.result.world.points.sort(function (a, b) {
            return Math.sqrt(Math.pow(a[0] - 0.5, 2) + Math.pow(a[1] - 0.5, 2)) - Math.sqrt(Math.pow(b[0] - 0.5, 2) + Math.pow(b[1] - 0.5, 2));
        });

        for (var i = 0; i < sortedPoints.length; i++) {
            point = sortedPoints[i];
            workerCc.postMessage({ posX: positionX * scale + point[0] * scale - scale / 2, posY: positionY * scale + point[1] * scale - scale / 2, size: 80, time: Date.now() });
        }

        /*
        var roadGeometry = new THREE.BufferGeometry();

        roadGeometry.addAttribute("position", new THREE.BufferAttribute(e.data.result.roadGeometry.position, 3));
        roadGeometry.addAttribute("normal", new THREE.BufferAttribute(e.data.result.roadGeometry.normal, 3));
        roadGeometry.setIndex(new THREE.BufferAttribute(e.data.result.roadGeometry.index, 1));

        roadGeometry.computeBoundingBox();

        var roadMesh = new THREE.Mesh(roadGeometry, new THREE.MeshNormalMaterial({ side: THREE.FrontSide }));

        renderer.addToScene(roadMesh);
        */
    });

    var structures = [];

    workerCc.setCallback(function (e) {
        var positionX = e.data.request.posX * 40,
            positionY = e.data.request.posY * 40;

        //console.log(positionX, positionY);

        var structure = new Structure(e.data.result.geometry, chosenStructureMaterial, positionX, positionY);

        renderer.addToScene(structure.mesh);
        meshCollisions.push(structure.mesh);

        structures.push(structure);

        /*
        var cubeMeshPlus = new THREE.Mesh(cube, new THREE.MeshNormalMaterial());
        cubeMeshPlus.scale.set(1, 2, 1);
        cubeMeshPlus.position.set(positionX, -10, positionY);
        renderer.addToScene(cubeMeshPlus);
        */
    });

    workerCc.postMessage({ posX: 0, posY: 100, size: 70, time: Date.now() });
    workerPds.postMessage({ posX: 0, posY: 0, time: Date.now() });

    var hitSounds = sound.getRoundRobin(['hit1', 'hit2', 'hit3', 'hit4']);

    var loop = new GameLoop({
        update: function (deltaTime) {
            input.update(deltaTime);
            player.update(deltaTime);

            if (physics.playerConstraints(player, meshCollisions)) {
                player.registerHit();
                hitSounds.play(0.2 + 0.5 * player.speedRatio);
            }

            sky.update(deltaTime);
        },
        postUpdate: function (deltaTime) {
            player.postUpdate();
            playerSounds.followPlayer(player);
            sky.followPlayer(player);
            waterPlane.followPlayer(player);
            waterPlane.update(deltaTime);

            skyPlane.followPlayer(player);
            skyPlane.update(deltaTime);

            // update world

            for (var i = 0; i < structures.length; i++) {
                if (Math.abs(player.position.x - structures[i].mesh.position.x) < structures[i].radiusVisibility && Math.abs(player.position.z - structures[i].mesh.position.z) < structures[i].radiusVisibility) {
                    if (!structures[i].visible) {
                        structures[i].visible = true;
                        structures[i].mesh.visible = true;
                        //renderer.addToScene(structures[i].mesh);
                    }
                } else if (structures[i].visible) {
                    structures[i].visible = false;
                    structures[i].mesh.visible = false;
                    //renderer.removeFromScene(structures[i].mesh);
                }
            }
        },
        render: function (deltaTime) {
            renderer.render(deltaTime);
        },
        postRender: function (deltaTime) {
            /*
            var positionX = Math.floor((player.position.x + 300) / 600),
                positionY = Math.floor((player.position.z + 300) / 600);

            if (positionX !== currentX || positionY !== currentY) {
                //console.log(player.position.x | 0, player.position.z | 0);
                currentX = positionX;
                currentY = positionY;

                //workerPds.postMessage({ posX: currentX, posY: currentY, time: Date.now() });

                //approach.display(currentX + ',' + currentY);
            }
            */

            if (debugMode) {
                approach.display(`memory:geometries:${renderer.renderer.info.memory.geometries}
                    programs:${renderer.renderer.info.programs.length}
                    render:calls:${renderer.renderer.info.render.calls}
                    render:faces:${renderer.renderer.info.render.faces}
                    render:vertices:${renderer.renderer.info.render.vertices}
                    structures:${structures.length}
                `);
            }
        }
    });

    var loopStart = function loopStart () {
        //console.log('start');
        loop.start();
    };

    loopStart();
};

module.exports = function () {
    //console.log('export');
    init();
};
