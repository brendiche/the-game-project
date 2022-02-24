import {Character} from './character';
import { Engine } from './gameEngine';
import { Level } from './level';
import {Move} from './mouvement';
import './assets/characters/Naruto.css';
import { createControle, testText } from './control';
import { GameManager } from './gameManager';
import { GameConfig } from './helper';
import Conf from '../conf/config.json';
const engine = new Engine();

console.log(Conf);

const config: GameConfig = {
  ...Conf,
  character: {
    offset:{
      top: 12,
      right: 55,
      left: -30,
    },
    item:{
      step: 10,
      maxDistance: 500,
    }
  },
  level: {
    borderRight: 1200,
    borderLeft: 0,
    scrollSpeed:10,
  }
}

const character = new Character(config.character, engine, 'naruto');
const level = new Level(config.level,engine,character.element );
Move(engine, character.element);

const manager = new GameManager(Conf, engine, character, level);

const controle = createControle(character.element, (target) => manager.addTarget(target));
const text = testText();

document.body.appendChild(level.element);
document.body.appendChild(character.element);
document.body.appendChild(controle);
document.body.appendChild(text);