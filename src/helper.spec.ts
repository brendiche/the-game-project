/**
 * @jest-environment jsdom
 */
import { getOffset, getPosition, setPosition } from "./helper";

const element = document.createElement('div');
describe('Helper', () => {
  beforeEach(() => {
    element.id = 'testDiv'
    element.style.left = '666px';
    element.style.top = '33px';
    element.style.backgroundPositionX = '0px';
    element.style.width = '500px';
    document.body.appendChild(element);
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
  it('should retrun the offset of an element', () => {
    expect(getOffset(element)).toBe(500);
  });
})