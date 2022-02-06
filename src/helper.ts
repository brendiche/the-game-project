export const Side = ['left', 'right'] as const;
export type SideType = typeof Side[number];

export const States = ['stand', 'run', 'jump', 'throw', 'down'] as const;
export type StateType = typeof States[number];

export interface CharacterProperties{
  state: StateType;
  position: number;
  side: SideType;
  items: Item[]
}

export interface Item {
  id: number;
  position: number;
  element: HTMLElement;
}

export interface Target{
  id: number;
  position: number;
  element: HTMLElement;
}

export const getPosition = (element: HTMLElement, prop: 'left'|'top'|'backgroundPositionX' = 'left'): number => {
  const poss = element.style[prop];
  return parseInt(poss.replace('px', ''));
}

export const setPosition = (element: HTMLElement, newPosition: number, axis: 'left'|'top'|'backgroundPositionX' = 'left'): HTMLElement => {
  element.style[axis] = `${newPosition}px`;
  return element;
}

export const getOffset = (element: HTMLElement): number => {
  return parseInt(getComputedStyle(element).width.replace('px', ''));
}