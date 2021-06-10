import * as THREE from '../lib/three/three.module.js'
import { World } from './engine.js'
import Stats from './jsm/libs/stats.module.js'

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
        if(!this.isPlaying){
            this._clock.start();
            this._updateSimulation();
        }
    }

    stopSimulation() {
        if(this._isPlaying){
            this._clock.stop();
            cancelAnimationFrame(this.animationFrameRequestID);
        }
        this._isPlaying = false;
    }

    _updateSimulation(){
        requestAnimationFrame(this._updateSimulation.bind(this));

        let dt = this._clock.getDelta();
        this._world.update(dt);
        this._world.render();

        this._stats.update();
        
    }
}


