/**
 * @jest-environment jsdom
 */
import { Character } from "./character";
import { Engine } from "./gameEngine";

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
  it('should test the events', () => {
    const arrowDownEvent = new KeyboardEvent('keydown', {key: 'ArrowDown'})
    window.dispatchEvent(arrowDownEvent);
    expect(character.properties.state).toBe('down');
  })
})