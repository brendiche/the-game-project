import {Character} from './character';
import { Engine } from './gameEngine';
import { Level } from './level';
import {Move} from './mouvement';
import './assets/characters/Naruto.css';
import { createControle } from './control';
import { GameManager } from './gameManager';
import Conf from '../conf/config.json';
const engine = new Engine();

console.log(Conf);

const character = new Character(engine, 'naruto');
const level = new Level('stand',engine,character.element ); // TODO 2022-02-06 this is weird to get the state on the level it's better to get character properties
Move(engine, character.element);

const manager = new GameManager(Conf, engine, character, level);

const controle = createControle(character.element, (target) => manager.addTarget(target));

document.body.appendChild(level.element);
document.body.appendChild(character.element);
document.body.appendChild(controle);