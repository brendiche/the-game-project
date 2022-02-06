import { Character } from "./character";
import { Engine } from "./gameEngine";
import { getOffset } from "./helper";
import { Level } from "./level";

export class GameManager{
  private character: Character;
  private engine: Engine;
  private level: Level;

  constructor(engine: Engine, character: Character, level: Level){
    this.engine = engine;
    this.character = character;
    this.level = level;

    engine.addGamingThread(() => {
      if(this.character && engine.targets.length){
        for (let i = 0; i < engine.targets.length; i++) {
          const target = engine.targets[i];
          if(this.character.properties.items.length){
            for(const item of this.character.properties.items){
              if (item.position >= target.position && item.position <= target.position + getOffset(target.element)) {
                item.element.remove(); // TODO 2022-02-04: remove also the item in the 
                this.character.removeItem(item.id);
                target.element.remove();
                engine.targets.splice(i,1); // need to be very carful with this because it removes element in the array it's looping on
              }
            }
          } 
        }
      }
      const character = document.getElementById('character-debug');
      character.innerHTML = JSON.stringify(this.character.properties);
    })

    // Code for debug
    const debug = document.createElement('div');
    const _character = document.createElement('div');
    _character.id = 'character-debug';
    debug.style.position = 'absolute';
    debug.style.backgroundColor = '#ddd';
    debug.style.left = '1310px';
    debug.id = 'debug';
    debug.appendChild(_character);
    document.body.appendChild(debug);
  }
}