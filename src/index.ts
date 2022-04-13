import {Character} from './character';
import { Engine } from './gameEngine';
import { Level } from './level';
import {Move} from './mouvement';
// import './assets/characters/Naruto.css';
import './assets/characters/ggSalas.css';
import { createControl } from './control';
import { GameManager } from './gameManager';
import { GameConfig } from './helper';
import Conf from '../conf/config.json';
const engine = new Engine();

console.log(Conf);

const config: GameConfig = {
  ...Conf,
  character: {
    controls: 'RPG',
    offset:{
      top: 12,
      right: 55,
      left: -30,
    },
    item:{
      step: 10,
      maxDistance: 500,
    }, 
    initialPosition: {
      top: 100,
      left: 580,
    }
  },
  level: {
    borderRight: 600,
    borderLeft: 0,
    scrollSpeed:10,
  }
}

const character = new Character(config.character, engine, 'ggsalas');
const level = new Level(config.level);
// Move(config.character, engine, character.element);

const manager = new GameManager(config, engine, character, level);

const control = createControl(character.element, (target) => manager.addTarget(target));

document.body.appendChild(level.element);
document.body.appendChild(character.element);
document.body.appendChild(control);