import { Level } from "./level";

export const Side = ['left', 'right'] as const;
export type SideType = typeof Side[number];

export const States = ['stand', 'run', 'jump', 'throw', 'down'] as const;
export type StateType = typeof States[number];

export const StatesRPG = ['stand', 'left', 'right', 'down', 'top'] as const;
export type StatesRPGType = typeof StatesRPG[number];

export interface CharacterProperties{
  state: StateType;
  position: number;
  side: SideType;
}


export interface Target{
  id: number;
  position: number;
  element: HTMLElement;
}

export interface GameConfig{
  developement: boolean;
  character: CharacterConfig;
  level: LevelConfig;
}

export interface CharacterConfig{
  offset : {
    top: number,
    right: number,
    left: number,
  },
  item: {
    maxDistance: number,
    step: number,
  },
  initialPosition: {
    top: number,
    left: number,
  }
  speed: number,
}

export interface LevelConfig{
  borderRight: number,
  borderLeft: number,
  borderTop: number,
  borderBottom: number,
  scrollSpeed: number,
}

export const getPosition = (element: HTMLElement, prop: 'left'|'top'|'backgroundPositionX'|'backgroundPositionY' = 'left'): number => {
  const poss = getComputedStyle(element)[prop];
  return parseInt(poss.replace('px', ''));
}

export const setPosition = (element: HTMLElement, newPosition: number, axis: 'left'|'top'|'backgroundPositionX'|'backgroundPositionY' = 'left'): HTMLElement => {
  element.style[axis] = `${newPosition}px`;
  return element;
}

export const getOffset = (element: HTMLElement): number => {
  return parseInt(getComputedStyle(element).width.replace('px', ''));
}

export const createMatrix = (columns: number,rows: number): string[][] => {
  const matrixRows = Array.from('0'.repeat(rows))
  const matrix = []
  for (let i = 0; i < columns; i++) {
    matrix.push(matrixRows);
  }
  return matrix;
}

export const characterAllowedToMove = (char: HTMLElement, level: Level, direction: StatesRPGType): boolean => {
  // investigate for the offset
  const offset = {
    top: level.map.init.bgY - getPosition(level.element, 'backgroundPositionY'),
    left: level.map.init.bgX - getPosition(level.element, 'backgroundPositionX'),
  }
  // get the character mapped
  const charPoss= {
    left:0,
    top: 0
  }
  switch(direction) {
    case 'top':
      charPoss.left = (getPosition(char,'left')+offset.left)/2;
      charPoss.top = ((getPosition(char, 'top')+offset.top)/2) - 1;
    break;
    case 'down':
      charPoss.left = (getPosition(char,'left')+offset.left)/2;
      charPoss.top = ((getPosition(char, 'top')+offset.top)/2) + 1;
    break;
    case 'right':
      charPoss.left = ((getPosition(char,'left')+offset.left)/2) + 1;
      charPoss.top = (getPosition(char, 'top')+offset.top)/2;
    break;
    case 'left':
      charPoss.left = ((getPosition(char,'left')+offset.left)/2) - 1;
      charPoss.top = (getPosition(char, 'top')+offset.top)/2;
    break;
  }
  return !!level.map.map[charPoss.top][charPoss.left];
}