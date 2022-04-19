import { createMatrix, getPosition, LevelConfig, setPosition, SideType, StatesRPGType } from './helper';
import './assets/levels/level.css'



export class Level {
  private readonly _config: LevelConfig;
  private _map: number[][];
  private level: HTMLElement;

  constructor(config: LevelConfig) {
    this._config = config;
    this.level = document.createElement('div');
    const matrix = createMatrix(181,380);
    console.log('matrix',matrix);
    this._map = this.initLevel(matrix);
    console.log('map',this._map);
  }

  get element(): HTMLElement{
    return this.level;
  }

  get config(): LevelConfig{
    return this._config;
  }
  
  get map(): {
    map: number[][],
    init: {
      bgX:number,
      bgY:number
    }
  } {
    return {
      map: this._map,
      init: {
        bgX: 5642,
        bgY: 1240
      }
    }
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

  private initLevel(matrix: string[][]): number[][]{
    this.level.className = 'zelda';
    const map: number[][] = Array(matrix.length).fill(0).map(() => Array(matrix[0].length).fill(0));
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if(i === 0 || j === 0 || i === matrix.length -1 || j === matrix[i].length -1){
          map[i][j] = 0
        } else {
          map[i][j] = 1
        }
      }
    }
    // draw houses
    for(let i = 86;i <= 121; i++ ){
      for (let j = 0; j <= 48; j++) {
        map[i][j]=0
      }
    }
    for(let top = 1;top <= 15; top++ ){
      for (let left = 140; left <= 219; left++) {
        map[top][left]=0
      }
    }
    for(let top = 117;top <= 169; top++ ){
      for (let left = 157; left <= 218; left++) {
        map[top][left]=0
      }
    }
    // draw trees
    for(let i = 166;i <= 179; i++ ){
      for (let j = 80; j <= 153; j++) {
        map[i][j]=0
      }
    }
    for(let i = 57;i <= 165; i++ ){
      for (let j = 95; j <= 140; j++) {
        map[i][j]=0
      }
    }
    // draw walls
    for(let top = 101;top <= 128; top++ ){
      for (let left = 140; left <= 251; left++) {
        map[top][left]=0
      }
    }
    return map;
  }
}