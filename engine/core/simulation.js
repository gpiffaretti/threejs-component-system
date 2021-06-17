import * as THREE from '../lib/three/build/three.module.js'
import { World } from './engine.js'
import Stats from '../lib/three/examples/jsm/libs/stats.module.js'

export class Simulation {
    
    _animationFrameRequestID; // request ID returned by requestAnimationFrame, can be used to cancel the request
    _isPlaying = false;
    _world;
    _stats;

    _clock = new THREE.Clock(false);

    initialize(){
        this._stats = new Stats();
        this._stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this._stats.dom);

        this._world = new World();
        this._world.initialize();
        return this._world;
    }

    playSimulation() {
        if(!this._isPlaying){
            console.log("Play simulation");
            this._clock.start();
            this._isPlaying = true;
            this._updateSimulation();
        }
    }

    stopSimulation() {
        if(this._isPlaying){
            console.log("Stop simulation");
            this._clock.stop();
            cancelAnimationFrame(this._animationFrameRequestID);
            this._isPlaying = false;
        }
    }

    _updateSimulation(){
        this._animationFrameRequestID = requestAnimationFrame(this._updateSimulation.bind(this));

        let dt = this._clock.getDelta();
        this._world.update(dt);
        this._world.render();

        this._stats.update();
        
    }
}


