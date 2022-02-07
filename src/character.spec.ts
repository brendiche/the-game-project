/**
 * @jest-environment jsdom
 */
import { Character } from "./character";
import { Engine } from "./gameEngine";
const dateNowStub = () => 1644182219303;
global.Date.now = dateNowStub;


const callbackArray: any[] = []
const mockEngine: Partial<Engine> = {
  addGamingThread: (arg:any) => callbackArray.push(arg)
}
const character = new Character(mockEngine as Engine, 'test');
document.body.appendChild(character.element);

describe('charater class', () => {
  it('should create a character well initialized', () => {
    expect(character.element).toMatchSnapshot();
    expect(character.properties).toMatchSnapshot();
    expect(callbackArray.length).toBe(1);
  });
  it('should set side and state', () => {
    callbackArray[0]();
    expect(character.properties).toMatchSnapshot();
  })
  it('should test the KeyboardEvent keydown', () => {
    const arrowDownEvent = new KeyboardEvent('keydown', {key: 'ArrowDown'});
    const arrowLeftEvent = new KeyboardEvent('keydown', {key: 'ArrowRight'});
    const arrowRightEvent = new KeyboardEvent('keydown', {key: 'ArrowLeft'});
    const arrowUpEvent = new KeyboardEvent('keydown', {key: 'ArrowUp'});
    const spaceEvent = new KeyboardEvent('keydown', {key: ' '});
    const sEvent = new KeyboardEvent('keydown', {key: 's'});
    window.dispatchEvent(arrowDownEvent);
    expect(character.properties).toMatchSnapshot();
    window.dispatchEvent(arrowLeftEvent);
    expect(character.properties).toMatchSnapshot();
    window.dispatchEvent(arrowRightEvent);
    expect(character.properties).toMatchSnapshot();
    window.dispatchEvent(arrowUpEvent);
    expect(character.properties).toMatchSnapshot();
    window.dispatchEvent(spaceEvent);
    expect(character.properties).toMatchSnapshot();
    window.dispatchEvent(sEvent);
    expect(character.properties).toMatchSnapshot();
  }); 
  it('should test the KeyboardEvent keyup', () => {
    const arrowDownEvent = new KeyboardEvent('keyup', {key: 'ArrowDown'});
    const arrowLeftEvent = new KeyboardEvent('keyup', {key: 'ArrowRight'});
    const arrowRightEvent = new KeyboardEvent('keyup', {key: 'ArrowLeft'});
    window.dispatchEvent(arrowDownEvent);
    expect(character.properties).toMatchSnapshot();
    window.dispatchEvent(arrowLeftEvent);
    expect(character.properties).toMatchSnapshot();
    window.dispatchEvent(arrowRightEvent);
    expect(character.properties).toMatchSnapshot();
  });
  it('should handle the touche events', () =>{
    const touch = {clientX:10, clientY: 10} as Touch
    const touchStartEvent = new TouchEvent('touchstart', {touches: [touch]});
    const touchMoveEvent = new TouchEvent('touchmove', {touches: [{...touch,clientX:20}]});
    const touchEndEvent = new TouchEvent('touchend', {touches: [touch]});
    window.dispatchEvent(touchStartEvent);
    expect(character.properties).toMatchSnapshot();
    window.dispatchEvent(touchMoveEvent);
    expect(character.properties).toMatchSnapshot();
    window.dispatchEvent(touchEndEvent);
    expect(character.properties).toMatchSnapshot();
  });
  it('should remove an item', () => {
    const dateNowStub = () => 1644182219302;
    global.Date.now = dateNowStub;
    const spaceEvent = new KeyboardEvent('keydown', {key: ' '});
    window.dispatchEvent(spaceEvent);
    character.removeItem(1644182219302);
    expect(character.properties).toMatchSnapshot();
  })
})