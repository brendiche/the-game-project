/**
 * @jest-environment jsdom
 */
import { json } from "../jest.config";
import { Character } from "./character";
import { Engine } from "./gameEngine";

const mockEngine: Partial<Engine> = {
  addGamingThread: jest.fn(),
}
const character = new Character(mockEngine as Engine, 'test');

describe('charater class', () => {
  it('it should create a character well initialized', () => {
    expect(character.element).toMatchSnapshot();
  })
})