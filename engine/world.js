import * as THREE from '../lib/three/build/three.module.js';
import * as engine from './engine.js';
import ComponentManager from './componentManager.js';

export class World {
    thCamera;
    thRenderer;

    _thScene;

    _entities = new Array();
    _componentManager;

    constructor(){

    }

    initialize(){
        this._componentManager = new ComponentManager(this);

        // Scene
        this._thScene = new THREE.Scene();

        // Camera
        this.thCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.thCamera.position.set(3, 3, -3);

        // Renderer
        this.thRenderer = new THREE.WebGLRenderer({ antialias: true });
        this.thRenderer.shadowMap.enabled = true;
        this.thRenderer.setPixelRatio(window.devicePixelRatio);
        this.thRenderer.setSize(window.innerWidth, window.innerHeight);
        this.thRenderer.setClearColor(0x263238);
        document.body.appendChild(this.thRenderer.domElement);

        this.thRenderer.localClippingEnabled = true;
    }
    
    createEntity(){
        let entity = new engine.Entity(this, this._componentManager);

        this._entities.push(entity);
        return entity;
    }

    removeEntity(entity){
        let index = this._entities.indexOf(entity);
        if(index >= 0){
            this._entities.splice(index,1);
        } else{
            console.log("Tried to remove entity but not present");
        }
    }

    update(dt){

        // call Start() method in newly added components
        this._componentManager.initializePendingComponents();

        // TODO: register components in manager by type, and use data locality for speeding up things.
        // use component manager to update components, instead of entity handling this
        this._entities.forEach(entity => {
            entity.update(dt);
        });

        this._componentManager.releasePendingComponents();
    }

    render(){
        this.thRenderer.render(this._thScene, this.thCamera);
    }

}