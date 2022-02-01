import { addGamingThread } from './gameEngine';
import { getPosition, setPosition } from './helper';
import './level.css'

const State = ['moveRight', 'moveLeft', 'stand'] as const;
type StateType = typeof State[number];
const LEVEL_CONFIG = {
  borderRight: 1200,
  borderLeft: 0,
  scrollSpeed:10,
}

let state: StateType = 'stand'; 
export const createLevel = (charater: HTMLElement) => {
  const level = document.createElement('div');
  initLevel(level)
  addListeners();
  addGamingThread(() => checkCharacterPosition(charater, level));
  return level;
}

const initLevel = (element: HTMLElement): void => {
  element.className = 'forest';
  element.style.backgroundPositionX = '0px';
}

const checkCharacterPosition = (character: HTMLElement, level: HTMLElement) => {
  const characterPosition = getPosition(character);
  const levelPosition = getPosition(level, 'backgroundPositionX');
  if(characterPosition === 1200 && state === 'moveRight' && levelPosition > -LEVEL_CONFIG.borderRight){ // TODO 2022-01-27: move this magic number
    setPosition(level, levelPosition-LEVEL_CONFIG.scrollSpeed, 'backgroundPositionX');
  }
  if(characterPosition === 50 && state === 'moveLeft' && levelPosition < LEVEL_CONFIG.borderLeft){ // TODO 2022-01-27: move this magic number
    setPosition(level, levelPosition+LEVEL_CONFIG.scrollSpeed, 'backgroundPositionX');
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