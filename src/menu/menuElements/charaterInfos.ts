export class CharacterInfos {
  element: HTMLElement
  constructor(){
    this.element = this.createElement();
  }

  private createElement():HTMLElement {
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
}