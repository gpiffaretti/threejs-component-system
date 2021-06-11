
export default class ComponentManager {

    _world;

    _pendingInitComponents;
    _pendingReleaseComponents;

    _pendingEnableComponents;
    _pendingDisableComponents;

    constructor(world){
        this._world = world;
        this._pendingInitComponents = new Array();
        this._pendingReleaseComponents = new Array();
        this._pendingEnableComponents = new Array();
        this._pendingDisableComponents = new Array();
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

    registerEnableComponent(component){
        // check if this component was previously disabled by someone else, in that case remove it from pending disables
        const index = this._pendingDisableComponents.indexOf(component);
        if(index >=0) {
            this._pendingDisableComponents.splice(index, 1);
        }

        // add to pending enables
        this._pendingEnableComponents.push(component);
    }

    enablePendingComponents(){
        this._pendingEnableComponents.forEach(c => c.onEnable() );
        this._pendingEnableComponents = new Array();
    }

    registerDisableComponent(component){
        // check if this component was previously enabled by someone else, in that case remove it from pending enables
        const index = this._pendingEnableComponents.indexOf(component);
        if(index >=0) {
            this._pendingEnableComponents.splice(index, 1);
        }

        // add to pending disables
        this._pendingDisableComponents.push(component);
    }

    disablePendingComponents(){
        this._pendingDisableComponents.forEach(c => c.onDisable() ); 
        this._pendingDisableComponents = new Array();
    }
}
