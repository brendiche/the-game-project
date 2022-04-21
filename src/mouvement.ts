import { Control } from "./control";
import { Engine } from "./gameEngine";
import { characterAllowedToMove, CharacterConfig, getPosition, setPosition, StatesRPGType } from "./helper";
import { Level } from "./level";

let INITIAL_POSSITION = {
  top: 280,
  left: 50,
}
const touchCoord = {
  x:0,
  y:0,
}

let state: 'moveRight' | 'moveLeft' | 'noMove' = 'noMove';
let stateRPG: StatesRPGType= 'stand';
let jumpInProgress = false;
let step = 1;

export const Move = (characterConfig: CharacterConfig, engine: Engine, element: HTMLElement, level: Level, control: Control): void => {
  // TODO 2022-04-12: change the way we handle this config
  INITIAL_POSSITION = characterConfig.initialPosition;
  step = characterConfig.speed;
  engine.addGamingThread(() => motion(element, level, control));
  initElementStyle(element);
  if(characterConfig.controls === 'platformer'){
    addListenersPlatformer();
  }else {
    addListenersRPG();
  }
} 

const addListenersRPG = (): void => {
  window.addEventListener('keydown', (event) => {
    switch(event.key){
      case 'ArrowRight':
        stateRPG = 'right';
        break;
      case 'ArrowLeft':
        stateRPG = 'left';
        break;
      case 'ArrowDown':
        stateRPG = 'down';
        break;
      case 'ArrowUp':
        stateRPG = 'top';
        break;
    }
  });
  window.addEventListener('keyup' , (event) => {
    console.log('[character][addListeners] keyup: ', event.key);
     switch(event.key){
        case 'ArrowRight':
        case 'ArrowLeft':
        case 'ArrowDown':
        case 'ArrowUp':
          stateRPG = 'stand';
        break;
     }
  });
}

const addListenersPlatformer = (): void  => {
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
          // case 'ArrowDown':
          //   action = 'crawl';
          //   break;
          case ' ':
            state = 'noMove';
            break;
     }
  });
  window.addEventListener('keyup', (event) => {
    if(event.key === 'ArrowRight' || event.key === 'ArrowLeft'){
      state = 'noMove';
    }
    // if(event.key === 'ArrowUp' || event.key === 'ArrowDown'){
    //   action = 'stand';
    // }
  });
  window.addEventListener("touchstart", (event) => {
    touchCoord.x = event.touches[0].clientX;
    touchCoord.y = event.touches[0].clientY;
  });
  window.addEventListener("touchmove", (event) => {
    console.log('[character][addListeners] touchmove:',event);
    if(event.touches[0].clientX > touchCoord.x){
      state = "moveRight";
    }else{
      state = "moveLeft";
    }
  });
  window.addEventListener('touchend', ()=> {
    state = 'noMove';
  })
}

const motion = (element: HTMLElement, level: Level, control: Control) => {
  if(allowedToMove(element,level,stateRPG, control)) move(stateRPG, element);
}

const move = (direction: StatesRPGType, element: HTMLElement) => {
  let position = getPosition(element, 'top');
  switch(direction){
    case 'top':
      position -= step;
      setPosition(element, position, 'top');
      break;
      case 'down':
      position += step;
      setPosition(element, position, 'top');
      break;
      case 'right':
        position = getPosition(element, 'left')
        position += step;
        setPosition(element, position, 'left');
        break;
      case 'left':
        position = getPosition(element, 'left')
        position -= step;
      setPosition(element, position, 'left');
      break;
  }
}

const initElementStyle = (element: HTMLElement) => {
  element.style.position = 'absolute';
  element.style.left = `${INITIAL_POSSITION.left}px`;
  element.style.top = `${INITIAL_POSSITION.top}px`;
}

const allowedToMove = (element:HTMLElement, level: Level, direction: StatesRPGType, control: Control): boolean => {
  if (control.isMenuOpen) return false;
  let allowed = true;
  let poss = getPosition(element, 'left');
  switch(direction){
    case 'top':
      poss = getPosition(element, 'top');
      allowed = poss > level.config.borderTop && characterAllowedToMove(element, level, direction);
      break;
      case 'down':
        poss = getPosition(element, 'top');
        allowed = poss < level.config.borderBottom && characterAllowedToMove(element, level, direction);
      break;
      case 'right':
        allowed = poss < level.config.borderRight && characterAllowedToMove(element, level, direction);
        break;
      case 'left':
        allowed = poss > level.config.borderLeft && characterAllowedToMove(element, level, direction);
      break;
  }
  return allowed;
}