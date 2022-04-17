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
let step = 1;

export const Move = (characterConfig: CharacterConfig, engine: Engine, element: HTMLElement, level: Level): void => {
  // TODO 2022-04-12: change the way we handle this config
  INITIAL_POSSITION = characterConfig.initialPosition;
  step = characterConfig.speed;
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

const allowedToMove = (element:HTMLElement, level: Level, direction: StatesRPGType): boolean => {
  let allowed = true;
  let poss = getPosition(element, 'left');
  switch(direction){
    case 'top':
      poss = getPosition(element, 'top');
      allowed = poss > level.config.borderTop && getMappedWorldAlloawed(element, level, direction);
      break;
      case 'down':
        poss = getPosition(element, 'top');
        allowed = poss < level.config.borderBottom && getMappedWorldAlloawed(element, level, direction);
      break;
      case 'right':
        allowed = poss < level.config.borderRight && getMappedWorldAlloawed(element, level, direction);
        break;
      case 'left':
        allowed = poss > level.config.borderLeft && getMappedWorldAlloawed(element, level, direction);
      break;
  }
  return allowed;
}

const getMappedWorldAlloawed = (char: HTMLElement, level: Level, direction: StatesRPGType): boolean => {
  // investigate for the offset
  const offset = {
    top: level.map.init.bgY - getPosition(level.element, 'backgroundPositionY'),
    left: level.map.init.bgX - getPosition(level.element, 'backgroundPositionX'),
  }
  // get the character mapped
  const charPoss= {
    left:0,
    top: 0
  }
  switch(direction) {
    case 'top':
      charPoss.left = (getPosition(char,'left')+offset.left)/2;
      charPoss.top = ((getPosition(char, 'top')+offset.top)/2) - 1;
    break;
    case 'down':
      charPoss.left = (getPosition(char,'left')+offset.left)/2;
      charPoss.top = ((getPosition(char, 'top')+offset.top)/2) + 1;
    break;
    case 'right':
      charPoss.left = ((getPosition(char,'left')+offset.left)/2) + 1;
      charPoss.top = (getPosition(char, 'top')+offset.top)/2;
    break;
    case 'left':
      charPoss.left = ((getPosition(char,'left')+offset.left)/2) - 1;
      charPoss.top = (getPosition(char, 'top')+offset.top)/2;
    break;
  }
  return !!level.map.map[charPoss.top][charPoss.left];
}