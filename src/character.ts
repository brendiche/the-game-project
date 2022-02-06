import { Engine } from './gameEngine';
import { CharacterProperties, getPosition, Item, SideType, States, StateType } from './helper';
import { createItem, ItemConfig } from './item';

const OFFSET_CHARACTER = {
  top: 12,
  right: 55,
  left: -30,
}

let state: StateType = 'stand';
let side: SideType = 'right';
const items: Item[] = [];

const touchCoord = {
  x:0,
  y:0,
}

export class Character {
  private readonly htmlElement: HTMLElement;
  private state: StateType = 'stand';
  constructor(engine: Engine, characterName: string){
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = `${characterName}-${this.state}`
    engine.addGamingThread(() => engineCallback(this.htmlElement, characterName));
    addListeners(engine, this.htmlElement);
  }

  get element(): HTMLElement{
    return this.htmlElement;
  }

  get properties(): CharacterProperties{
    return {
      position: getPosition(this.element),
      side,
      state,
      items,
    }
  }

  public removeItem(id: number){
    const index = items.map(item => item.id).indexOf(id);
    if(index !== -1){
      items.splice(index,1);
    }
  }

}

const engineCallback = (component: HTMLElement, characterName: string) => {
  setState(component,characterName , state);
  setSide(component, side);
  // TODO 2022-02-04 quick fix in order to get item position
  for (let i = 0; i < items.length; i++) {
    items[i].position = getPosition(items[i].element);
  }
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
          // eslint-disable-next-line no-case-declarations
          const item = createItem(engine, {
            ...itemConfig,
            className: `kunai${side === 'left' ? ' left' : ''}`
          });
          items.push({
            id: Date.now(),
            element: item,
            position: getPosition(item)
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
