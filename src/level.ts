import { getPosition, LevelConfig, setPosition, SideType, StatesRPGType } from './helper';
import './assets/levels/level.css'

export class Level {
  private readonly _config: LevelConfig;
  private level: HTMLElement;

  constructor(config: LevelConfig) {
    this._config = config;
    this.level = document.createElement('div');
    this.initLevel();
  }

  get element(): HTMLElement{
    return this.level;
  }

  get config(): LevelConfig{
    return this._config;
  }

  public moveLevel(side: SideType){
    
    const levelPosition = getPosition(this.element, 'backgroundPositionX');
    if(side === 'right'){
      setPosition(this.element, levelPosition-this.config.scrollSpeed, 'backgroundPositionX');
    }else{
      setPosition(this.element, levelPosition+this.config.scrollSpeed, 'backgroundPositionX');
    }
  }

  public moveLevelRPG(direction: StatesRPGType): void{
    const levelPositionLeft = getPosition(this.element, 'backgroundPositionX');
    const levelPositionTop = getPosition(this.element, 'backgroundPositionY');
    switch(direction){
      case 'right':
        setPosition(this.element, levelPositionLeft-this.config.scrollSpeed, 'backgroundPositionX');
        break;
      case 'left':
        setPosition(this.element, levelPositionLeft+this.config.scrollSpeed, 'backgroundPositionX');
        break;
      case 'top':
        setPosition(this.element, levelPositionTop+this.config.scrollSpeed, 'backgroundPositionY');
        break;
      case 'down':
        setPosition(this.element, levelPositionTop-this.config.scrollSpeed, 'backgroundPositionY');
        break;
    }
  }

  private initLevel(): void{
    this.level.className = 'zelda';
    // this.level.style.backgroundPositionX = '0px';
  }
}