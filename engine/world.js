import * as THREE from '../lib/three/three.module.js';
import * as engine from './engine.js';
import ComponentManager from './componentManager.js';

export class World {
    thCamera;

    _thScene;
    _thRenderer; 

    _entities = new Array();
    _componentManager;

    constructor(){

    }

    initialize(){
        this._componentManager = new ComponentManager(this);

        // Camera
        this.thCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.thCamera.position.set(2, 2, 2);

        // Scene
        this._thScene = new THREE.Scene();

        // Renderer
        this._thRenderer = new THREE.WebGLRenderer({ antialias: true });
        this._thRenderer.shadowMap.enabled = true;
        this._thRenderer.setPixelRatio(window.devicePixelRatio);
        this._thRenderer.setSize(window.innerWidth, window.innerHeight);
        this._thRenderer.setClearColor(0x263238);
        document.body.appendChild(this._thRenderer.domElement);

        this._thRenderer.localClippingEnabled = true;
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
    }

    render(){
        this._thRenderer.render(this._thScene, this.thCamera);
    }

}