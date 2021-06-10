import * as engine from "../../engine/engine.js"
import * as THREE from '../../lib/three/three.module.js';

let simulation = new engine.Simulation();
let world;

export function run(){

    world = simulation.initialize();
    simulation.playSimulation();

    setupTestScene();

}

function setupTestScene(){

    world.thCamera.position.z = 5;

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cubeMesh = new THREE.Mesh(geometry, material);

    let cubeEntity = world.createEntity();
    cubeEntity.thObject3D = cubeMesh;

    let rotationComponent = new engine.Rotation();
    rotationComponent.rotationSpeed = THREE.MathUtils.degToRad(90);
    cubeEntity.addComponent(rotationComponent);

}
