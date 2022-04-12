import { Character } from "./character";
import { Engine } from "./gameEngine";
import { GameConfig, getOffset, getPosition, Target } from "./helper";
import { Level } from "./level";

export class GameManager{
  private character: Character;
  private engine: Engine;
  private level: Level;
  private _targets: Target[] = []; 
  private readonly config: GameConfig;

  constructor(conf: GameConfig, engine: Engine, character: Character, level: Level){
    this.config = conf;
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
      this.handleTargets();
      this.handleLevel();
      // TODO 2022-04-05 : add level mouvement
      const characterDebug = document.getElementById('character-debug');
      if(characterDebug){
        characterDebug.innerHTML = JSON.stringify({
          side: this.character.side,
          state: this.character.state,
          items: this.character.items,
          position: getPosition(this.character.element)
        });
      }
    });
  }

  get targets(): Target[] {
    return this._targets
  }

  public addTarget(target: Target){
    this._targets.push(target);
  }

  private handleTargets():void {
    this.targets.map((target, i) => {
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
    })
  }

  private handleLevel(): void{
    const characterPosition = getPosition(this.character.element);
    const levelPosition = getPosition(this.level.element, 'backgroundPositionX');
    if(
      characterPosition === this.config.level.borderRight 
      && this.character.side === 'right' 
      &&  this.character.state === 'run' 
      && levelPosition > - this.config.level.borderRight 
    ){
      this.level.moveLevel(this.character.side);
    }
    if(
      characterPosition === this.config.character.initialPosition.left
      && this.character.side === 'left' 
      &&  this.character.state === 'run' 
      && levelPosition < this.config.level.borderLeft 
    ){
      this.level.moveLevel(this.character.side);
    }
  }
}