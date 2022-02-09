import { Character } from "./character";
import { Engine } from "./gameEngine";
import { getOffset, Target } from "./helper";
import { Level } from "./level";

export class GameManager{
  private character: Character;
  private engine: Engine;
  private level: Level;
  private _targets: Target[] = [];  

  constructor(conf: {developement:boolean},engine: Engine, character: Character, level: Level){
    this.engine = engine;
    this.character = character;
    this.level = level;

    // Code for debug => TODO 2022-02-08 create a class for debug
    if(conf.developement){
      const debug = document.createElement('div');
      const debugCharacter = document.createElement('div');
      debugCharacter.id = 'character-debug';
      debug.style.position = 'absolute';
      debug.style.backgroundColor = '#ddd';
      debug.style.left = '1310px';
      debug.id = 'debug';
      debug.appendChild(debugCharacter);
      document.body.appendChild(debug);
    }
    ///

    engine.addGamingThread(() => {
      if(this.character && this.targets.length){
        for (let i = 0; i < this.targets.length; i++) {
          const target = this.targets[i];
          if(this.character.items.length){
            for(const item of this.character.items){
              if (item.position >= target.position && item.position <= target.position + getOffset(target.element)) {
                item.element.remove();  
                this.character.removeItem(item.id);
                target.element.remove();
                this.targets.splice(i,1); // need to be very carful with this because it removes element in the array it's looping on
              }
            }
          } 
        }
      }
      const character = document.getElementById('character-debug');
      if(character){
        character.innerHTML = JSON.stringify({
          side: this.character.side,
          state: this.character.state,
          items: this.character.items,
        });
      }
    })
  }

  get targets(): Target[] {
    return this._targets
  }

  public addTarget(target: Target){
    this._targets.push(target);
  }
}