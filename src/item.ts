import { Engine } from "./gameEngine";
import { getPosition, setPosition, SideType } from "./helper";

export interface ItemConfig{
  className: string;
  style: Partial<CSSStyleDeclaration>;
  side: SideType;
}

const ITEM_CONFIG = {
  movingStep: 10,
  maxDistance: 500,
}

export const createItem = (engine: Engine, itemConfig: ItemConfig): HTMLElement => {
  const element = document.createElement('div');
  element.className = itemConfig.className;
  for(const prop in itemConfig.style){
    element.style[prop] = itemConfig.style[prop];
  }
  const initialPosition = getPosition(element);
  engine.addGamingThread(() => {
    if (itemConfig.side === 'right'){
      if(getPosition(element) >= initialPosition + ITEM_CONFIG.maxDistance){
        element.remove();
      }else{
        setPosition(element, getPosition(element) + ITEM_CONFIG.movingStep);
      }
    } else {
      if(getPosition(element) <= initialPosition - ITEM_CONFIG.maxDistance){
        element.remove();
      }else{
        setPosition(element, getPosition(element) - ITEM_CONFIG.movingStep);
      }
    }
  });
  document.body.appendChild(element)
  return element;
}