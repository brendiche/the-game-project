import { addGamingThread } from './gameEngine';
import { getPosition, SideType } from './helper';
import { createItem } from './item';
import './Naruto.css'

const OFFSET_CHARACTER = {
  top: 12,
  left: 55,
}
const States = ['stand', 'run', 'jump', 'throw', 'down'] as const;
type StateType = typeof States[number];
let state: StateType = 'stand';
let side: SideType = 'right';

export const Character = (): HTMLElement => {
  const component = document.createElement('div');
  component.className = `naruto-${state}`;
  addGamingThread(() => test(component));
  addListeners(component);
  return component;
}

const test = (component: HTMLElement) => {
  setState(component, state);
  setSide(component, side);
}

const setState = (component: HTMLElement, state: StateType): void => {
  // console.log('[character][setState] class :', component.className);
  const classRegex = new RegExp(`naruto-(${States.join('|')})`);
  component.className = component.className.replace(classRegex, `naruto-${state}`);
}

const setSide = (component: HTMLElement, side: SideType): void => {
  if(side === 'left'){
    component.className= component.className.includes('left') ? component.className : `${component.className} left`;
  }else{
    component.className = component.className.replace('left','');
  }
}

const addListeners = (component: HTMLElement): void => {
  window.addEventListener('keydown' , (event) => {
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
          createItem('kunai', {
            position: 'absolute',
            left: `${getPosition(component) + OFFSET_CHARACTER.left}px`,
            top: `${getPosition(component, 'top') + OFFSET_CHARACTER.top}px`,
          });
          setTimeout(() => {
            if(state === 'throw'){
              state = 'stand';
            }
          },501)
          break;
          
       case 's':
          state = 'throw';
          createItem('shuriken', {
            position: 'absolute',
            left: `${getPosition(component) + OFFSET_CHARACTER.left}px`,
            top: `${getPosition(component, 'top') + OFFSET_CHARACTER.top}px`,
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
}
