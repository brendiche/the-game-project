import { getPosition, Target } from "./helper";
import './assets/target.css';

export const createControle = (character: HTMLElement, callback: (target: Target) => void): HTMLElement => {
  const controle = document.createElement('button');
  controle.innerText = 'add target';
  controle.onclick = () => {
    console.log('[control][onclick] add target');
    const left = getPosition(character);
    const top = getPosition(character, "top");
    const target = document.createElement('div');
    target.className = 'target';
    target.style.left = `${left+450}px`;
    target.style.top = `${top}px`;
    document.body.appendChild(target);
    callback({
      id: Date.now(),
      position: left+450,
      element: target,
    })
  };
  return controle 
}

export const testText = (): HTMLElement => {
  const text = document.createElement('div');
  text.className = 'text';
  const content = document.createElement('p');
  content.className = 'line-1 anim-typewriter';
  content.innerHTML = `
  Lorem ipsum dolor sit amet. Aut quod asperiores sit fuga enim vel dolor perferendis et quaerat culpa et iste 
  `;
  text.appendChild(content);
  return text;
}