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
  controls: 'platformer' | 'RPG', 
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