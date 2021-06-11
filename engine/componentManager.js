
export default class ComponentManager {

    _world;

    _pendingInitComponents;
    _pendingReleaseComponents;

    constructor(world){
        this._world = world;
        this._pendingInitComponents = new Array();
        this._pendingReleaseComponents = new Array();
    }

    registerComponent(component) {
        this._pendingInitComponents.push(component);
    }

    initializePendingComponents(){
        this._pendingInitComponents.forEach(c => c.start() );
        this._pendingInitComponents = new Array();
    }

    unregisterComponent(component) {
        this._pendingReleaseComponents.push(component);
    }

    releasePendingComponents(){
        this._pendingReleaseComponents.forEach(c => c.release() );
        this._pendingReleaseComponents = new Array();
    }
}
