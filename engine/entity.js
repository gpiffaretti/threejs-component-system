
export class Entity {

    _world;
    _componentManager;
    _components = new Array();

    _thObject3D;

    constructor(world, componentManager){
        this._world = world;
        this._componentManager = componentManager;
    }

    get thObject3D(){
        return this._thObject3D;
    }

    set thObject3D(obj3D){
        // we assume that the old Object3D won't need to be in the scene anymore
        if(this._thObject3D)
            this._world._thScene.remove(this._thObject3D);
        // assign and add the new one to the scene
        this._thObject3D = obj3D;
        this._world._thScene.add(this._thObject3D);
    }

    addComponent(component){
        component.entity = this;
        this._componentManager.registerComponent(component);
        this._components.push(component);
    }

    getComponent(componentType){
        return this._components.find(c => c instanceof componentType);
    }

    update(dt){
        this._components.forEach(component => {
            component.update(dt);
        });
    }

}
