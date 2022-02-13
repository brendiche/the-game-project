import { Engine } from './gameEngine';
import { getPosition, LevelConfig, setPosition } from './helper';
import './assets/levels/level.css'

const State = ['moveRight', 'moveLeft', 'stand'] as const;
type StateType = typeof State[number];

export class Level {
  private readonly config: LevelConfig;
  private level: HTMLElement;
  private state: StateType;

  constructor(config: LevelConfig, engine: Engine, character: HTMLElement, state: StateType = 'stand') {
    this.config = config;
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
    if(characterPosition === 1200 && this.state === 'moveRight' && levelPosition > -this.config.borderRight){ // TODO 2022-01-27: move this magic number
      setPosition(level, levelPosition-this.config.scrollSpeed, 'backgroundPositionX');
    }
    if(characterPosition === 50 && this.state === 'moveLeft' && levelPosition < this.config.borderLeft){ // TODO 2022-01-27: move this magic number
      setPosition(level, levelPosition+this.config.scrollSpeed, 'backgroundPositionX');
    }
  }

  private addListeners(){ // TODO 2022-02-13: remove this listener because it should get the state of the character
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