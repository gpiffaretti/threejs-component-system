import { Vector3 } from "../../lib/three/three.module.js";
import Component from "../component.js"

export default class Rotation extends Component {

    rotationSpeed;

    _object3D;

    constructor(){
        super();

    }

    start(){
        this._object3D = this.entity.thObject3D;
    }

    update(dt){
        this._object3D.rotateOnWorldAxis(new Vector3(0, 1, 0), this.rotationSpeed * dt);
    }
}