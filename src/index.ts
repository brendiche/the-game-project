import {Character} from './character';
import { initEngine } from './gameEngine';
import { createLevel } from './level';
import {Move} from './mouvement';

initEngine();

const character = Character();
const level = createLevel(character);
Move(character);

document.body.appendChild(level);
document.body.appendChild(character);