
export default class Component {
    
    // fields
    _enabled = true;
    entity;

    constructor(){

    }

    get enabled(){
        return this._enabled;
    }

    set enabled(isEnabled){
        if(this._enabled && !isEnabled){
            this.entity.world._componentManager.registerDisableComponent(this);
        }else if (!this._enabled && isEnabled){
            this.entity.world._componentManager.registerEnableComponent(this);
        }
        this._enabled = isEnabled;
    }

    start(){
        
    }
    
    onEnable(){

    }

    update(dt){
        
    }

    onDisable(){

    }

    release(){
        
    }
}