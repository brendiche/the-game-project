import { MenuDetail } from "../../menu.type";
import { game } from '../../../game/game.service';
import { menuService } from "../../menu.service";
export class MenuItems implements MenuDetail {
  items: any[];
  container: HTMLElement;
  cursor: HTMLElement;
  private listener: (event: KeyboardEvent) => void;

  constructor(){
    this.items = game.player.inventrory;
  }

  getDetail() {
    this.container = document.createElement('div');
    this.container.style.display = 'grid';
    this.container.style.fontFamily = 'ggSalasFont';
    this.container.style.color = 'white';
    this.container.style.fontSize = '20px';
    this.container.style.paddingLeft = '50px';

    for (let i = 0; i < 7; i++) {
      const itemDiv = document.createElement('div');
      itemDiv.style.gridColumn = '1';
      itemDiv.style.gridRow = `${i+1}`;
      itemDiv.appendChild(document.createTextNode(this.items[i]?.name ?? ''));
      this.container.appendChild(itemDiv);
    }
    return this.container;
  }

  actionHandler(){
    this.createCursor();
    this.container.appendChild(this.cursor);
    this.addListeners();
  }

  private createCursor(){
    this.cursor = document.createElement('div');
    this.cursor.className = 'itemMenuPointer';
    this.cursor.style.gridRow = '1';
    this.cursor.style.gridColumn = '1';
  }

  private addListeners(): void{
    this.listener = (event) => {
      switch(event.key){
        case 'ArrowDown':
          this.cursorDown();
          break;
        case 'ArrowUp':
          this.cursorUp();
          break;
        case 'Backspace':
          this.removeListeners();
          this.cursor.remove();
          menuService.backToMainMenu.next();
          break;
      }
    }
    window.addEventListener('keydown', this.listener);
  }

  private removeListeners(): void{
    window.removeEventListener('keydown', this.listener);
  }

  private cursorUp(){
    if(this.cursor.style.gridRowStart > '1'){
      this.cursor.style.gridRowStart = `${parseInt(this.cursor.style.gridRowStart) - 1}`;
    }
  }

  private cursorDown(){
    if(this.cursor.style.gridRowStart < `${this.items.length}`){
      this.cursor.style.gridRowStart = `${parseInt(this.cursor.style.gridRowStart)+1}`;
    }
  }

}