import {Character} from './character';
import { Engine } from './gameEngine';
import { createLevel } from './level';
import {Move} from './mouvement';
import './assets/characters/Naruto.css';
import { createControle } from './control';

const engine = new Engine();

const character = Character(engine, 'naruto');
const level = createLevel(engine, character);
Move(engine, character);
const controle = createControle(character);

document.body.appendChild(level);
document.body.appendChild(character);
document.body.appendChild(controle);