/**
 * @jest-environment jsdom
 */
 const dateNowStub = () => 1644182219303;
 global.Date.now = dateNowStub;
import { Item } from "./item"
const style = {
  position: 'absolute',
  left: '10px',
  top: '10px',
} as CSSStyleDeclaration

const item = new Item({className:'test',side:'left', style:style});
describe('item', () => {
  it('should create an item', () => {
    expect(item).toMatchSnapshot();
    expect(item.element).toMatchSnapshot();
    expect(item.id).toMatchSnapshot();
    expect(item.position).toMatchSnapshot();
    expect(item.initialPosition).toMatchSnapshot();
  });
  it('should remove element', ()=> {
    item.remove()
    expect(item.element).toMatchSnapshot()
  })
})