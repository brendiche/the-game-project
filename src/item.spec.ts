/**
 * @jest-environment jsdom
 */
import { Engine } from "./gameEngine"
import { createItem } from "./item"

const callbackArray: any[] = []
const mockEngine: Partial<Engine> = {
  addGamingThread: (arg:any) => callbackArray.push(arg)
}

const removeCallback = jest.fn();
const style = {
  position: 'absolute',
  left: '10px',
  top: '10px',
} as CSSStyleDeclaration

describe('item', () => {
  it('should create an item', () => {
    const itemLeft = createItem(mockEngine as Engine,{className:'test',side:'left', style:style},removeCallback);
    expect(itemLeft).toMatchSnapshot();
    const itemRight = createItem(mockEngine as Engine,{className:'test',side:'right', style:style},removeCallback);
    expect(itemRight).toMatchSnapshot();
    expect(callbackArray.length).toBe(2);
    callbackArray[0]();
    expect(itemLeft).toMatchSnapshot()
    callbackArray[1]();
    expect(itemRight).toMatchSnapshot()
  });
})