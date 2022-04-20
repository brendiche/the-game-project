import './assets/menu/menu.css';

export class Control{
  private isMenuOpen = false;
  private htmlElement: HTMLElement;
  constructor(){
    this.htmlElement = this.createMenu();
    this.addListeners();
  }

  get element(): HTMLElement{
    return this.htmlElement;    
  }

  private addListeners(){
    window.addEventListener('keydown' , (event) => { 
      if(event.key === 'Escape'){
        if(this.isMenuOpen){
          this.htmlElement.style.display = 'none';
        }else{
          this.htmlElement.style.display = 'grid';
        }
        this.isMenuOpen = !this.isMenuOpen;
      }
    });
  }

  private createMenu(): HTMLElement{
    const main = document.createElement('div');
    main.className = 'menu';
    main.style.display ='none'
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
    // stuf area
    const stuf = document.createElement('div');
    stuf.style.gridColumn = '1/4';
    stuf.style.gridRow = '2/5';
    stuf.style.padding = '20px';
    stuf.appendChild(frame.cloneNode());
    // sub menu area
    const subMenu = document.createElement('div');
    // subMenu.style.backgroundColor = 'green';
    subMenu.style.gridColumn = '4/6';
    subMenu.style.gridRow = '1/4';
    subMenu.style.padding = '20px';
    subMenu.appendChild(frame.cloneNode());
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
    main.appendChild(stuf);
    main.appendChild(subMenu);
    main.appendChild(buttons);
    return main
  }
}

const getAvatar = ():HTMLElement => {
    const avatar = document.createElement('div');
    avatar.style.gridColumn = '1/4';
    avatar.style.gridRow = '1';
    avatar.style.padding = '20px';
    const avatarFrame = document.createElement('div');
    avatarFrame.style.backgroundColor = 'rgba(255,255,255,0.2)';
    avatarFrame.style.border = '2px solid white';
    avatarFrame.style.borderRadius = '5px'
    avatarFrame.style.height = '100%';
    avatarFrame.style.display = 'grid';
    avatarFrame.style.gridTemplateColumns = 'repeat(3, 1fr)';
    avatarFrame.style.gridTemplateRows = 'repeat(3, 1fr)';

    const avatarImgFrame = document.createElement('div');
    avatarImgFrame.style.gridColumn = '1';
    avatarImgFrame.style.gridRow = '1/4';
    avatarImgFrame.style.backgroundColor = '#dbdbdb';
    avatarImgFrame.style.margin = '15px 20px';
    avatarImgFrame.style.border = '5px solid black';
    avatarImgFrame.style.borderRadius = '5px';
    const avatarImg = document.createElement('div');
    avatarImg.className = 'avatar';
    avatarImg.style.backgroundPositionX = 'center'
    avatarImg.style.height = '100%';
    avatarImgFrame.appendChild(avatarImg);

    const pseudoBalise = document.createElement('div');
    const pseudo = document.createTextNode("ggSalas");
    pseudoBalise.appendChild(pseudo);
    pseudoBalise.style.gridColumn = '2/4';
    pseudoBalise.style.gridRow = '1';
    pseudoBalise.style.fontFamily = 'ggSalasTitle';
    pseudoBalise.style.fontSize = '32px'
    pseudoBalise.style.color = '#f1cd0b';

    const levelBalise = document.createElement('div');
    const level = document.createTextNode("Niveau 11");
    levelBalise.appendChild(level);
    levelBalise.style.gridColumn = '2/4';
    levelBalise.style.gridRow = '2';
    levelBalise.style.fontFamily = 'ggSalasFont';
    levelBalise.style.color = '#ffffff';

    const progerssBar = document.createElement('div');
    progerssBar.style.gridColumn = '2/4';
    progerssBar.style.gridRow = '3';
    progerssBar.style.height = '20px';
    progerssBar.style.backgroundColor = 'white';
    progerssBar.style.marginRight = '20%';
    progerssBar.style.padding = '4px'

    const bar = document.createElement('div');
    bar.style.backgroundColor = '#4c4b4b';
    bar.style.height = '20px';
    bar.style.width = '60%';
    progerssBar.appendChild(bar)

    avatarFrame.appendChild(avatarImgFrame);
    avatarFrame.appendChild(pseudoBalise);
    avatarFrame.appendChild(progerssBar);
    avatarFrame.appendChild(levelBalise);

    avatar.appendChild(avatarFrame);
    return avatar;
}