/**
 * @jest-environment jsdom
 */
import { Character } from "./character";
import { Engine } from "./gameEngine";
import { CharacterConfig } from "./helper";
const dateNowStub = () => 1644182219303;
global.Date.now = dateNowStub;


const callbackArray: any[] = []
const mockEngine: Partial<Engine> = {
  addGamingThread: (arg:any) => callbackArray.push(arg)
}
const mockConfig: CharacterConfig = {
  controls:'platformer',
  offset:{
    left:0,
    right:0,
    top:0,
  },
  item:{
    maxDistance: 0,
    step: 1
  },
  initialPosition: {
    top: 0,
    left: 0
  }
}
const character = new Character(mockConfig, mockEngine as Engine, 'test');
document.body.appendChild(character.element);

describe('charater class', () => {
  it('should create a character well initialized', () => {
    checkCharacter();
    expect(callbackArray.length).toBe(1);
  });
  it('should set side and state', () => {
    callbackArray[0]();
    checkCharacter();
  })
  it('should test the KeyboardEvent keydown', () => {
    const arrowDownEvent = new KeyboardEvent('keydown', {key: 'ArrowDown'});
    const arrowLeftEvent = new KeyboardEvent('keydown', {key: 'ArrowRight'});
    const arrowRightEvent = new KeyboardEvent('keydown', {key: 'ArrowLeft'});
    const arrowUpEvent = new KeyboardEvent('keydown', {key: 'ArrowUp'});
    const spaceEvent = new KeyboardEvent('keydown', {key: ' '});
    const sEvent = new KeyboardEvent('keydown', {key: 's'});
    window.dispatchEvent(arrowDownEvent);
    checkCharacter();
    window.dispatchEvent(arrowLeftEvent);
    checkCharacter();
    window.dispatchEvent(arrowRightEvent);
    checkCharacter();
    window.dispatchEvent(arrowUpEvent);
    checkCharacter();
    window.dispatchEvent(spaceEvent);
    checkCharacter();
    window.dispatchEvent(sEvent);
    checkCharacter();
  }); 
  it('should test the KeyboardEvent keyup', () => {
    const arrowDownEvent = new KeyboardEvent('keyup', {key: 'ArrowDown'});
    const arrowLeftEvent = new KeyboardEvent('keyup', {key: 'ArrowRight'});
    const arrowRightEvent = new KeyboardEvent('keyup', {key: 'ArrowLeft'});
    window.dispatchEvent(arrowDownEvent);
    checkCharacter();
    window.dispatchEvent(arrowLeftEvent);
    checkCharacter();
    window.dispatchEvent(arrowRightEvent);
    checkCharacter();
  });
  it('should handle the touche events', () =>{
    const touch = {clientX:10, clientY: 10} as Touch
    const touchStartEvent = new TouchEvent('touchstart', {touches: [touch]});
    const touchMoveEvent = new TouchEvent('touchmove', {touches: [{...touch,clientX:20}]});
    const touchEndEvent = new TouchEvent('touchend', {touches: [touch]});
    window.dispatchEvent(touchStartEvent);
    checkCharacter();
    window.dispatchEvent(touchMoveEvent);
    checkCharacter();
    window.dispatchEvent(touchEndEvent);
    checkCharacter();
  });
  it('should remove an item', () => {
    const dateNowStub = () => 1644182219302;
    global.Date.now = dateNowStub;
    const spaceEvent = new KeyboardEvent('keydown', {key: ' '});
    window.dispatchEvent(spaceEvent);
    character.removeItem(1644182219302);
    checkCharacter();
  })
})

const checkCharacter=()=> {
  expect(character.element).toMatchSnapshot();
  expect(character.side).toMatchSnapshot();
  expect(character.state).toMatchSnapshot();
  expect(character.items).toMatchSnapshot();
}