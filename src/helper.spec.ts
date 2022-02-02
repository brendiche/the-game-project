/**
 * @jest-environment jsdom
 */
import { getPosition, setPosition } from "./helper";

const element = document.createElement('div');
describe('Helper', () => {
  beforeEach(() => {
    element.style.left = '666px'
    element.style.top = '33px'
    element.style.backgroundPositionX = '0px'
  })
  it('should retrun the good position', ()=>{
    expect(getPosition(element)).toBe(666);
    expect(getPosition(element, 'backgroundPositionX')).toBe(0);
  });
  it('should set the good position', ()=>{
    const elementTest = setPosition(element,10);
    const elementTest1 = setPosition(element,10,'top');
    const elementTest2 = setPosition(element,10,'backgroundPositionX');
    expect(elementTest.style.left).toBe('10px');
    expect(elementTest1.style.top).toBe('10px');
    expect(elementTest2.style.backgroundPositionX).toBe('10px');
  });
})