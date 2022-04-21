import './assets/menu/menu.css';
import { getAvatar, getInfos, getSubMenu, menuEntries } from './menu/menu';

export class Control{
  private _isMenuOpen = false;
  private htmlElement: HTMLElement;
  
  constructor(){
    this.htmlElement = this.createMenu();
    this.addListeners();
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
        switch(event.key){
          case 'ArrowDown':
            if(parseInt(cursor.style.gridRowStart)-1 !== menuEntries.length){
              cursor.style.gridRowStart = `${parseInt(cursor.style.gridRowStart) + 1}`;
              infos.parentElement.replaceChild(getInfos(menuEntries[parseInt(cursor.style.gridRowStart)-2]),infos);
            }
            break;
          case 'ArrowUp':
            if(parseInt(cursor.style.gridRowStart)-2 !== 0){
              cursor.style.gridRowStart = `${parseInt(cursor.style.gridRowStart) - 1}`;
              infos.parentElement.replaceChild(getInfos(menuEntries[parseInt(cursor.style.gridRowStart)-2]),infos);
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
  
    // buttons area
    const buttons = document.createElement('div');
    buttons.style.gridColumn = '4/6';
    buttons.style.gridRow = '4';
    buttons.style.display = 'grid';
    buttons.style.gridTemplateColumns = '1fr'
    buttons.style.gridTemplateRows = 'repeat(2,1fr)'
    const buttonTop = document.createElement('div');
    buttonTop.style.gridColumn = '1';
    buttonTop.style.gridRow = '1';
    buttonTop.style.padding = '5px 35px';
    const buttonBottom = document.createElement('div');
    buttonBottom.style.gridColumn = '1';
    buttonBottom.style.gridRow = '2';
    buttonBottom.style.padding = '5px 35px';

    buttonTop.appendChild(frame.cloneNode());
    buttonBottom.appendChild(frame.cloneNode());
    buttons.appendChild(buttonTop);
    buttons.appendChild(buttonBottom);

    main.appendChild(avatar);
    main.appendChild(infos);
    main.appendChild(subMenu);
    main.appendChild(buttons);

    return main
  }
}