import { Engine } from "./gameEngine";
import { getPosition, setPosition } from "./helper";

export const createItem = (engine: Engine, className: string, style:Partial<CSSStyleDeclaration>) => {
  const element = document.createElement('div');
  element.className = className;
  for(const prop in style){
    element.style[prop] = style[prop];
  }
  const initialPosition = getPosition(element);
  engine.addGamingThread(() => {
    if(getPosition(element) >= initialPosition + 500){ // TODO 2022-02-02: move this magic number
      element.remove();
    }else{
      setPosition(element, getPosition(element)+10); // TODO 2022-02-02: move this magic number
    }
  });
  document.body.appendChild(element)
  return element;
}