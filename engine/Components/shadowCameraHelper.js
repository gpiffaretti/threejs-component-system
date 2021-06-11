import * as THREE from "../../lib/three/build/three.module.js";
import Component from "../component.js"

export default class ShadowCameraHelper extends Component {

    _light;
    _cameraHelper;

    constructor(){
        super();
    }

    start(){
        this._light = this.entity.Object3D;

        this._cameraHelper = new THREE.CameraHelper(this._light.shadow.camera );
        this.entity._world._thScene.add(this._cameraHelper);
    }

    update(){
        this._cameraHelper.update();
    }

    onEnable(){
        this.entity._world._thScene.add(this._cameraHelper);
    }

    onDisable(){
        this.entity._world._thScene.remove(this._cameraHelper);
    }

    release(){
        this.entity._world._thScene.remove(this._cameraHelper);
        this._cameraHelper.dispose();
    }

}