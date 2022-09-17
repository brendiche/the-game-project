import { Engine } from './gameEngine';
import { CharacterConfig, SideType, StatesRPG, StatesRPGType, StateType } from './helper';

export class Character {
  private readonly htmlElement: HTMLElement;
  private readonly characterName: string;
  private readonly engine: Engine;
  private readonly config: CharacterConfig;
  private _state: StateType = 'stand';
  private _stateRPG: StatesRPGType = 'stand';
  private _side: SideType = 'right';

  constructor(config: CharacterConfig, engine: Engine, characterName: string){
    this.config = config;
    this.engine = engine;
    this.characterName = characterName;
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = `${characterName}-${this._state}`
    this.engine.addGamingThread(() => this.engineCallback());
    this.addListeners(); 
  }
  get state(): StateType{
    return this._state;
  }
  get stateRPG(): StatesRPGType{
    return this._stateRPG;
  }
  get side(): SideType{
    return this._side;
  }
 
  get element(): HTMLElement{
    return this.htmlElement;
  }

  private setState(): void {
    const classRegex = new RegExp(`${this.characterName}-(${StatesRPG.join('|')})`);
    this.htmlElement.className = this.htmlElement.className.replace(classRegex, `${this.characterName}-${this._stateRPG}`);
  }
  

  private engineCallback(): void {
    this.setState();
  }

  private addListeners():void{
    window.addEventListener('keydown', (event) => {
      switch(event.key){
        case 'ArrowRight':
          this._stateRPG = 'right';
          break;
        case 'ArrowLeft':
          this._stateRPG = 'left';
          break;
        case 'ArrowDown':
          this._stateRPG = 'down';
          break;
        case 'ArrowUp':
          this._stateRPG = 'top';
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
            this._stateRPG = 'stand';
          break;
       }
    });
  }
}
