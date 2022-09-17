import { entrie } from "../menu.type";

export class MainMenu{
  element: HTMLElement;

  // 2022-09-17 BGO implement the handling of the cursor and the action
  // this class should be responsible of the arraow hited by the user
  constructor(entries: entrie[]){
    this.element = this.createMenu(entries.map(e => e.title));
  }

  private createMenu(entries: string[]): HTMLElement{
    const subMenu = document.createElement('div');
    subMenu.style.gridColumn = '4/6';
    subMenu.style.gridRow = '1/4';
    subMenu.style.padding = '20px';
    
    const frame = document.createElement('div');
    frame.id = 'subMenu';
    frame.style.backgroundColor = 'rgba(255,255,255,0.2)';
    frame.style.border = '3px solid white';
    frame.style.borderRadius = '5px'
    frame.style.height = '100%';
    frame.style.display = 'grid';
    frame.style.gridTemplateColumns = '1fr';
    frame.style.gridTemplateRows = 'repeat(9, 1fr)';
    
    entries.forEach((entrie, i) => {
      const items = document.createElement('div');
      items.id = `subMenu-${entrie}`;
      items.style.gridRow = `${i+2}`;
      items.style.gridColumn = '1';
      items.style.fontFamily = 'ggSalasFont';
      items.style.color = 'white';
      items.style.paddingLeft = '70px';
      items.style.fontSize = '20px';
      items.style.marginTop = '15px';
      items.appendChild(document.createTextNode(entrie))  
      frame.appendChild(items);
    })
    
    const cursor = document.createElement('div');
    cursor.id = 'subMenuCursor'
    cursor.className = 'subMenuPointer';
    cursor.style.gridRow = '2';
    cursor.style.gridColumn = '1';
    frame.appendChild(cursor);
    
    subMenu.appendChild(frame);
    
    return subMenu;
  }
}