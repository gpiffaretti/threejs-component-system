
import * as THREE from "../../lib/three/build/three.module.js";
import Component from "../component.js"

export default class SpotLightFit extends Component {

    target;
    targetObject3D;
    spotLight;

    boundingSphere;

    constructor(spotLightTarget){
        super();

        this.target = spotLightTarget;
        this.targetObject3D = spotLightTarget.Object3D;
    }

    start(){
        this.spotLight = this.entity.Object3D;
    }

    update(dt){
        // update spotlight cone
        let bbox = new THREE.Box3().setFromObject(this.targetObject3D);
        const center = new THREE.Vector3();
        bbox.getCenter(center);
        this.boundingSphere = bbox.getBoundingSphere(new THREE.Sphere(center));
        
        const radius = this.boundingSphere.radius;
        const distance = this.targetObject3D.position.distanceTo(this.spotLight.position);

        const alpha = Math.asin(radius / distance);
        const spotLightDistance = distance + radius*4;

        this.spotLight.angle = alpha;
        this.spotLight.distance = spotLightDistance;

        // update spotlight shadow camera
        if(!this.spotLight.shadow) return;
        this.spotLight.shadow.camera.focus = distance;
        this.spotLight.shadow.camera.fov = alpha * 2;
        this.spotLight.shadow.camera.far = spotLightDistance;
        
    }
}