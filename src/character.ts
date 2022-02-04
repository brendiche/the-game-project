import { Engine } from './gameEngine';
import { getPosition, SideType } from './helper';
import { createItem, ItemConfig } from './item';

const OFFSET_CHARACTER = {
  top: 12,
  right: 55,
  left: -30,
}
const States = ['stand', 'run', 'jump', 'throw', 'down'] as const;
type StateType = typeof States[number];
let state: StateType = 'stand';
let side: SideType = 'right';

const touchCoord = {
  x:0,
  y:0,
}

export const Character = (engine: Engine, characterName: string): HTMLElement => {
  const component = document.createElement('div');
  component.className = `${characterName}-${state}`;
  engine.addGamingThread(() => engineCallback(component, characterName));
  addListeners(engine, component);
  return component;
}

const engineCallback = (component: HTMLElement, characterName: string) => {
  setState(component,characterName , state);
  setSide(component, side);
}

const setState = (component: HTMLElement,characterName: string, state: StateType): void => {
  const classRegex = new RegExp(`${characterName}-(${States.join('|')})`);
  component.className = component.className.replace(classRegex, `${characterName}-${state}`);
}

const setSide = (component: HTMLElement, side: SideType): void => {
  if(side === 'left'){
    component.className= component.className.includes('left') ? component.className : `${component.className} left`;
  }else{
    component.className = component.className.replace('left','');
  }
}

const addListeners = (engine: Engine, component: HTMLElement): void => {
  window.addEventListener('keydown' , (event) => {
    const itemConfig: ItemConfig = {
      className:'',
      style:{
        position: 'absolute',
        left: `${getPosition(component) + OFFSET_CHARACTER[side]}px`,
        top: `${getPosition(component, 'top') + OFFSET_CHARACTER.top}px`,
      },
      side,
    };
    console.log('[character][addListeners] keydown: ', event.key);
     switch(event.key){
       case 'ArrowRight':
         state = 'run';
         side = 'right';
       break;
       case 'ArrowLeft':
          state = 'run';
          side = 'left';
        break;
       case 'ArrowDown':
          state = 'down';
        break;
       case 'ArrowUp':
         state = 'jump';
        setTimeout(() => {
          if(state === 'jump') {
            state = 'stand';
          }
        },701)
        break;
       case ' ':
          state = 'throw';
          createItem(engine, {
            ...itemConfig,
            className: `kunai${side === 'left' ? ' left' : ''}`
          });
          setTimeout(() => {
            if(state === 'throw'){
              state = 'stand';
            }
          },501)
          break;
          
       case 's':
          state = 'throw';
          createItem(engine, {
            ...itemConfig,
            className: `shuriken${side === 'left' ? ' left' : ''}`
          });
          setTimeout(() => {
            if(state === 'throw'){
              state = 'stand';
            }
          },501)
          break;
          
     }
  });
  window.addEventListener('keyup' , (event) => {
    console.log('[character][addListeners] keyup: ', event.key);
     switch(event.key){
        case 'ArrowRight':
        case 'ArrowLeft':
        case 'ArrowDown':
          state = 'stand';
        break;
     }
  });

  window.addEventListener("touchstart", (event) => {
    const itemConfig: ItemConfig = {
      className:'',
      style:{
        position: 'absolute',
        left: `${getPosition(component) + OFFSET_CHARACTER[side]}px`,
        top: `${getPosition(component, 'top') + OFFSET_CHARACTER.top}px`,
      },
      side,
    };
    console.log('[character][addListeners] touchstart:',event);
    touchCoord.x = event.touches[0].clientX;
    touchCoord.y = event.touches[0].clientY;
    state = 'throw';
    createItem(engine, {
      ...itemConfig,
      className: `kunai${side === 'left' ? ' left' : ''}`
    });
    setTimeout(() => {
      if(state === 'throw'){
        state = 'stand';
      }
    },501);
  });
  window.addEventListener("touchmove", (event) => {
    console.log('[character][addListeners] touchmove:',event);
    state = 'run';
    if(event.touches[0].clientX > touchCoord.x){
      side = 'right';
    }else{
      side = 'left';
    }
  });
  window.addEventListener('touchend', ()=> {
    state = 'stand';
  })
}
