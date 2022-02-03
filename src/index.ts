import {Character} from './character';
import { Engine } from './gameEngine';
import { createLevel } from './level';
import {Move} from './mouvement';
import './assets/characters/Naruto.css';

const engine = new Engine();

const character = Character(engine, 'naruto');
const level = createLevel(engine, character);
Move(engine, character);

document.body.appendChild(level);
document.body.appendChild(character);