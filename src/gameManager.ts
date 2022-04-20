import { Character } from "./character";
import { Engine } from "./gameEngine";
import { characterAllowedToMove, GameConfig, getOffset, getPosition, Target } from "./helper";
import { Level } from "./level";
import { Move } from "./mouvement";

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

    Move(conf.character, engine, character.element, level);
    /**
     * Code for debug => TODO 2022-02-08 create a class for debug
     */
    if(conf.developement){
      const debug = document.createElement('div');
      const debugCharacter = document.createElement('div');
      debugCharacter.id = 'character-debug';
      debug.style.position = 'absolute';
      debug.style.backgroundColor = '#ddd';
      debug.style.left = '813px';
      debug.id = 'debug';
      debug.appendChild(debugCharacter);
      document.body.appendChild(debug);
    }

    /**
     * end debug
     */

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
          position: {
            left:getPosition(this.character.element,'left'),
            top: getPosition(this.character.element, 'top'),
          }, 
          mapped: {
            left: (getPosition(this.character.element,'left')+(this.level.map.init.bgX - getPosition(level.element, 'backgroundPositionX')))/2,
            top: (getPosition(this.character.element,'top')+(this.level.map.init.bgY - getPosition(level.element, 'backgroundPositionY')))/2,
          },
          level:{
            backgroundX: getPosition(this.level.element, 'backgroundPositionX'),
            backgroundY: getPosition(this.level.element, 'backgroundPositionY'),
          }
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
    const characterPositionLeft = getPosition(this.character.element);
    const characterPositionTop = getPosition(this.character.element, 'top');
    if(
      characterPositionLeft === this.config.level.borderRight 
      &&  this.character.stateRPG === 'right'
      && characterAllowedToMove(this.character.element, this.level, this.character.stateRPG)
    ){
      console.log('move right')
      this.level.moveLevelRPG('right')
    }
    if(
      characterPositionLeft === this.config.level.borderLeft
      &&  this.character.stateRPG === 'left'
      && characterAllowedToMove(this.character.element, this.level, this.character.stateRPG)
    ){
      this.level.moveLevelRPG('left');
    }
    if(
      characterPositionTop === this.config.level.borderTop
      &&  this.character.stateRPG === 'top'
      && characterAllowedToMove(this.character.element, this.level, this.character.stateRPG)
    ){
      this.level.moveLevelRPG('top');
    }
    if(
      characterPositionTop === this.config.level.borderBottom
      &&  this.character.stateRPG === 'down'
      && characterAllowedToMove(this.character.element, this.level, this.character.stateRPG)
    ){
      this.level.moveLevelRPG('down');
    }
  }
}