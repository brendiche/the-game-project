import { addGamingThread } from "./gameEngine";
import { getPosition, setPosition } from "./helper";

export const createItem = (className: string, style:Partial<CSSStyleDeclaration>) => {
  const element = document.createElement('div');
  element.className = className;
  for(const prop in style){
    element.style[prop] = style[prop];
  }
  const initialPosition = getPosition(element);
  addGamingThread(() => {
    if(getPosition(element) >= initialPosition + 500){
      element.remove();
    }else{
      setPosition(element, getPosition(element)+10);
    }
  });
  document.body.appendChild(element)
  return element;
}