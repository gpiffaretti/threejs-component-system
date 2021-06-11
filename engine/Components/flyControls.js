import Component from "../component.js"
import { FlyControls } from "../../lib/three/examples/jsm/controls/FlyControls.js";
import { MathUtils } from "../../lib/three/build/three.module.js";

export default class FlyControlThree extends Component {

    _flyControls;
    _camera;
    _domElement;

    constructor(camera, domElement){
        super();
        this._camera = camera;
        this._domElement = domElement;
    }

    start(){
        this._flyControls = new FlyControls(this._camera, this._domElement);
        this._flyControls.movementSpeed = 4;
        this._flyControls.rollSpeed = MathUtils.degToRad(30);
        this._flyControls.autoForward = false;
        this._flyControls.dragToLook = true;
    }

    release(){
        this._flyControls.dispose();
    }

    update(dt){
        this._flyControls.update(dt);
    }
}