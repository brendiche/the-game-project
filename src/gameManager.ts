import { Character } from "./engine/character";
import { Control } from "./control";
import { Engine } from "./engine/gameEngine";
import { characterAllowedToMove, GameConfig, getPosition } from "./engine/helper";
import { Level } from "./engine/level";
import { Move } from "./engine/mouvement";
import { Fight } from "./game/fight";

export class GameManager {
  private character: Character;
  private level: Level;
  private readonly config: GameConfig;

  constructor(conf: GameConfig, engine: Engine, character: Character, level: Level, control: Control){
    this.config = conf;
    this.character = character;
    this.level = level;

    Move(conf.character, engine, character.element, level, control);
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
      this.handleLevel();
      const characterDebug = document.getElementById('character-debug');
      if(characterDebug){
        characterDebug.innerHTML = JSON.stringify({
          side: this.character.side,
          state: this.character.state,
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