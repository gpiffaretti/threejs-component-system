# ThreeJS entity component system for real time application development

## Installation
Clone the repo using your favorite client and navigate to project directory using terminal.

Install dependencies:

`npm install`

Start live server using webpack:

`npm start`

Change webpack settings as needed. By default we disable minification, but once you are confident with your implementation you can turn it back on in `webpack.config.js`:
```
optimization: {
    minimize: true,
},
```
## Design
This is meant to be an easy to use entity component system. It has very low complexity, but easy to setup and start adding behaviours. This system is highly influenced by Unity MonoBehaviour system.

This system depends on ThreeJS and at any point tries to hide or abstract its features, it's meant to play with it nicely exposing all threeJS elements for direct use.

### Simulation
Runs the game loop and keeps track of FPS. Responsible of calculating delta time for each frame update. Updates and renders the world.

### World
Contains entities, a camera (there's only one camera for the moment) and is responsible for updating all entities and for rendering the scene using the main camera.

### Entity
Has a collection of components, and lets you query the entity for a component of a specific type. Currently the entity is responsible for updating each component it contains.

### Component
Component that can hold any kind of behaviour. Can override the following methods:
- onEnable
- start
- update
- release
- onDisable

### Implementation
There's no data locality pattern being used here, so CPU cache use is not optimized at all.

This solution can be used for small scenes with few entities and components, it's not meant to scale for complex games or simulations, only simple visualizations and interactions.

## To do
- Make the component manager hold all components and be responsible for updating them. This way we can evolve this to a ECS architecture and start registering systems, and establish precedence between systems and have more control on how components are updated.

- Add an input manager. ThreeJS modules subscribe to DOM elements directly, and it's impossible to establish precedence and priorities for event handling, and also defining whether an event was handled or not. This also implies forking ThreeJS and making the modules use our input manager.

- Add some better UI integration, we used dat.GUI for our test app, but some pattern to expose the application domain to the DOM would be nice.

- Extract the base engine to a separate repo, and add it as a submodule to our test app.

- Add ThreeJS as a submodule for the engine instead of having a local copy.