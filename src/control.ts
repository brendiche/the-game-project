import './assets/menu/menu.css';
import { getAvatar, getInfos, getStaticInfos, getSubMenu, menuEntries } from './menu/menu';

export class Control{
  // TODO 2022-04-22 add cursor state
  private _isMenuOpen = false;
  private htmlElement: HTMLElement;
  private cursorState: {
    selectedMain: boolean,
    selectedIndex: number,
  }
  
  constructor(){
    this.htmlElement = this.createMenu();
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
    return this._isMenuOpen
  }

  private addListeners(){
    if(this._isMenuOpen) this.htmlElement.style.display = 'grid';
    window.addEventListener('keydown' , (event) => { 
      if(event.key === 'Escape'){
        if(this.isMenuOpen){
          this.htmlElement.style.display = 'none';
        }else{
          this.htmlElement.style.display = 'grid';
        }
        this._isMenuOpen = !this.isMenuOpen;
      }
      if(this.isMenuOpen){
        const cursor = document.getElementById('subMenuCursor');
        const infos = document.getElementById('menu-info');
        const cursorTarget = document.getElementById('cursor-target');
        const subMenu = document.getElementById('subMenu');
        switch(event.key){
          case 'ArrowDown':
            if(this.cursorState.selectedMain){
              if(parseInt(cursor.style.gridRowStart)-1 !== menuEntries.length){
                cursor.style.gridRowStart = `${parseInt(cursor.style.gridRowStart) + 1}`;
                this.cursorState.selectedIndex = parseInt(cursor.style.gridRowStart);
                infos.parentElement.replaceChild(getInfos(menuEntries[parseInt(cursor.style.gridRowStart)-2]),infos);
              }
            }else{
              cursor.style.gridRowStart = `${parseInt(cursor.style.gridRowStart)+1}`;
            }
            break;
          case 'ArrowUp':
            if(this.cursorState.selectedMain){
              if(parseInt(cursor.style.gridRowStart)-2 !== 0){
                cursor.style.gridRowStart = `${parseInt(cursor.style.gridRowStart) - 1}`;
                this.cursorState.selectedIndex = parseInt(cursor.style.gridRowStart);
                infos.parentElement.replaceChild(getInfos(menuEntries[parseInt(cursor.style.gridRowStart)-2]),infos);
              }
            }else{
              cursor.style.gridRowStart = `${parseInt(cursor.style.gridRowStart)-1}`;
            }
            break;
          case 'ArrowLeft':
            if([2,3,5].some((e) => e === this.cursorState.selectedIndex)){
              this.cursorState.selectedMain = false;
              cursor.style.gridRowStart = '1';
              cursor.style.backgroundSize = '37px';
              cursor.style.backgroundPositionY = '22px';
              cursor.style.zIndex = '1';
              cursorTarget.appendChild(cursor);
            }
            break;
          case 'ArrowRight':
            if(!this.cursorState.selectedMain){
              this.cursorState.selectedMain = true;
              cursor.style.backgroundSize = '55px';
              cursor.style.backgroundPositionY = 'bottom';
              cursor.style.gridRowStart = `${this.cursorState.selectedIndex}`;
              subMenu.appendChild(cursor);
              // TODO 2022-04-25 : add selected items 
            }
            break;
        }
      }
    });
  }

  private createMenu(): HTMLElement{
    const main = document.createElement('div');
    main.className = 'menu';
    main.style.display ='none';
    main.style.gridTemplateColumns ='repeat(5, 1fr)'
    main.style.gridTemplateRows ='repeat(4, 1fr)'
    // frame 
    const frame = document.createElement('div');
    frame.style.backgroundColor = 'rgba(255,255,255,0.2)';
    frame.style.border = '3px solid white';
    frame.style.borderRadius = '5px'
    frame.style.height = '100%';
    // avatar area
    const avatar = getAvatar();
    // sub menu area
    const subMenu = getSubMenu(menuEntries.map(entrie => entrie.title));
    // infos area
    const infos = getInfos(menuEntries[0]);
  
    // staticInfos area
    const staticInfos = getStaticInfos();

    main.appendChild(avatar);
    main.appendChild(infos);
    main.appendChild(subMenu);
    main.appendChild(staticInfos);

    return main
  }
}