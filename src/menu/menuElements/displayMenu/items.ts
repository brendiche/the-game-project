export class MenuItems {
  element: HTMLElement

  constructor(){
    this.element = this.createElement();
  }

  // TODO 2022-09-18 BGO make the menu linked to the character
  private createElement(): HTMLElement {
    const container = document.createElement('div');
    container.style.display = 'grid';
    // container.style.backgroundColor ="red"
    return container;
      // itemsFrame.style.gridTemplateColumns = `repeat(${(menuEntrie as entrieItem | entrieSpell).entrieItems.grid.columns}, 1fr)`;
      // itemsFrame.style.gridTemplateRows = `repeat(${(menuEntrie as entrieItem | entrieSpell).entrieItems.grid.rows}, 1fr)`;
      // itemsFrame.id = 'cursor-target';
      // (menuEntrie as entrieItem | entrieSpell).entrieItems.value.forEach((item, i) => {
      //   const itemFrame = document.createElement('div');
      //   itemFrame.style.fontFamily = 'ggSalasFont';
      //   itemFrame.style.color = 'white';
      //   itemFrame.style.fontSize = '20px';
      //   itemFrame.style.paddingLeft = '50px';
      //   itemFrame.style.gridColumn = '1';
      //   itemFrame.style.gridRow = `${i+1}`;
      //   itemFrame.style.fontFamily = 'ggSalasFont';
      //   itemFrame.style.color = 'white';
      //   itemFrame.style.paddingTop = '15px';
      //   itemFrame.appendChild(document.createTextNode(item));
      //   itemsFrame.appendChild(itemFrame);
      // })
  }
}