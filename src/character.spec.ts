/**
 * @jest-environment jsdom
 */
import { Character } from "./character";
import { Engine } from "./gameEngine";
const dateNowStub = () => 1644182219303;
global.Date.now = dateNowStub;


const mockGamingThreadCallback = jest.fn();
const mockEngine: Partial<Engine> = {
  addGamingThread: mockGamingThreadCallback,
}
const character = new Character(mockEngine as Engine, 'test');
document.body.appendChild(character.element);

describe('charater class', () => {
  it('it should create a character well initialized', () => {
    expect(character.element).toMatchSnapshot();
    expect(character.properties).toMatchSnapshot();
    expect(mockGamingThreadCallback).toHaveBeenCalled();
  });
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
  })
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
  })
})