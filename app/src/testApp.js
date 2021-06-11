import * as engine from "../../engine/engine.js";
import * as THREE from '../../lib/three/build/three.module.js';
import { TransformControls } from "../../lib/three/examples/jsm/controls/TransformControls.js";
import { GUI } from '../../lib/three/examples/jsm/libs/dat.gui.module.js'

let simulation = new engine.Simulation();
let world;

export function run(){

    world = simulation.initialize();
    simulation.playSimulation();

    setupTestScene();
}

function setupTestScene(){

    world.thCamera.position.z = 5;
    
    let config = {
        useTransformControls: true,
        transformControlsTarget: undefined,
    };

    // dir light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.name = "Dir light";
    const directionalLightEntity = world.createEntity();
    directionalLightEntity.Object3D = directionalLight;

    // cube and behaviour
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial( { color: 0x505050 } );
    const cubeMesh = new THREE.Mesh(geometry, material);
    cubeMesh.name = "Cube";

    const cubeEntity = world.createEntity();
    cubeEntity.Object3D = cubeMesh;

    const rotationComponent = new engine.Rotation();
    rotationComponent.rotationSpeed = 0;
    cubeEntity.addComponent(rotationComponent);

    // spot light
    const spotLight = new THREE.SpotLight(0xff8888, 0.8, 6, THREE.MathUtils.degToRad(15), 0.05);
    spotLight.position.set(3, 4, 0);
    spotLight.target = cubeEntity.Object3D;
    spotLight.name = "Spot light";
    const spotLightEntity = world.createEntity();
    spotLightEntity.Object3D = spotLight;
    const spotLightFitter = new engine.SpotLightFit(cubeEntity);
    spotLightEntity.addComponent(spotLightFitter);
    
    const spotLightHelper = new THREE.SpotLightHelper( spotLight );
    spotLightHelper.name = "Spot light helper";
    const spotLightHelperEntity = world.createEntity();
    spotLightHelperEntity.Object3D = spotLightHelper;
    const object3DUpdater = new engine.Object3DUpdate();
    spotLightHelperEntity.addComponent(object3DUpdater);

    // camera controls
    world.thCamera.lookAt(0,2,0);
    const flyControlsEntity = world.createEntity();
    const flyControls = new engine.FlyControlThree(world.thCamera, world.thRenderer.domElement);
    flyControlsEntity.addComponent(flyControls);
    flyControls.enabled = false;
    
    // editor controls
    const sceneElementNames = { 
        [cubeEntity.name]: cubeEntity.name,
        [directionalLightEntity.name]: directionalLightEntity.name,
        [spotLightEntity.name]: spotLightEntity.name,
        
    };
    const sceneElements = { 
        [cubeEntity.name]: cubeEntity.Object3D,
        [directionalLightEntity.name]: directionalLightEntity.Object3D,
        [spotLightEntity.name]: spotLightEntity.Object3D,
    };
    config.transformControlsTarget = cubeEntity.name;

    const transformControls = new TransformControls(world.thCamera, world.thRenderer.domElement);
    const transformControlsEntity = world.createEntity();
    transformControlsEntity.Object3D = transformControls;
    transformControls.attach(cubeEntity.Object3D);

    const axesHelper = new THREE.AxesHelper( 3 );
    const axesHelperEntity = world.createEntity();
    axesHelperEntity.Object3D = axesHelper;

    const gui = new GUI();

    gui.add(config, 'transformControlsTarget', sceneElementNames).onChange(() => {
        transformControls.detach();
        transformControls.attach(sceneElements[config.transformControlsTarget]);
    });

    gui.add(config, 'useTransformControls').onChange(() => {
        transformControls.enabled = transformControls.visible = config.useTransformControls;
        flyControls.enabled = !config.useTransformControls;
    });
    gui.add(transformControls, 'mode', { Translate: "translate", Rotate: "rotate", Scale: "scale"});
    gui.add(rotationComponent, 'rotationSpeed', 0, 2*3.1416);

}
