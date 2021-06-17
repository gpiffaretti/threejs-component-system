
export class Entity {

    _world;
    _componentManager;
    _components = new Array();

    _Object3D;

    get name(){
        return this._Object3D.name;
    }
    
    set name(newName){
        this._Object3D.name = newName;
    }

    get world(){
        return this._world;
    }

    constructor(world, componentManager){
        this._world = world;
        this._componentManager = componentManager;
    }

    get Object3D(){
        return this._Object3D;
    }

    set Object3D(obj3D){
        // we assume that the old Object3D won't need to be in the scene anymore
        if(this._Object3D)
            this._world._thScene.remove(this._Object3D);
        // assign and add the new one to the scene
        this._Object3D = obj3D;
        this._world._thScene.add(this._Object3D);
    }

    addComponent(component){
        component.entity = this;
        this._componentManager.registerComponent(component);
        this._components.push(component);
    }

    removeComponent(){
        component.entity = this;
        this._componentManager.unregisterComponent(component);
        const index = this._components.indexOf(component);
        this._components.splice(index, 1);
    }

    getComponent(componentType){
        return this._components.find(c => c instanceof componentType);
    }

    update(dt){
        this._components.forEach(component => {
            if(component.enabled)
                component.update(dt);
        });
    }

}
