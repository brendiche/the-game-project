import { Engine } from './gameEngine';
import { CharacterProperties, getPosition, Item, SideType, States, StateType } from './helper';
import { createItem, ItemConfig } from './item';

const OFFSET_CHARACTER = {
  top: 12,
  right: 55,
  left: -30,
}

const touchCoord = {
  x:0,
  y:0,
}

export class Character {
  private readonly htmlElement: HTMLElement;
  private readonly characterName: string;
  private readonly engine: Engine;
  private state: StateType = 'stand';
  private side: SideType = 'right';
  private items: Item[] = [];

  constructor(engine: Engine, characterName: string){
    this.engine = engine;
    this.characterName = characterName;
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = `${characterName}-${this.state}`
    engine.addGamingThread(() => this.engineCallback());
    this.addListeners(this.htmlElement);
  }

  get element(): HTMLElement{
    return this.htmlElement;
  }

  get properties(): CharacterProperties{
    return {
      position: getPosition(this.element),
      side: this.side,
      state: this.state,
      items: this.items,
    }
  }

  public removeItem(id: number){
    const index = this.items.map(item => item.id).indexOf(id);
    if(index !== -1){
      this.items.splice(index,1);
    }
  }

  private setState(): void {
    const classRegex = new RegExp(`${this.characterName}-(${States.join('|')})`);
    this.htmlElement.className = this.htmlElement.className.replace(classRegex, `${this.characterName}-${this.state}`);
  }
  
  private setSide(): void {
    const className = this.htmlElement.className;
    if(this.side === 'left'){
      this.htmlElement.className = className.includes('left') ? className : `${className} left`;
    }else{
      this.htmlElement.className = className.replace('left','');
    }
  }

  private engineCallback(): void {
    this.setState();
    this.setSide();
    // TODO 2022-02-04 quick fix in order to get item position
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].position = getPosition(this.items[i].element);
    }
  }

  private addListeners(component: HTMLElement): void {
    window.addEventListener('keydown' , (event) => {
      const itemConfig: ItemConfig = {
        className:'',
        style:{
          position: 'absolute',
          left: `${getPosition(component) + OFFSET_CHARACTER[this.side]}px`,
          top: `${getPosition(component, 'top') + OFFSET_CHARACTER.top}px`,
        },
        side: this.side,
      };
      console.log('[character][addListeners] keydown: ', event.key);
       switch(event.key){
         case 'ArrowRight':
           this.state = 'run';
           this.side = 'right';
         break;
         case 'ArrowLeft':
            this.state = 'run';
            this.side = 'left';
          break;
         case 'ArrowDown':
            this.state = 'down';
          break;
         case 'ArrowUp':
            this.state = 'jump';
          setTimeout(() => {
            if(this.state === 'jump') {
                this.state = 'stand';
            }
          },701)
          break;
         case ' ':
            this.state = 'throw';
            this.handleItem(itemConfig,'kunai');
            break;
            
         case 's':
            this.state = 'throw';
            this.handleItem(itemConfig,'shuriken');
            break;
       }
    });
    window.addEventListener('keyup' , (event) => {
      console.log('[character][addListeners] keyup: ', event.key);
       switch(event.key){
          case 'ArrowRight':
          case 'ArrowLeft':
          case 'ArrowDown':
            this.state = 'stand';
          break;
       }
    });
  
    window.addEventListener("touchstart", (event) => {
      const itemConfig: ItemConfig = {
        className:'',
        style:{
          position: 'absolute',
          left: `${getPosition(component) + OFFSET_CHARACTER[this.side]}px`,
          top: `${getPosition(component, 'top') + OFFSET_CHARACTER.top}px`,
        },
        side: this.side,
      };
      console.log('[character][addListeners] touchstart:',event);
      touchCoord.x = event.touches[0].clientX;
      touchCoord.y = event.touches[0].clientY;
      this.state = 'throw';
      this.handleItem(itemConfig, 'kunai')
    });
    window.addEventListener("touchmove", (event) => {
      console.log('[character][addListeners] touchmove:',event);
      this.state = 'run';
      if(event.touches[0].clientX > touchCoord.x){
        this.side = 'right';
      }else{
        this.side = 'left';
      }
    });
    window.addEventListener('touchend', ()=> {
      this.state = 'stand';
    })
  }

  private handleItem(itemConfig:ItemConfig, itemClass: string){
    const id = Date.now();
    const item = createItem(this.engine, {
      ...itemConfig,
      className: `${itemClass}${this.side === 'left' ? ' left' : ''}`
    }, () => this.removeItem(id));
    this.items.push({
      id,
      element: item,
      position: getPosition(item)
    });
    setTimeout(() => {
      if(this.state === 'throw'){
        this.state = 'stand';
      }
    },501)
  }

}
