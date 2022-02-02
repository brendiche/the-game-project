export const Side = ['left', 'right'] as const;
export type SideType = typeof Side[number];

export const getPosition = (element: HTMLElement, prop: 'left'|'top'|'backgroundPositionX' = 'left'): number => {
  const poss = element.style[prop];
  return parseInt(poss.replace('px', ''));
}

export const setPosition = (element: HTMLElement, newPosition: number, axis: 'left'|'top'|'backgroundPositionX' = 'left'): HTMLElement => {
  element.style[axis] = `${newPosition}px`;
  return element;
}