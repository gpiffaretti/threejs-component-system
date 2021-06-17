import * as engine from "../../engine/core/engine.js";
import * as THREE from '../../lib/three/build/three.module.js';
import { TransformControls } from "../../lib/three/examples/jsm/controls/TransformControls.js";
import { GUI } from '../../lib/three/examples/jsm/libs/dat.gui.module.js'

export class TestApp {

    simulation;
    world;

    run(){
        
        this.simulation = new engine.Simulation();
        this.world = this.simulation.initialize();
        this.simulation.playSimulation();

        this._setupTestScene();
    }

    _setupTestScene(){

        // dir light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.name = "Dir light";
        const directionalLightEntity = this.world.createEntity();
        directionalLightEntity.Object3D = directionalLight;

        // cube and behaviour
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshStandardMaterial( { color: 0x505050 } );
        const cubeMesh = new THREE.Mesh(geometry, material);
        cubeMesh.name = "Cube";
        cubeMesh.position.set(0,0.5,0);
        cubeMesh.castShadow = true;

        const cubeEntity = this.world.createEntity();
        cubeEntity.Object3D = cubeMesh;

        const rotationComponent = new engine.Rotation();
        rotationComponent.rotationSpeed = 0;
        cubeEntity.addComponent(rotationComponent);

        // spot light
        const spotLight = new THREE.SpotLight(0xff8888, 0.8, 6, THREE.MathUtils.degToRad(15), 0.05);
        spotLight.position.set(3, 4, 0);
        spotLight.target = cubeEntity.Object3D;
        spotLight.castShadow = true;
        spotLight.shadow.focus = 1;
        spotLight.name = "Spot light";
        const spotLightEntity = this.world.createEntity();
        spotLightEntity.Object3D = spotLight;
        const spotLightFitter = new engine.SpotLightFit(cubeEntity);
        spotLightEntity.addComponent(spotLightFitter);
        const shadowCameraHelper = new engine.ShadowCameraHelper();
        spotLightEntity.addComponent(shadowCameraHelper);
        
        const spotLightHelper = new THREE.SpotLightHelper( spotLight );
        spotLightHelper.name = "Spot light helper";
        const spotLightHelperEntity = this.world.createEntity();
        spotLightHelperEntity.Object3D = spotLightHelper;
        const object3DUpdater = new engine.Object3DUpdate();
        spotLightHelperEntity.addComponent(object3DUpdater);

        // shadow material plane
        const planeGeometry = new THREE.PlaneGeometry( 2000, 2000 );
        planeGeometry.rotateX( - Math.PI / 2 );

        const planeGeometryMaterial = new THREE.ShadowMaterial();
        planeGeometryMaterial.opacity = 0.4;

        const plane = new THREE.Mesh( planeGeometry, planeGeometryMaterial );
        plane.name = "Shadow plane";
        plane.position.y = 0;
        plane.receiveShadow = true;
        const shadowPlaneEntity = this.world.createEntity();
        shadowPlaneEntity.Object3D = plane;

        // camera controls
        this.world.thCamera.lookAt(0,2,0);
        const flyControlsEntity = this.world.createEntity();
        const flyControls = new engine.FlyControlThree(this.world.thCamera, this.world.thRenderer.domElement);
        flyControlsEntity.addComponent(flyControls);
        flyControls.enabled = false;
        
        // editor controls

        const transformControls = new TransformControls(this.world.thCamera, this.world.thRenderer.domElement);
        const transformControlsEntity = this.world.createEntity();
        transformControlsEntity.Object3D = transformControls;
        transformControls.attach(cubeEntity.Object3D);

        const axesHelper = new THREE.AxesHelper( 1);
        const axesHelperEntity = this.world.createEntity();
        axesHelperEntity.Object3D = axesHelper;

        const size = 20;
        const divisions = 10;
        const gridHelper = new THREE.GridHelper( size, divisions );
        const gridEntity = this.world.createEntity();
        gridEntity.Object3D = gridHelper;

        // UI
        const gui = new GUI();

        let config = {
            playSimulation: true,
            useTransformControls: true,
            transformControlsTarget: undefined,
        };

        gui.add(config, 'playSimulation').onChange(() => {
            if(config.playSimulation){
                simulation.playSimulation();
            } else {
                simulation.stopSimulation();
            }
        });

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

        const folder = gui.addFolder('spotlight shadow camera helper');
        folder.add(shadowCameraHelper, 'enabled');

    }

}

const testApp = new TestApp();
testApp.run();
