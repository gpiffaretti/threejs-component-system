
export default class ComponentManager {

    _world;

    _pendingInitComponents;

    constructor(world){
        this._world = world;
        this._pendingInitComponents = new Array();
    }

    initializePendingComponents(){
        this._pendingInitComponents.forEach(c => c.start() );
        this._pendingInitComponents = new Array();
    }

    registerComponent(component) {
        this._pendingInitComponents.push(component);
    }

    unregisterComponent(component) {
        
    }
}
