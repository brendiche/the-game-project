import './assets/menu/menu.css';
import { GameMenu } from './menu/menu';
// import { menuEntries } from './menu/menu.constants';


export class Control{
  // TODO 2022-04-22 add cursor state
  private menu: GameMenu;
  private htmlElement: HTMLElement;
  private cursorState: {
    selectedMain: boolean,
    selectedIndex: number,
  }
  
  constructor(){
    this.menu = new GameMenu();
    this.htmlElement = this.menu.element;
    this.addListeners();
    this.cursorState = {
      selectedMain : true,
      selectedIndex: 2,
    }
  }

  get element(): HTMLElement{
    return this.htmlElement;    
  }

  get isMenuOpen(): boolean{
    return this.menu.isOpen;
  }

  private addListeners(){
    window.addEventListener('keydown' , (event) => { 
      if(event.key === 'Escape'){
        this.menu.toggleMenu();
      }
      // if(this.isMenuOpen){
      //   const cursor = document.getElementById('subMenuCursor');
      //   const cursorTarget = document.getElementById('cursor-target');
      //   const subMenu = document.getElementById('subMenu');
      //   switch(event.key){
      //     case 'ArrowDown':
      //       if(this.cursorState.selectedMain){
      //         if(parseInt(cursor.style.gridRowStart)-1 !== menuEntries.length){
      //           cursor.style.gridRowStart = `${parseInt(cursor.style.gridRowStart) + 1}`;
      //           this.cursorState.selectedIndex = parseInt(cursor.style.gridRowStart);
      //           // infos.parentElement.replaceChild(getInfos(menuEntries[parseInt(cursor.style.gridRowStart)-2]),infos);
      //         }
      //       }else{
      //         cursor.style.gridRowStart = `${parseInt(cursor.style.gridRowStart)+1}`;
      //       }
      //       break;
      //     case 'ArrowUp':
      //       if(this.cursorState.selectedMain){
      //         if(parseInt(cursor.style.gridRowStart)-2 !== 0){
      //           cursor.style.gridRowStart = `${parseInt(cursor.style.gridRowStart) - 1}`;
      //           this.cursorState.selectedIndex = parseInt(cursor.style.gridRowStart);
      //           // infos.parentElement.replaceChild(getInfos(menuEntries[parseInt(cursor.style.gridRowStart)-2]),infos);
      //         }
      //       }else{
      //         cursor.style.gridRowStart = `${parseInt(cursor.style.gridRowStart)-1}`;
      //       }
      //       break;
      //     case 'ArrowLeft':
      //       if([2,3,5].some((e) => e === this.cursorState.selectedIndex)){
      //         this.cursorState.selectedMain = false;
      //         cursor.style.gridRowStart = '1';
      //         cursor.style.backgroundSize = '37px';
      //         cursor.style.backgroundPositionY = '22px';
      //         cursor.style.zIndex = '1';
      //         cursorTarget.appendChild(cursor);
      //       }
      //       break;
      //     case 'ArrowRight':
      //       if(!this.cursorState.selectedMain){
      //         this.cursorState.selectedMain = true;
      //         cursor.style.backgroundSize = '55px';
      //         cursor.style.backgroundPositionY = 'bottom';
      //         cursor.style.gridRowStart = `${this.cursorState.selectedIndex}`;
      //         subMenu.appendChild(cursor);
      //         // TODO 2022-04-25 : add selected items 
      //       }
      //       break;
      //   }
      // }
    });
  }
}