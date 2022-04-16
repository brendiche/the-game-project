import { Engine } from "./gameEngine";
import { CharacterConfig, getPosition, setPosition, SideType, StatesRPGType } from "./helper";
import { Level } from "./level";

let INITIAL_POSSITION = {
  top: 280,
  left: 50,
}
const JUMP_SIZE = 110; 
const touchCoord = {
  x:0,
  y:0,
}

let state: 'moveRight' | 'moveLeft' | 'noMove' = 'noMove';
let stateRPG: StatesRPGType= 'stand';
// TODO 2022-02-02 : investigate this action variable related to the commented code
// const action: 'stand' | 'jump' | 'crawl' = 'stand';
// let jumpDirection: 'up' | 'down' = 'up';
let jumpInProgress = false;

export const Move = (characterConfig: CharacterConfig, engine: Engine, element: HTMLElement, level: Level): void => {
  // TODO 2022-04-12: change the way we handle this config
  INITIAL_POSSITION = characterConfig.initialPosition;
  engine.addGamingThread(() => motion(element, level));
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

const motion = (element: HTMLElement, level: Level) => {
  // if(state === 'moveRight'){
  //   moveSide(element);
  // }
  // if(state === 'moveLeft'){
  //   moveSide(element, 'left');
  // }
  // if(jumpInProgress){
  //   doJump(element, jumpDirection, 8);
  //   checkJump(element);
  // }
  // TODO 2022-04-15 : allow moving depending on level configuration
  if(allowedToMove(element,level,stateRPG)) move(stateRPG, element);
}

const move = (direction: StatesRPGType, element: HTMLElement,step = 2) => {
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

const allowedToMove = (element:HTMLElement, level: Level, direction: StatesRPGType): boolean => {
  let allowed = true;
  let poss = getPosition(element, 'left');
  switch(direction){
    case 'top':
      poss = getPosition(element, 'top');
      allowed = poss > level.config.borderTop;
      break;
      case 'down':
        poss = getPosition(element, 'top');
        allowed = poss < level.config.borderBottom;
      break;
      case 'right':
        allowed = poss < level.config.borderRight;
        break;
      case 'left':
        allowed = poss > level.config.borderLeft;
      break;
  }
  return allowed;
}

// const moveSide = (element: HTMLElement, side: SideType = 'right',step = 10) => {
//   let position = getPosition(element);
//   position = side === 'right' ? position + step : position - step;
//   if(position <= 600 && side === 'right' || position >= INITIAL_POSSITION.left && side === 'left'){ // TODO 2022-01-27 : remove the magic number
//     setPosition(element, position);
//   }
// }

// const doJump = (element: HTMLElement, direction: 'up'|'down' = 'up', step = 1) => {
//   let position = getPosition(element, 'top');
//   position = direction === 'up' ? position - step : position + step;
//   setPosition(element, position, 'top');
// }

// const checkJump = (element: HTMLElement) => {
//   const position = getPosition(element, 'top');
//   if(jumpDirection === 'up'){
//     if(position <= INITIAL_POSSITION.top - JUMP_SIZE) {
//       jumpDirection = 'down';
//     }
//   }else{
//     if(position >= INITIAL_POSSITION.top){
//       jumpDirection = 'up';
//       jumpInProgress = false;
//     }
//   }
// }