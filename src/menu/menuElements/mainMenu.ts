import { entry } from "../menu.type";
export class MainMenu{
  element: HTMLElement;
  _selectedEntry = 0;
  private cursor: HTMLElement;
  private menuLength: number;
  private listener: (event: KeyboardEvent) => void;
  private updateMenuCallback: () => void;

  constructor(entries: entry[], updateMenuCallback: () => void){
    this.menuLength = entries.length;
    this.element = this.createMenu(entries.map(e => e.title));
    this.updateMenuCallback = updateMenuCallback;
  }

  addListeners(): void{
    this.listener = (event) => {
      switch(event.key){
            case 'ArrowDown':
              this.cursorDown();
              break;
            case 'ArrowUp':
              this.cursorUp();
              break;
            }
            this.updateMenuCallback();
    }
    window.addEventListener('keydown', this.listener);
  }

  initCursor(): void{
    this.cursor.style.gridRow = '2';
    this.updateMenuCallback();
  }

  removeListeners(): void{
    window.removeEventListener('keydown', this.listener);
  }

  get selectedEntry(): number{
    return parseInt(this.cursor.style.gridRowStart) - 2;
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
    
    this.cursor = document.createElement('div');
    this.cursor.id = 'subMenuCursor'
    this.cursor.className = 'subMenuPointer';
    this.cursor.style.gridRow = '2';
    this.cursor.style.gridColumn = '1';
    frame.appendChild(this.cursor);
    
    subMenu.appendChild(frame);
    
    return subMenu;
  }

  private cursorUp(){
    if(this.cursor.style.gridRowStart > '2'){
      this.cursor.style.gridRowStart = `${parseInt(this.cursor.style.gridRowStart) - 1}`;
    }
  }

  private cursorDown(){
    if(this.cursor.style.gridRowStart <= `${this.menuLength}`){
      this.cursor.style.gridRowStart = `${parseInt(this.cursor.style.gridRowStart) + 1}`;
    }
  }
}