import { getPosition, LevelConfig, setPosition, SideType } from './helper';
import './assets/levels/level.css'

export class Level {
  private readonly config: LevelConfig;
  private level: HTMLElement;

  constructor(config: LevelConfig) {
    this.config = config;
    this.level = document.createElement('div');
    this.initLevel();
  }

  get element(): HTMLElement{
    return this.level;
  }

  public moveLevel(side: SideType){
    const levelPosition = getPosition(this.element, 'backgroundPositionX');
    if(side === 'right'){
      setPosition(this.element, levelPosition-this.config.scrollSpeed, 'backgroundPositionX');
    }else{
      setPosition(this.element, levelPosition+this.config.scrollSpeed, 'backgroundPositionX');
    }
  }

  private initLevel(): void{
    this.level.className = 'zelda';
    // this.level.style.backgroundPositionX = '0px';
  }
}