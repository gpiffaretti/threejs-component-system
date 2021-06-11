import Component from "../component.js"

export default class Object3DUpdate extends Component {

    constructor(){
        super();
    }

    update(dt){
        this.entity.Object3D.update();
    }
}