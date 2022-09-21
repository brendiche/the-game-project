import {Character} from './engine/character';
import { Engine } from './engine/gameEngine';
import { Level } from './engine/level';

import './assets/characters/ggSalas.css';
import { Control } from './control';
import { GameManager } from './gameManager';
import { CharacterConfig, GameConfig } from './engine/helper';
import Conf from '../conf/config.json';
const engine = new Engine();

const characterConf: CharacterConfig = {
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
    top: 190,
    left: 606,
  },
  speed: 2,
}
const levelConf = {
  borderRight: 650,
  borderTop: 50,
  borderBottom: 580,
  borderLeft: 50,
  scrollSpeed:2,
}

const config: GameConfig = {
  ...Conf,
  character: characterConf,
  level: levelConf,
}

const character = new Character(config.character, engine, 'ggsalas');
const level = new Level(config.level);

const control = new Control();
new GameManager(config, engine, character, level, control);

document.body.appendChild(level.element);
document.body.appendChild(character.element);
document.body.appendChild(control.element);