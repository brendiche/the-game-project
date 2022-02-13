import { Engine } from './gameEngine';
import { CharacterConfig, getPosition, setPosition, SideType, States, StateType } from './helper';
import { Item, ItemConfig } from './item';

const touchCoord = {
  x:0,
  y:0,
}

export class Character {
  private readonly htmlElement: HTMLElement;
  private readonly characterName: string;
  private readonly engine: Engine;
  private readonly config: CharacterConfig;
  private _state: StateType = 'stand';
  private _side: SideType = 'right';
  private _items: Item[] = [];

  constructor(config: CharacterConfig, engine: Engine, characterName: string){
    this.config = config;
    this.engine = engine;
    this.characterName = characterName;
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = `${characterName}-${this._state}`
    this.engine.addGamingThread(() => this.engineCallback());
    this.addListeners(this.htmlElement);
  }
  get state(): StateType{
    return this._state;
  }
  get side(): SideType{
    return this._side;
  }
  get items(): Item[]{
    return this._items;
  }

  get element(): HTMLElement{
    return this.htmlElement;
  }

  public removeItem(id: number){
    const index = this._items.map(item => item.id).indexOf(id);
    if(index !== -1){
      this._items.splice(index,1);
    }
  }

  private setState(): void {
    const classRegex = new RegExp(`${this.characterName}-(${States.join('|')})`);
    this.htmlElement.className = this.htmlElement.className.replace(classRegex, `${this.characterName}-${this._state}`);
  }
  
  private setSide(): void {
    const className = this.htmlElement.className;
    if(this._side === 'left'){
      this.htmlElement.className = className.includes('left') ? className : `${className} left`;
    }else{
      this.htmlElement.className = className.replace('left','');
    }
  }

  private engineCallback(): void {
    this.setState();
    this.setSide();
    // TODO 2022-02-04 quick fix in order to get item position
    for (let i = 0; i < this._items.length; i++) {
      // this._items[i].position = getPosition(this._items[i].element);
    }
  }

  private addListeners(component: HTMLElement): void {
    window.addEventListener('keydown' , (event) => {
      const itemConfig: ItemConfig = {
        className:'',
        style:{
          position: 'absolute',
          left: `${getPosition(component) + this.config.offset[this._side]}px`,
          top: `${getPosition(component, 'top') + this.config.offset.top}px`,
        },
        side: this._side,
      };
      console.log('[character][addListeners] keydown: ', event.key);
       switch(event.key){
         case 'ArrowRight':
           this._state = 'run';
           this._side = 'right';
         break;
         case 'ArrowLeft':
            this._state = 'run';
            this._side = 'left';
          break;
         case 'ArrowDown':
            this._state = 'down';
          break;
         case 'ArrowUp':
            this._state = 'jump';
          setTimeout(() => {
            if(this._state === 'jump') {
                this._state = 'stand';
            }
          },701)
          break;
         case ' ':
            this._state = 'throw';
            this.createItem(itemConfig,'kunai');
            break;
            
         case 's':
            this._state = 'throw';
            this.createItem(itemConfig,'shuriken');
            break;
       }
    });
    window.addEventListener('keyup' , (event) => {
      console.log('[character][addListeners] keyup: ', event.key);
       switch(event.key){
          case 'ArrowRight':
          case 'ArrowLeft':
          case 'ArrowDown':
            this._state = 'stand';
          break;
       }
    });
  
    window.addEventListener("touchstart", (event) => {
      const itemConfig: ItemConfig = {
        className:'',
        style:{
          position: 'absolute',
          left: `${getPosition(component) + this.config.offset[this._side]}px`,
          top: `${getPosition(component, 'top') + this.config.offset.top}px`,
        },
        side: this._side,
      };
      console.log('[character][addListeners] touchstart:',event);
      touchCoord.x = event.touches[0].clientX;
      touchCoord.y = event.touches[0].clientY;
      this._state = 'throw';
      this.createItem(itemConfig, 'kunai')
    });
    window.addEventListener("touchmove", (event) => {
      console.log('[character][addListeners] touchmove:',event);
      this._state = 'run';
      if(event.touches[0].clientX > touchCoord.x){
        this._side = 'right';
      }else{
        this._side = 'left';
      }
    });
    window.addEventListener('touchend', ()=> {
      this._state = 'stand';
    })
  }

  private createItem(itemConfig:ItemConfig, itemClass: string){
    const item = new Item({
      ...itemConfig,
      className: `${itemClass}${this._side === 'left' ? ' left' : ''}`
    });
    this.setMove(item);
    this._items.push(item);
    setTimeout(() => {
      if(this._state === 'throw'){
        this._state = 'stand';
      }
    },501)
  }

  private setMove(item: Item){
    this.engine.addGamingThread(() => {
      if (this.side === 'right'){
        if(item.position >= item.initialPosition + this.config.item.maxDistance){
          item.remove();
          this.removeItem(item.id);
        }else{
          setPosition(item.element, item.position + this.config.item.step);
        }
      } else {
        if(item.position <= item.initialPosition - this.config.item.maxDistance){
          item.remove();
          this.removeItem(item.id);
        }else{
          setPosition(item.element, item.position - this.config.item.step);
        }
      }
    });
  }

}
