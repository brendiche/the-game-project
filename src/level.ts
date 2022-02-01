import { addGamingThread } from './gameEngine';
import { getPosition, setPosition } from './helper';
import './level.css'

const State = ['moveRight', 'moveLeft', 'stand'] as const;
type StateType = typeof State[number];

let state: StateType = 'stand'; 
export const createLevel = (charater: HTMLElement) => {
  const element = document.createElement('div');
  element.className = 'forest';
  element.style.backgroundPositionX = '0px'; // TODO 2022-01-27: change this init
  addListeners();
  addGamingThread(() => checkCharacterPosition(charater, element));
  return element;
}

const checkCharacterPosition = (character: HTMLElement, level: HTMLElement) => {
  const characterPosition = getPosition(character);
  const levelPosition = getPosition(level, 'backgroundPositionX');
  if(characterPosition === 1200 && state === 'moveRight' && levelPosition > -1200){ // TODO 2022-01-27: move this magic number
    setPosition(level, levelPosition-5, 'backgroundPositionX');
  }
  if(characterPosition === 50 && state === 'moveLeft' && levelPosition < 0){ // TODO 2022-01-27: move this magic number
    setPosition(level, levelPosition+5, 'backgroundPositionX');
  }
}

const addListeners = () => {
  window.addEventListener('keydown' , (event) => {
    if(event.key === 'ArrowRight'){
      state = 'moveRight'
    }
    if(event.key === 'ArrowLeft'){
      state = 'moveLeft'
    }
  });
  window.addEventListener('keyup' , (event) => {
    if(event.key === 'ArrowRight' || event.key === 'ArrowLeft'){
      state = 'stand'
    }
  });
}