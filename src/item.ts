import { Engine } from "./gameEngine";
import { getPosition, setPosition } from "./helper";

const ITEM_CONFIG = {
  movingStep: 10,
  maxDistance: 500,
}

export const createItem = (engine: Engine, className: string, style:Partial<CSSStyleDeclaration>) => {
  const element = document.createElement('div');
  element.className = className;
  for(const prop in style){
    element.style[prop] = style[prop];
  }
  const initialPosition = getPosition(element);
  engine.addGamingThread(() => {
    if(getPosition(element) >= initialPosition + ITEM_CONFIG.maxDistance){
      element.remove();
    }else{
      setPosition(element, getPosition(element) + ITEM_CONFIG.movingStep);
    }
  });
  document.body.appendChild(element)
  return element;
}