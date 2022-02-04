import {Character} from './character';
import { Engine } from './gameEngine';
import { createLevel } from './level';
import {Move} from './mouvement';
import './assets/characters/Naruto.css';
import { createControle } from './control';

const engine = new Engine();

const character = new Character(engine, 'naruto');
engine.addGamingThread(() => engine.setCharacter(character.properties));

const level = createLevel(engine, character.element);
Move(engine, character.element);

const controle = createControle(character.element, (target) => engine.addTarget(target));

document.body.appendChild(level);
document.body.appendChild(character.element);
document.body.appendChild(controle);