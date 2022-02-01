import { addGamingThread } from "./gameEngine";
import { getPosition, setPosition, SideType } from "./helper";

const INITIAL_POSSITION = {
  top: 280,
  left: 50,
}

let state: 'moveRight' | 'moveLeft' | 'noMove' = 'noMove';
let action: 'stand' | 'jump' | 'crawl' = 'stand';
let jumpDirection: 'up' | 'down' = 'up';
let jumpInProgress = false;

export const Move = (element: HTMLElement): void => {
  addGamingThread(() => motion(element));
  initElementStyle(element);
  addListeners();
} 


const addListeners = (): void  => {
  window.addEventListener('keydown' , (event) => {
     switch(event.key){
        case 'ArrowRight':
            state = "moveRight";
            break;
          case 'ArrowLeft':
            state = "moveLeft";
            break;
          case 'ArrowUp':
            if(!jumpInProgress) jumpInProgress = true;
            break;
          case 'ArrowDown':
            action = 'crawl';
            break;
          case ' ':
            state = 'noMove';
            break;
     }
  });
  window.addEventListener('keyup', (event) => {
    if(event.key === 'ArrowRight' || event.key === 'ArrowLeft'){
      state = 'noMove';
    }
    if(event.key === 'ArrowUp' || event.key === 'ArrowDown'){
      action = 'stand';
    }
  });
}

const motion = (element: HTMLElement) => {
  if(state === 'moveRight'){
    moveSide(element);
  }
  if(state === 'moveLeft'){
    moveSide(element, 'left');
  }
  if(jumpInProgress){
    doJump(element, jumpDirection, 8);
    checkJump(element);
  }
}

const initElementStyle = (element: HTMLElement) => {
  element.style.position = 'absolute';
  element.style.left = `${INITIAL_POSSITION.left}px`;
  element.style.top = `${INITIAL_POSSITION.top}px`;
}

const moveSide = (element: HTMLElement, side: SideType = 'right',step: number = 10) => {
  let position = getPosition(element);
  position = side === 'right' ? position + step : position - step;
  if(position <= 1200 && side === 'right' || position >= INITIAL_POSSITION.left && side === 'left'){ // TODO 2022-01-27 : remove the magic number
    setPosition(element, position);
  }
}

const doJump = (element: HTMLElement, direction: 'up'|'down' = 'up', step: number = 1) => {
  let position = getPosition(element, 'top');
  position = direction === 'up' ? position - step : position + step;
  setPosition(element, position, 'top');
}

const checkJump = (element: HTMLElement) => {
  const position = getPosition(element, 'top');
  if(jumpDirection === 'up'){
    if(position <= INITIAL_POSSITION.top - 80) {  // TODO 2022-01-27 : remove the magic number
      jumpDirection = 'down';
    }
  }else{
    if(position >= INITIAL_POSSITION.top){
      jumpDirection = 'up';
      jumpInProgress = false;
    }
  }
}