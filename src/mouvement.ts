import { Engine } from "./gameEngine";
import { getPosition, setPosition, SideType } from "./helper";

const INITIAL_POSSITION = {
  top: 280,
  left: 50,
}

const touchCoord = {
  x:0,
  y:0,
}

let state: 'moveRight' | 'moveLeft' | 'noMove' = 'noMove';
// TODO 2022-02-02 : investigate this action variable related to the commented code
// const action: 'stand' | 'jump' | 'crawl' = 'stand';
let jumpDirection: 'up' | 'down' = 'up';
let jumpInProgress = false;

export const Move = (engine: Engine, element: HTMLElement): void => {
  engine.addGamingThread(() => motion(element));
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

const moveSide = (element: HTMLElement, side: SideType = 'right',step = 10) => {
  let position = getPosition(element);
  position = side === 'right' ? position + step : position - step;
  if(position <= 1200 && side === 'right' || position >= INITIAL_POSSITION.left && side === 'left'){ // TODO 2022-01-27 : remove the magic number
    setPosition(element, position);
  }
}

const doJump = (element: HTMLElement, direction: 'up'|'down' = 'up', step = 1) => {
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