import { Engine } from './gameEngine';
import { getPosition, setPosition } from './helper';
import './assets/levels/level.css'

const State = ['moveRight', 'moveLeft', 'stand'] as const;
type StateType = typeof State[number];
const LEVEL_CONFIG = {
  borderRight: 1200,
  borderLeft: 0,
  scrollSpeed:10,
}

export class Level {
  private level: HTMLElement;
  private state: StateType;

  constructor(state: StateType = 'stand', engine: Engine, character: HTMLElement){
    this.state = state;
    this.level = document.createElement('div');
    this.initLevel();
    this.addListeners();
    engine.addGamingThread(() => this.checkCharacterPosition(character, this.level));
  }

  get element(): HTMLElement{
    return this.level;
  }

  private checkCharacterPosition(character: HTMLElement, level: HTMLElement) {
    const characterPosition = getPosition(character);
    const levelPosition = getPosition(level, 'backgroundPositionX');
    if(characterPosition === 1200 && this.state === 'moveRight' && levelPosition > -LEVEL_CONFIG.borderRight){ // TODO 2022-01-27: move this magic number
      setPosition(level, levelPosition-LEVEL_CONFIG.scrollSpeed, 'backgroundPositionX');
    }
    if(characterPosition === 50 && this.state === 'moveLeft' && levelPosition < LEVEL_CONFIG.borderLeft){ // TODO 2022-01-27: move this magic number
      setPosition(level, levelPosition+LEVEL_CONFIG.scrollSpeed, 'backgroundPositionX');
    }
  }

  private addListeners(){
    window.addEventListener('keydown' , (event) => {
      if(event.key === 'ArrowRight'){
        this.state = 'moveRight'
      }
      if(event.key === 'ArrowLeft'){
        this.state = 'moveLeft'
      }
    });
    window.addEventListener('keyup' , (event) => {
      if(event.key === 'ArrowRight' || event.key === 'ArrowLeft'){
        this.state = 'stand'
      }
    });
  }

  private initLevel(): void{
    this.level.className = 'forest';
    this.level.style.backgroundPositionX = '0px';
  }
}